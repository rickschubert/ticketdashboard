require("./config/config.js")
const express           = require("express")
const bodyParser        = require("body-parser")
const assert            = require("assert")
const path              = require("path")
const {expressRoutes}   = require("./routes/route_collector.js")

const app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "./../public/")))
const appPort = process.env.PORT

const MongoClient = require("mongodb").MongoClient
const MongoObjectID = require("mongodb").ObjectID

MongoClient.connect(
    process.env.MONGODBINST,
    function(err, db) {
        assert.equal(null, err)
        console.log("Connected successfully to database.")
        expressRoutes(db, app)
    }
)

app.listen(appPort, () => {
    console.log(`Started on port ${appPort} in mode ${process.env.NODE_ENV}.`)
})