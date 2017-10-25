const {IndexRoute}          = require("./index.js")
const {OpenIssuesByLabel}   = require("./open_issues_by_label.js")
const {AmountBugsSince}     = require("./amount_bugs_since.js")
const {AmountIssuesSince}   = require("./amount_issues_since.js")
const TimeUntilMerged       = require("./time_until_merged.js")

const expressRoutes = (db, app) => {
    IndexRoute(app)                     // /
    OpenIssuesByLabel(db, app)          // /api/OpenIssuesByLabel
    AmountIssuesSince(db, app)          // /api/AmountIssuesSince
    AmountBugsSince(db, app)            // /api/AmountBugsSince
    TimeUntilMerged(db, app)            // /api/TimeUntilMerged
}

module.exports = {expressRoutes}