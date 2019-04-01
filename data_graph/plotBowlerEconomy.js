fetch('../json_data/economicBowlers.json').then(res => res.json()).then(json => plot(json));

function formatData(jsonData){
    let xData = Object.keys(jsonData);
    return xData.reduce((accumulator, keys) => {
        var obj ={};
        obj['name'] = keys;
        obj['y'] = jsonData[keys];
        accumulator.push(obj);
        return accumulator;
    },[])
}

function plot(json){
    // Create the chart
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'IPL Season 2015 : Top Economical Bowlers'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Economy'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:13px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },

        "series": [
            {
                "name": "Top Economical Bowlers",
                "colorByPoint": true,
                "data": formatData(json)
            }
        ]
    })
}
