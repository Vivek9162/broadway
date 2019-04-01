const csv = require('../convert_csv');
let matchData = csv.convertmyFile('../datasets/matches.csv');
let deliveryData = csv.convertmyFile('../datasets/deliveries.csv');
const fs = require('fs');

function extras(matchData,deliveryData){
    let matchId = matchData.reduce((accumulator,matches) => {
        if(matches['season']==2016){
            accumulator.push(matches['id']);
        }
        return accumulator;
    },[]);
    return deliveryData.filter(deliveries => {
        if(matchId.includes(deliveries['match_id'])){
            return deliveries;
        }
    }).reduce((accumulator,delivary) => {
        if(accumulator.hasOwnProperty(delivary['bowling_team'])){
            accumulator[delivary['bowling_team']] += delivary['extra_runs'];
        }else{
            accumulator[delivary['bowling_team']] = delivary['extra_runs'];
        }
    return accumulator;
    },{})
}

let extraRuns = extras(matchData,deliveryData);
let data = JSON.stringify(extraRuns, null, 2);
fs.writeFileSync('../json_data/extraRuns.json',data);
