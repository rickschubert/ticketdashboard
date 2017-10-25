import React from "react"
import ChartColSize4 from "./ChartColSize4.jsx"


const IssuesByTimeRange = (props) => {
    return (
        <div className="row issues">
            <ChartColSize4
                canvasid="issuesSince7Days"
                chartTitle="Issues, Last 7 Days"
                openNr={props.issueStats.issuesSince7Days.open}
                closedNr={props.issueStats.issuesSince7Days.closed}
            />
            <ChartColSize4
                canvasid="issuesSince30Days"
                chartTitle="Issues, Last 30 Days"
                openNr={props.issueStats.issuesSince30Days.open}
                closedNr={props.issueStats.issuesSince30Days.closed}
            />
            <ChartColSize4
                canvasid="issuesTotal"
                chartTitle="Total Amount of Issues"
                openNr={props.issueStats.issuesTotal.open}
                closedNr={props.issueStats.issuesTotal.closed}
            />
        </div>
    )
}

export default IssuesByTimeRange