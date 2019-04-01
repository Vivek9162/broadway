fetch('../json_data/winningCount.json').then(res => res.json()).then(json => {
    let x=formattedData(json);
    plot(x);
})

function formattedData(json){
    let keys = Object.values(json)
    let teamNames = keys.reduce((accumulator,obj) => {
        var names = Object.keys(obj)
        names.map(name => {
            if(!accumulator.includes(name)){
                accumulator.push(name)
            }
        })
        return accumulator;
    },[])
    let teamWins = keys.reduce((accumulator,object) => {
        teamNames.map(teamName => {
            if(object.hasOwnProperty(teamName)){
                if(accumulator.hasOwnProperty(teamName)){
                accumulator[teamName].push(object[teamName]);
                }else{
                accumulator[teamName] = [];
                accumulator[teamName].push(object[teamName]);
                }
            }else{
                if(accumulator.hasOwnProperty(teamName)){
                    accumulator[teamName].push(0);
                }else{
                    accumulator[teamName] = [];
                    accumulator[teamName].push(0);
                }
            }
        });
        return accumulator;
    }, {})
    let teams = Object.keys(teamWins);
    return teams.reduce((accumulator,team) => {
        let newData = {};
        newData['name'] = team;
        newData['data'] = teamWins[team];
        accumulator.push(newData);
        return accumulator;
    },[])
}

function plot(json){
    Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Total Wins of Each Team'
        },
        xAxis: {
            categories: [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Wins'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: json
    });
}
