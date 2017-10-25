import React from "react"
import ChartColSize4 from "./ChartColSize4.jsx"

const BugsByTimeRange = (props) => {
    return (
        <div className="row bugs">
            <ChartColSize4
                canvasid="bugsSince7Days"
                chartTitle="Bugs, Last 7 Days"
                openNr={props.bugStats.bugsSince7Days.open}
                closedNr={props.bugStats.bugsSince7Days.closed}
            />
            <ChartColSize4
                canvasid="bugsSince30Days"
                chartTitle="Bugs, Last 30 Days"
                openNr={props.bugStats.bugsSince30Days.open}
                closedNr={props.bugStats.bugsSince30Days.closed}
            />
            <ChartColSize4
                canvasid="bugsTotal"
                chartTitle="Total Amount of Bugs"
                openNr={props.bugStats.bugsTotal.open}
                closedNr={props.bugStats.bugsTotal.closed}
            />
        </div>
    )
}

export default BugsByTimeRange