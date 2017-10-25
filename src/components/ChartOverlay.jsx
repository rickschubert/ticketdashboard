import React from "react"


const ChartOverlay = (props) => {
    return (
        <div className="labeloverlay">
            <p>{props.chartTitle}</p>
            <p>{props.openNr} Open - {props.closedNr} Closed</p>
        </div>
    )
}

export default ChartOverlay