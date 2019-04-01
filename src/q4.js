const csv = require('../convert_csv');
let matchData = csv.convertmyFile('../datasets/matches.csv');
let deliveryData = csv.convertmyFile('../datasets/deliveries.csv');
const fs = require('fs');

function economicBowlers(matchData,deliveryData){
    let matchId = matchData.reduce((accumulator,matches) => {
        if(matches['season']==2015){
            accumulator.push(matches['id']);
        }
        return accumulator;
    },[]);
    let bowlerObj =  deliveryData.filter(delivery => {
        if(matchId.includes(delivery['match_id'])){
            return delivery;
        }
    }).reduce((accumulator,deliveries) => {
        if(accumulator.hasOwnProperty(deliveries['bowler'])){
            accumulator[deliveries['bowler']]['runs'] += deliveries['total_runs'];
            if(deliveries['ball']==1){
                accumulator[deliveries['bowler']]['overs'] +=1;
            }
            return accumulator;
        }else{
            accumulator[deliveries['bowler']] = {};
            accumulator[deliveries['bowler']]['runs'] = deliveries['total_runs'];
            accumulator[deliveries['bowler']]['overs'] = 1;
            return accumulator;
        }
    },{});
    let bowlerArr = Object.keys(bowlerObj);
    let ecoBowlersObj =  bowlerArr.reduce((ac,ec) => {
        ac[Math.round((bowlerObj[ec]['runs']/bowlerObj[ec]['overs'])*100)/100] = ec;
        return ac;
    },{});
    let ecoBowlersArr = Object.keys(ecoBowlersObj);
    return ecoBowlersArr.map(item => parseFloat(item)).sort((a,b) => a-b).slice(0,20).reduce((acc,item) => {
        acc[ecoBowlersObj[item]] = item;
        return acc;
    },{});
}

let ecoBowlerData = economicBowlers(matchData,deliveryData);

let data = JSON.stringify(ecoBowlerData, null, 2);
fs.writeFileSync('../json_data/economicBowlers.json',data);
