require("./../../config/config.js")
const MongoClient = require("mongodb").MongoClient

const mongoConnect = () => {
    return new Promise(
        (resolve, reject) => {
            MongoClient.connect(
                process.env.MONGODBINST,
                function (error, db) {
                    if (error) {
                        reject(error)
                    }
                    console.log("Connected successfully to database.")
                    resolve(db)    
                }
            )      
        }
    )
}

module.exports = mongoConnect