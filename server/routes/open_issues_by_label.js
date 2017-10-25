const OpenIssuesByLabel = (db, app) => {
    app.get(
        "/api/OpenIssuesByLabel",
        async (req, res) => {
            const issuesByLabel = await db.collection("GHISSUES").aggregate(
                [
                    {
                        $match: {state: "open"}
                    },
                    {
                        $unwind: "$labels"
                    },
                    {
                        $group: {"_id": "$labels.name", Count:{$sum:1}}
                    },
                    {
                        $sort: {Count: -1}
                    }
                ]
            ).toArray()
            
            let resObj = {
                labelsFromServer: [],
                datasetsFromServer: []
            }
            
            for (key in issuesByLabel) {
                resObj.labelsFromServer.push(issuesByLabel[key]["_id"])
                resObj.datasetsFromServer.push(issuesByLabel[key]["Count"])
            }
            
            res.send(resObj)
        }
    )
}

module.exports = {OpenIssuesByLabel}