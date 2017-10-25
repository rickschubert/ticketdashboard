import React from "react"
import Chart from "chart.js"
import BugsByTimeRange from "./BugsByTimeRange.jsx"
import IssuesByTimeRange from "./IssuesByTimeRange.jsx"
import IssuesByLabel from "./IssuesByLabel.jsx"

class BugsAndTickets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bugStats: {
                bugsSince7Days: { closed: 0, open: 0 },
                bugsSince30Days: { closed: 0, open: 0 },
                bugsTotal: { closed: 0, open: 0 }
            },
            issueStats: {
                issuesSince7Days: { closed: 0, open: 0 },
                issuesSince30Days: { closed: 0, open: 0 },
                issuesTotal: { closed: 0, open: 0 }
            },
        }
    }

    render() {
        return (
            <div className="container">
                <BugsByTimeRange bugStats={this.state.bugStats} />
                <IssuesByTimeRange issueStats={this.state.issueStats} />
                <IssuesByLabel />
            </div>
        )
    }

    componentDidMount() {
        const createChartJsInstance = (canvasId) => {
            return new Chart(
                document.getElementById(canvasId).getContext("2d"),
                {
                    type: "pie",
                    data: {
                        datasets: [{
                            data: [1, 1]
                        }]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        tooltips: {
                            enabled: false
                        }
                    }
                }
            )
        }

        const bugsSince7Days = createChartJsInstance("bugsSince7Days")
        const bugsSince30Days = createChartJsInstance("bugsSince30Days")
        const bugsTotal = createChartJsInstance("bugsTotal")
        const issuesSince7Days = createChartJsInstance("issuesSince7Days")
        const issuesSince30Days = createChartJsInstance("issuesSince30Days")
        const issuesTotal = createChartJsInstance("issuesTotal")

        const assignColoursAndUpdateChart = (coloursArray, chartsArray) => {
            chartsArray.forEach(
                (chartInstance) => {
                    chartInstance.data.datasets[0].backgroundColor = coloursArray
                    chartInstance.update()
                }
            )
        }

        // Fetch data for bug charts and update
        fetch("/api/AmountBugsSince", {
            credentials: "same-origin",
            headers: {
                "accept": "application/json"
            }
        })
            .then(res => {
                if (!res.ok) return Promise.reject(new Error(`HTTP Error ${res.status}`))

                return res.json() // parse json body
            })
            .then(data => {
                console.log(data)
                const bugsColours = ["hsl(355, 65%, 65%)", "hsl(207, 82%, 66%)"]
                bugsSince7Days.data.datasets[0].data = [data.bugsSince7Days.open, data.bugsSince7Days.closed]
                bugsSince30Days.data.datasets[0].data = [data.bugsSince30Days.open, data.bugsSince30Days.closed]
                bugsTotal.data.datasets[0].data = [data.bugsTotal.open, data.bugsTotal.closed]
                assignColoursAndUpdateChart(bugsColours, [bugsSince7Days, bugsSince30Days, bugsTotal])

                this.setState(
                    () => {
                        return { bugStats: data }
                    }
                )
            })
            .catch(err => console.error(err))

        // Fetch data for issue charts and update
        fetch("/api/AmountIssuesSince", {
            credentials: "same-origin",
            headers: {
                "accept": "application/json"
            }
        })
            .then(res => {
                if (!res.ok) return Promise.reject(new Error(`HTTP Error ${res.status}`))

                return res.json() // parse json body
            })
            .then(data => {
                console.log(data)
                const issuesColours = ["hsl( 29, 54%, 61%)", "hsl(187, 47%, 55%)"]
                issuesSince7Days.data.datasets[0].data = [data.issuesSince7Days.open, data.issuesSince7Days.closed]
                issuesSince30Days.data.datasets[0].data = [data.issuesSince30Days.open, data.issuesSince30Days.closed]
                issuesTotal.data.datasets[0].data = [data.issuesTotal.open, data.issuesTotal.closed]
                assignColoursAndUpdateChart(issuesColours, [issuesSince7Days, issuesSince30Days, issuesTotal])

                this.setState(
                    () => {
                        return { issueStats: data }
                    }
                )
            })
            .catch(err => console.error(err))
    }
}

export default BugsAndTickets