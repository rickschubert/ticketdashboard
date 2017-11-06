const transformArrayToObj = require("./helpers/transform_mongo_array_to_obj.js")

const AmountBugsSince = (db, app) => {

    app.get(
        `/api/AmountBugsSince`,
        async (req, res) => {

            // Freeze time for demo purposes
            let currentDate = new Date("2017-10-26T20:23:01.804Z")
            currentDate.setDate(currentDate.getDate() - 7)
            const pastWeek = currentDate.toISOString()

            currentDate = new Date("2017-10-26T20:23:01.804Z")
            currentDate.setDate(currentDate.getDate() - 30)
            const pastMonth = currentDate.toISOString()

            let bugsTotal = await db.collection("GHISSUES").aggregate(
                [
                    {
                        $match: { "labels.name": "bug" }
                    },
                    {
                        $unwind: "$state"
                    },
                    {
                        $group: { "_id": "$state", Count: { $sum: 1 } }
                    }
                ]
            ).toArray()

            let bugsSince7Days = await db.collection("GHISSUES").aggregate(
                [
                    {
                        $match: {
                            "updated_at": { $gt: pastWeek },
                            "labels.name": "bug"
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

            let bugsSince30Days = await db.collection("GHISSUES").aggregate(
                [
                    {
                        $match: {
                            "updated_at": { $gt: pastMonth },
                            "labels.name": "bug"
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
                    bugsSince7Days: transformArrayToObj(bugsSince7Days),
                    bugsSince30Days: transformArrayToObj(bugsSince30Days),
                    bugsTotal: transformArrayToObj(bugsTotal)
                }
            )
        }
    )
}

module.exports = { AmountBugsSince }