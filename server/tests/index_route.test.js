const supertest = require("supertest")
const express = require("express")
const {IndexRoute} = require("./../routes/index.js")

const app = express()
IndexRoute(app)

describe("routes/index.js", () => {
    it("Should serve an index.html file when requested", (done) => {
        supertest(app)
            .get("/")
            .expect("Content-Type", "text/html; charset=UTF-8")
            .expect(containsText)
            .end(done)
    })

    const containsText = (res) => {
        const stringToLookFor = "Ticket Dashboard"
        if (res.text.search(stringToLookFor) == -1) throw new Error(`"${stringToLookFor}" missing in document`)
    }
})