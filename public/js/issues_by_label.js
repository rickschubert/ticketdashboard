fetch('/api/AmountBugsSince', {
    credentials: 'same-origin',
    headers: {
        'accept': 'application/json'
    }
    })
    .then(res => {
        if (!res.ok) return Promise.reject(new Error(`HTTP Error ${res.status}`))

        return res.json() // parse json body
    })
    .then(
        (response) => {
            const OneDarkFGcol = "#CACFD8"
        
            var ctx = document.getElementById('IssuesByLabel').getContext('2d');
            var myPieChart = new Chart(ctx,{
                type: 'pie',
                data: {
                    datasets: [{
                        data: response.datasetsFromServer,
                        backgroundColor: ["hsl(187, 47%, 55%)", "hsl( 95, 38%, 62%)", "hsl(286, 60%, 67%)", "hsl(355, 65%, 65%)", "hsl(207, 82%, 66%)", "hsl( 29, 54%, 61%)", "hsl(187, 47%, 55%)", "hsl( 95, 38%, 62%)", "hsl(286, 60%, 67%)", "hsl(355, 65%, 65%)", "hsl(207, 82%, 66%)", "hsl( 29, 54%, 61%)", "hsl(187, 47%, 55%)", "hsl( 95, 38%, 62%)", "hsl(286, 60%, 67%)", "hsl(355, 65%, 65%)", "hsl(207, 82%, 66%)", "hsl( 29, 54%, 61%)", "hsl(187, 47%, 55%)", "hsl( 95, 38%, 62%)", "hsl(286, 60%, 67%)", "hsl(355, 65%, 65%)", "hsl(207, 82%, 66%)", "hsl( 29, 54%, 61%)", "hsl(187, 47%, 55%)", "hsl( 95, 38%, 62%)", "hsl(286, 60%, 67%)", "hsl(355, 65%, 65%)", "hsl(207, 82%, 66%)", "hsl( 29, 54%, 61%)", "hsl(187, 47%, 55%)", "hsl( 95, 38%, 62%)", "hsl(286, 60%, 67%)", "hsl(355, 65%, 65%)", "hsl(207, 82%, 66%)", "hsl( 29, 54%, 61%)", "hsl(187, 47%, 55%)", "hsl( 95, 38%, 62%)", "hsl(286, 60%, 67%)", "hsl(355, 65%, 65%)", "hsl(207, 82%, 66%)", "hsl( 29, 54%, 61%)"]
                    }],
                    labels: response.labelsFromServer
                },
                options: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: "Open Issues by Label",
                        fontColor: OneDarkFGcol
                    }
                }
            });
        }
    )
    .catch(err => console.error(err))
