const path = require("path")

const IndexRoute = (app) => {
    app.get(
        "/",
        (req, res) => {
            res.sendFile(path.join(__dirname + "./../../public/index.html"))
        }
    )
}

module.exports = {IndexRoute}