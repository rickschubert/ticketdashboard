const axios         = require("axios")
const mongoConnect  = require("./helpers/mongo_connect.js")


const fetchDataFromAPI = (route) => {
    return new Promise(
        (resolve, reject) => {
            axios.get(
                route,
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

const getAllResponses = async () => {
    const ticketLogs = await fetchDataFromAPI(
        "https://ticketdashboard.herokuapp.com/api/AmountIssuesSince"
    )
    const bugLogs = await fetchDataFromAPI(
        "https://ticketdashboard.herokuapp.com/api/AmountBugsSince"
    )
    const zenHubTimes = await fetchDataFromAPI(
        "https://ticketdashboard.herokuapp.com/api/TimeUntilMerged"
    )
    return {
        ticketLogs,
        bugLogs,
        zenHubTimes
    }
}

const WriteDateToObj = (object) => {
    const currentTime = new Date()
    object.date = currentTime
    return object
}

const writeToMongoDb = async (object) => {
    let db = await mongoConnect()
    db.collection("statistics").insertOne(object)
    .then((res) => console.log(`Successfully wrote to mongoDB: ${res}`))
    .catch((err) => console.log(`Failed to write to mongoDB: ${err}`))
}

const runTask = async () => {
    let obj = await getAllResponses()
    obj = WriteDateToObj(obj)
    writeToMongoDb(obj)
}
runTask()