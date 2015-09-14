//var data = [
//            {"mood": "mood", "id": 3},
//            {"mood": "vvv22", "id": 4},
//  	    {"mood": "mood", "id": 5},
//            {"mood": "ggggv22", "id": 6}
//];
//var res = _(data).where({mood: 'mood'});
//console.log(res);

const graphdata = {

    getEngagementGraphData: function (graphperiod, engagementmood, surveyresults) {

        console.log(engagementmood);
        console.log(surveyresults);
        switch (graphperiod) {
            case 'all_time' :
                console.log(graphperiod);
                break;

            case 'last_12_months' :
                console.log(graphperiod);
                break;

            case 'last_6_ months' :
                console.log(graphperiod);
                break;

            case 'last_3_months' :
                console.log(graphperiod);
                break;

            case 'last_month' :
                console.log(graphperiod);
                break;

            default :
                console.log('default - all_time');
                break;
        }
        return;
    }



};

export default graphdata;