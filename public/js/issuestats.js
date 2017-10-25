$(document).ready(() => {
    $.ajax({
        url: "/api/AmountissuesSince",
        dataType: "json",
        error: errorFetchingIssues,
        success: successFetchingIssues
    })
})

const successFetchingIssues = (response, textStatus, jQXHR) => {
    const OneDarkFGcol = "#CACFD8"

    var ctx = document.getElementById('issuesTotal').getContext('2d');
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: {
            datasets: [{
                data: [response.issuesTotal[0]["Count"], response.issuesTotal[1]["Count"]],
                backgroundColor: ["hsl(187, 47%, 55%)", "hsl( 29, 54%, 61%)"]
            }],
            labels: [response.issuesTotal[0]["_id"], response.issuesTotal[1]["_id"]]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Total Amount of Issues",
                fontColor: OneDarkFGcol
            }
        }
    });

    var ctx = document.getElementById('issuesSince30Days').getContext('2d');
    var issuesSince30Days = new Chart(ctx,{
        type: 'pie',
        data: {
            datasets: [{
                data: [response.issuesSince30Days[0]["Count"], response.issuesSince30Days[1]["Count"]],
                backgroundColor: ["hsl(187, 47%, 55%)", "hsl( 29, 54%, 61%)"]
            }],
            labels: [response.issuesSince30Days[0]["_id"], response.issuesSince30Days[1]["_id"]]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Issues, Last 30 Days",
                fontColor: OneDarkFGcol
            }
        }
    });
    
    var ctx = document.getElementById('issuesSince7Days').getContext('2d');
    var issuesSince7Days = new Chart(ctx,{
        type: 'pie',
        data: {
            datasets: [{
                data: [response.issuesSince7Days[0]["Count"], response.issuesSince7Days[1]["Count"]],
                backgroundColor: ["hsl(187, 47%, 55%)", "hsl( 29, 54%, 61%)"]
            }],
            labels: [response.issuesSince7Days[0]["_id"], response.issuesSince7Days[1]["_id"]]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Issues, Last 7 Days",
                fontColor: OneDarkFGcol
            }
        }
    });
}

const errorFetchingIssues = (jQXHR, textStatus, errorThrown) => {
    console.log(`An error occured: ${errorThrown}`)
}