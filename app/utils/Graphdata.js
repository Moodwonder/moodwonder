//var data = [
//            {"mood": "mood", "id": 3},
//            {"mood": "vvv22", "id": 4},
//  	    {"mood": "mood", "id": 5},
//            {"mood": "ggggv22", "id": 6}
//];
//var res = _(data).where({mood: 'mood'});
//console.log(res);

import _ from 'underscore';

let data = [];
const graphdata = {

    getEngagementGraphData: function (graphperiod, engagementmood, surveyresults) {

        //console.log(engagementmood);
        //console.log(JSON.stringify(surveyresults));
        switch (graphperiod) {
            case 'all_time' :
                data = _(surveyresults).where({mood: engagementmood});
                console.log(JSON.stringify(data));
                break;

            case 'last_12_months' :
                //console.log(graphperiod);
                break;

            case 'last_6_ months' :
                //console.log(graphperiod);
                break;

            case 'last_3_months' :
                //console.log(graphperiod);
                break;

            case 'last_month' :
                //console.log(graphperiod);
                break;

            default :
                break;
        }
        return data;
    }



};

export default graphdata;