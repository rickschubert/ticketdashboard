$(document).ready(() => {
    $.ajax({
        url: "/api/AmountBugsSince",
        dataType: "json",
        error: errorFetchingBugs,
        success: successFetchingBugs
    })
})


const successFetchingBugs = (response, textStatus, jQXHR) => {
    const OneDarkFGcol = "#CACFD8"
    
    var ctx = document.getElementById('bugsTotal').getContext('2d');
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: {
            datasets: [{
                data: [response.bugsTotal[0]["Count"], response.bugsTotal[1]["Count"]],
                backgroundColor: ["hsl(207, 82%, 66%)", "hsl(355, 65%, 65%)"]
            }],
            labels: [response.bugsTotal[0]["_id"], response.bugsTotal[1]["_id"]]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Total Amount of Bugs",
                fontColor: OneDarkFGcol
            }
        }
    });

    var ctx = document.getElementById('bugsSince30Days').getContext('2d');
    var bugsSince30Days = new Chart(ctx,{
        type: 'pie',
        data: {
            datasets: [{
                data: [response.bugsSince30Days[0]["Count"], response.bugsSince30Days[1]["Count"]],
                backgroundColor: ["hsl(207, 82%, 66%)", "hsl(355, 65%, 65%)"]
            }],
            labels: [response.bugsSince30Days[0]["_id"], response.bugsSince30Days[1]["_id"]]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Bugs, Last 30 Days",
                fontColor: OneDarkFGcol
            }
        }
    });
    
    var ctx = document.getElementById('bugsSince7Days').getContext('2d');
    var bugsSince7Days = new Chart(ctx,{
        type: 'pie',
        data: {
            datasets: [{
                data: [response.bugsSince7Days[0]["Count"], response.bugsSince7Days[1]["Count"]],
                backgroundColor: ["hsl(207, 82%, 66%)", "hsl(355, 65%, 65%)"]
            }],
            labels: [response.bugsSince7Days[0]["_id"], response.bugsSince7Days[1]["_id"]]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Bugs, Last 7 Days",
                fontColor: OneDarkFGcol
            }
        }
    });
}

const errorFetchingBugs = (jQXHR, textStatus, errorThrown) => {
    console.log(`An error occured: ${errorThrown}`)
}