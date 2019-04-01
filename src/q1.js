const csv = require('../convert_csv');
let matchData = csv.convertmyFile('../datasets/matches.csv');
const fs = require('fs');

function matchesTotal(matchData){
    return matchData.reduce((accumulator,matches) => {
    if(accumulator.hasOwnProperty(matches['season'])){
        accumulator[matches['season']] += 1;
        return accumulator;
    }else{
        accumulator[matches['season']] = 1;
        return accumulator;
    }
},{});
}
let totalMatches = matchesTotal(matchData);

let data = JSON.stringify(totalMatches, null, 2);
fs.writeFileSync('../json_data/matchesTotal.json',data);
