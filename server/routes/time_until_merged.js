const transformMiliseondsToDaysAndHours = require("./helpers/transform_miliseconds_to_days_and_hours.js")
const _ = require("lodash")

const TimeUntilMerged = (db, app) => {

    app.get(
        "/api/TimeUntilMerged",
        async (req, res) => {

            let currentDate = new Date()
            currentDate.setDate(currentDate.getDate() - 7)
            const pastWeek = currentDate.toISOString()

            currentDate = new Date()
            currentDate.setDate(currentDate.getDate() - 30)
            const pastMonth = currentDate.toISOString()

            let ToDo_Merged = await
            db.collection('ZHEVENTS').aggregate([
                // Find all documents which already found their way into
                // the "Merged" column and which either started at
                // "To Do", "Backlog" or "To-do this week"
                {   $match: {
                        $or : [{"ZenHubContent.from_pipeline.name": "To Do"},
                               {"ZenHubContent.from_pipeline.name": "Backlog"},
                               {"ZenHubContent.from_pipeline.name": "To-do this week"}],
                        "ZenHubContent.to_pipeline.name": "Merged"
                    }
                }
                // Split up the "ZenHubContent" array
               ,{
                    $unwind: "$ZenHubContent"
                }
                // Filter to only return the elements which either started at
                // To Do, Backlog or To-do this week or which already got merged
               ,{   $match: {
                        $or: [
                            {"ZenHubContent.from_pipeline.name": "To Do"},
                            {"ZenHubContent.from_pipeline.name": "Backlog"},
                            {"ZenHubContent.from_pipeline.name": "To-do this week"},
                            {"ZenHubContent.to_pipeline.name": "Merged"}
                        ]
                    }
                }
                // Group these back by their respective number
               ,{
                    $group: {
                        "_id": "$number",
                        events: { $push: {content: "$ZenHubContent"} }
                    }
                }
                // Get the earliest date (from) and the latest date (to)
               ,{
                    $project: {
                        "_id": 0,
                        "ticket": "$_id",
                        from: { $min: "$events.content.created_at" },
                        to: { $max: "$events.content.created_at" }
                    }
                }
            ]).toArray()

            // categorized: detailed data of each ticket, assigned to 3 categories
            let categorized = {pastWeek: [], pastMonth: [], pastRest: []}

            // ToDo_Merged: detailed data for each ticket, not assigned to categories
            for (idx in ToDo_Merged) {
                const fromDate = new Date(ToDo_Merged[idx]["from"])
                const toDate = new Date(ToDo_Merged[idx]["to"])
                const durationMs = toDate - fromDate
                ToDo_Merged[idx]["durationMs"] = durationMs

                // perform for any ticket
                categorized.pastRest.push(ToDo_Merged[idx])
                // if the ticket started during the last 7 days
                if (ToDo_Merged[idx]["from"] >= pastWeek) {
                    categorized.pastWeek.push(ToDo_Merged[idx])
                }
                // if the ticket started during the last 30 days
                if (ToDo_Merged[idx]["from"] >= pastMonth) {
                    categorized.pastMonth.push(ToDo_Merged[idx])
                }
            }

            let sumPastWeek = 0;
            let durationsPastWeek = []
            for( idx in categorized["pastWeek"] ){
                sumPastWeek += parseInt( categorized["pastWeek"][idx]["durationMs"], 10 ) //don't forget to add the base
                durationsPastWeek.push(categorized["pastWeek"][idx]["durationMs"])
            }
            const avgPastWeek = sumPastWeek/categorized.pastWeek.length
            durationsPastWeek = _.remove(
                durationsPastWeek,
                (n) => {
                    return n !== 0
                }
            )
            const minPastWeek = _.min(durationsPastWeek)
            const maxPastWeek = _.max(durationsPastWeek)


            let sumPastMonth = 0;
            let durationsPastMonth = []
            for( idx in categorized["pastMonth"] ){
                sumPastMonth += parseInt( categorized["pastMonth"][idx]["durationMs"], 10 )
                durationsPastMonth.push(categorized["pastMonth"][idx]["durationMs"])
            }
            const avgPastMonth = sumPastMonth/categorized.pastMonth.length
            durationsPastMonth = _.remove(
                durationsPastMonth,
                (n) => {
                    return n !== 0
                }
            )
            const minPastMonth = _.min(durationsPastMonth)
            const maxPastMonth = _.max(durationsPastMonth)

            let sumPastRest = 0;
            let durationsPastRest = []
            for( idx in categorized["pastRest"] ){
                sumPastRest += parseInt( categorized["pastRest"][idx]["durationMs"], 10 )
                durationsPastRest.push(categorized["pastRest"][idx]["durationMs"])
            }
            const avgPastRest = sumPastRest/categorized.pastRest.length
            durationsPastRest = _.remove(
                durationsPastRest,
                (n) => {
                    return n !== 0
                }
            )
            const minPastRest = _.min(durationsPastRest)
            const maxPastRest = _.max(durationsPastRest)


            // The average statistics
            const stats = {
                pastWeek: {
                    average: {
                        durationMs: avgPastWeek,
                        durationReadable: transformMiliseondsToDaysAndHours(avgPastWeek)
                    },
                    combined: {
                        durationMs: sumPastWeek,
                        durationReadable: transformMiliseondsToDaysAndHours(sumPastWeek)
                    },
                    min: {
                        durationMs: minPastWeek,
                        durationReadable: transformMiliseondsToDaysAndHours(minPastWeek)
                    },
                    max: {
                        durationMs: maxPastWeek,
                        durationReadable: transformMiliseondsToDaysAndHours(maxPastWeek)
                    }
                },
                pastMonth: {
                    average: {
                        durationMs: avgPastMonth,
                        durationReadable: transformMiliseondsToDaysAndHours(avgPastMonth)
                    },
                    combined: {
                        durationMs: sumPastMonth,
                        durationReadable: transformMiliseondsToDaysAndHours(sumPastMonth)
                    },
                    min: {
                        durationMs: minPastMonth,
                        durationReadable: transformMiliseondsToDaysAndHours(minPastMonth)
                    },
                    max: {
                        durationMs: maxPastMonth,
                        durationReadable: transformMiliseondsToDaysAndHours(maxPastMonth)
                    }
                },
                pastRest: {
                    average: {
                        durationMs: avgPastRest,
                        durationReadable: transformMiliseondsToDaysAndHours(avgPastRest)
                    },
                    combined: {
                        durationMs: sumPastRest,
                        durationReadable: transformMiliseondsToDaysAndHours(sumPastRest)
                    },
                    min: {
                        durationMs: minPastRest,
                        durationReadable: transformMiliseondsToDaysAndHours(minPastRest)
                    },
                    max: {
                        durationMs: maxPastRest,
                        durationReadable: transformMiliseondsToDaysAndHours(maxPastRest)
                    }
                }
            }

            res.send(stats)
        }
    )
}

module.exports = TimeUntilMerged