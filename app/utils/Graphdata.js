import _ from 'underscore';

let data = [];
let period = 0;


const graphdata = {

    getEngagementGraphData: function (graphperiod, engagementmood, surveyresults) {

        //console.log(JSON.stringify(surveyresults));
        switch (graphperiod) {
            case 'all_time' :
                period = 0;
                break;

            case 'last_12_months' :
                period = 12;
                break;

            case 'last_6_ months' :
                period = 6;
                break;

            case 'last_3_months' :
                period = 3;
                break;

            case 'last_month' :
                period = 1;
                break;

            default :
                period = 0;
                break;
        }

        if(period > 0) {
            surveyresults = this.filterByDate(period, surveyresults);
        }

        if (engagementmood === 'mw_index') {

            let uniquedaterows = _(surveyresults).groupBy(function(surveyresult) {
                return surveyresult.created.d;
            });

            data = _(uniquedaterows).map(function(g, key) {
                return { created : { d: key},
                         rating: ((_(g).reduce(function(m,x) { return m + x.rating; }, 0)) / 13).toFixed(1),
                         sum: _(g).reduce(function(m,x) { return m + x.rating; }, 0) };
            });

        } else {
            data = _(surveyresults).where({mood: engagementmood});
        }

        return data;
    },

    filterByDate: function (months, rows) {

        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
        let datestring = year + '-' + month + '-' + day;

        let date = new Date(datestring);
        date.setMonth(date.getMonth() - months); // Subtracted number of months here.
        let ndate = new Date(date);

        let nyear = ndate.getFullYear();
        let nmonth = ('0' + (ndate.getMonth() + 1)).slice(-2);
        let nday = ('0' + ndate.getDate()).slice(-2);
        let ndatestring = nyear + '-' + nmonth + '-' + nday;

        return _.filter(rows, function(v) { return v.created.d >= ndatestring; });
    },

    getEngagementStatitics: function (period, mood, results) {

        let statitics = statitics || {};
        let resultrows = this.getEngagementGraphData(period, mood, results);

        let lowest = _.min(resultrows, function(o){return o.rating;});
        statitics.lowest = lowest.rating;

        let highest = _.max(resultrows, function(o){return o.rating;});
        statitics.highest = highest.rating;

        let current = _.sortBy(resultrows, function(o) { return o.created.d; }).reverse();
        for (let eCurrent of current) {
            statitics.current = eCurrent.rating;
            break;
        }

        let start = _.sortBy(resultrows, function(o) { return o.created.d; });
        for (let eStart of start) {
            statitics.start = eStart.rating;
            break;
        }

        return statitics;
    }




};

export default graphdata;