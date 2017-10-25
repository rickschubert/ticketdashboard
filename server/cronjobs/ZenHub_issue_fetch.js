require("./../config/config.js")
const axios                 = require("axios")
const mongoConnect          = require("./helpers/mongo_connect.js")
const dropMongoCollection   = require("./helpers/mongo_drop_collection.js")


const retrieveTicketNumbersForIssues = (db) => {
    return new Promise(
        (resolve, reject) => {
            db.collection("GHISSUES")
                .find( {}, {number: 1, _id: 0} )
                .sort( {"number": 1} )
                .toArray()
                .then( (resultArray) => {resolve(resultArray)} )
                .catch( (error) => {reject(error)} )
        }
    )
}

const fetchZenHubEventsOfIssue = (issueNr) => {
    return new Promise(
        (resolve, reject) => {
            axios.get(
                `https://api.zenhub.io/p1/repositories/${process.env.ZENHUB_REPO_ID}/issues/` +
                `${issueNr}/events?access_token=${process.env.ZENHUB_TOKEN}`
            ).then(
                (response) => {
                    resolve(response.data)
                }
            ).catch(
                (error) => {
                    reject(error)
                }
            )
        }
    )
}

const writeDocToDB = (db, docBody) => {
    return new Promise(
        (resolve, reject) => {
            db.collection("ZHEVENTS").updateOne(
                {number: docBody.number},
                {$set: {ZenHubContent: docBody}},
                {upsert: true},
                (error, affectedCount) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(affectedCount)
                    }
                }
            )
        }
    )
}

const fetchEventAndWriteToDB = (issueNumber, db) => {
    fetchZenHubEventsOfIssue(issueNumber)
    .then(
        async (issueBody) => {
            issueBody.number = issueNumber
            const status = await writeDocToDB(db, issueBody)
            .then(
                (status) => {
                    console.log(`Successfully wrote #${issueNumber} to DB.`)
                    return status
                }
            )
            .catch(
                (error) => {
                    return error
                }
            )
        }
    )
    .catch(
        (error) => {
            return new Date(), error
        }
    )
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}


// Connect to mongoDB and start fetching ZenHub issues
const runTask = async () => {
    let db = await mongoConnect()
    const issueList = await retrieveTicketNumbersForIssues(db)
    for (idx in issueList) {
        const issueNr = issueList[idx]["number"]
        if (issueNr % 100 !== 0) {
            console.log(`${issueNr} in API limit`)
            fetchEventAndWriteToDB(issueNr, db)
        } else {
            console.log(`100th request at #${issueNr}: sleep for 60 seconds`)
            await sleep(60000)
        }
    }
}
runTask()