import React from "react"
import Chart from "chart.js"
import ZenHubAverageTimes from "./ZenHubAverageTimes.jsx"

class WorkingTimes extends React.Component {
    constructor(props) {
        super(props)
        // define the default state in here
    }

    render() {
        return (
            <div className="container">
                <ZenHubAverageTimes />
            </div>
        )
    }

    componentDidMount() {
        const ZenHubAverageTimes = new Chart(
            document.getElementById("ZenHubTimes").getContext('2d'), 
            {
                type: 'horizontalBar',
                data: {
                    labels: [
                        "Past Week",
                        "Past Month",
                        "Overall"
                    ],
                    datasets: [
                        {
                            label: "Average Time Spent",
                            data: [98321716.33333333, 237118764.98101267, 449833509.1712329],
                            backgroundColor: ["hsl(355, 65%, 65%)", "hsl(207, 82%, 66%)", "hsl( 29, 54%, 61%)"]
                        }
                    ]
                },
                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                                min: 0
                            }
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            }
        )
    }
}

export default WorkingTimes