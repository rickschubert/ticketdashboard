import React from "react"
import ChartOverlay from "./ChartOverlay.jsx"


const ChartColSize4 = (props) => {
    return (
        <div className="col-sm-4">
            <canvas id={props.canvasid} className="chart-canvas"></canvas>
            <ChartOverlay
                chartTitle={props.chartTitle}
                openNr={props.openNr}
                closedNr={props.closedNr}
            />
        </div>
    )
}

export default ChartColSize4