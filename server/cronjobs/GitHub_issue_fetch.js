require("./../config/config.js")
const GitHubApi             = require("github")
const mongoConnect          = require("./helpers/mongo_connect.js")
const dropMongoCollection   = require("./helpers/mongo_drop_collection.js")
const renameCollection      = require("./helpers/mongo_rename_collection.js")

const github = new GitHubApi()
github.authenticate(
    {
        type: "basic",
        username: process.env.GITHUB_USERNAME,
        password: process.env.GITHUB_PASSWORD
    }
)

// Connect to mongoDB and start fetching GitHub issues
const runTask = async () => {
    let db = await mongoConnect()
    db = await dropMongoCollection(db, "GHISSUESCOPY")
    db = await loopFetchingAndWriteToDB(db, 1)
    renameCollection(db, "GHISSUESCOPY", "GHISSUES")
}
runTask()


const loopFetchingAndWriteToDB = async (db, pagenr) => {
    const response = await fetchIssuesByPageAndInsert(db, pagenr)
    if (response.amount == 100) {
        pagenr = response.pagenr + 1                    // loops the function
        return loopFetchingAndWriteToDB(db, pagenr)     // to fetch more pages
    } else {
        return db
    }   
}

const fetchIssuesByPageAndInsert = async (db, pagenr = 1) => {
    return new Promise(
        async (resolve, reject) => {
            let fetchedIssues = await fetchPageOfGHIssues(pagenr)
            fetchedIssues = JSON.parse(fetchedIssues)
            db.collection("GHISSUESCOPY").insertMany(fetchedIssues)
            .then(
                (result) => {
                    console.log(`Successfully inserted page ${pagenr}, ` +
                    `${fetchedIssues.length} issues`)
                    resolve({ pagenr: pagenr, amount: fetchedIssues.length })
                }
            )
            .catch(
                (err) => reject(`Error at inserting page ${pagenr}: ${err}`)
            )
        }
    )
}

const fetchPageOfGHIssues = (pagenr = 1) => {
    return new Promise(
        (resolve, reject) => {
            github.issues.getForRepo(
                {
                    owner: "theteam",
                    repo: "techteam",
                    filter: "all",
                    state: "all",
                    per_page: 100,
                    page: pagenr
                },
                (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    console.log(`${res.data.length} issues fetched at page ${pagenr}`)
                    resolve(JSON.stringify(res.data))
                }
            )
        }
    )
}