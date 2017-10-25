const transformArrayToObj = require("./helpers/transform_mongo_array_to_obj.js")

const AmountIssuesSince = (db, app) => {

    app.get(
        `/api/AmountIssuesSince`,
        async (req, res) => {

            let currentDate = new Date()
            currentDate.setDate(currentDate.getDate() - 7)
            const pastWeek = currentDate.toISOString()

            currentDate = new Date()
            currentDate.setDate(currentDate.getDate() - 30)
            const pastMonth = currentDate.toISOString()

            const issuesTotal = await db.collection("GHISSUES").aggregate(
                [
                    {
                        $unwind: "$state"
                    },
                    {
                        $group: { "_id": "$state", Count: { $sum: 1 } }
                    }
                ]
            ).toArray()

            const issuesSince7Days = await db.collection("GHISSUES").aggregate(
                [
                    {
                        $match: {
                            "updated_at": { $gt: pastWeek }
                        }
                    },
                    {
                        $unwind: "$state"
                    },
                    {
                        $group: { "_id": "$state", Count: { $sum: 1 } }
                    }
                ]
            ).toArray()

            const issuesSince30Days = await db.collection("GHISSUES").aggregate(
                [
                    {
                        $match: {
                            "updated_at": { $gt: pastMonth }
                        }
                    },
                    {
                        $unwind: "$state"
                    },
                    {
                        $group: { "_id": "$state", Count: { $sum: 1 } }
                    }
                ]
            ).toArray()

            res.send(
                {
                    issuesSince7Days: transformArrayToObj(issuesSince7Days),
                    issuesSince30Days: transformArrayToObj(issuesSince30Days),
                    issuesTotal: transformArrayToObj(issuesTotal)
                }
            )
        }
    )
}

module.exports = { AmountIssuesSince }