import _ from 'underscore';

const moodratings = {

    getTopThreeAreas: function (surveyresults) {

        let results = _.sortBy(surveyresults, function(o) { return o.rating; }).reverse();
        let topthree = _.first(_.uniq(results, function(row) { return row.mood; }),3);
        return topthree;
    },

    getWorstThreeAreas: function (surveyresults) {

        let topthree = this.getTopThreeAreas(surveyresults).map((data, key) => {
            return data.mood;
        });

        let results = _.sortBy(surveyresults, function(o) { return o.rating;});

        let finaldata = results.filter(function(o) {
            for (let i = 0; i < topthree.length; i++)
               if (topthree[i] === o.mood) return false;
            return true;
        });

        let worstthree = _.first(_.uniq(finaldata, function(row) { return row.mood; }),3);
        return worstthree;
    },

    getLastMonthData: function (surveyresults) {
        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
        let datestring = year + '-' + month + '-' + day;

        let date = new Date(datestring);
        date.setMonth(date.getMonth() - 1);

        let ndate = new Date(date);
        let nyear = ndate.getFullYear();
        let nmonth = ('0' + (ndate.getMonth() + 1)).slice(-2);
        let nday = ('0' + ndate.getDate()).slice(-2);
        let ndatestring = nyear + '-' + nmonth + '-' + nday;

        let results = _.filter(surveyresults, function(v) { return v.created.d >= ndatestring; });
        return results;
    },

    getMostImprovedAreas: function (surveyresults) {

        let results = this.getLastMonthData(surveyresults);
        let sortedArray = _.sortBy(results, function(o) { return o.rating;}).reverse();
        let groupedArray = _(sortedArray).groupBy(function(surveyresult) { return surveyresult.mood; });

        let data = _(groupedArray).map(function(g, key) {
            let mtop = _.sortBy(g, function(o) { return o.created.d; });
            let difference = (mtop[mtop.length -1].rating - mtop[0].rating).toFixed(1);
            let mood = mtop[0].mood;
            return {mood : mood, difference: difference};
        });

        let finalArray = _.sortBy(data, function(o) { return o.difference;}).reverse();
        let improvedareas = _.first(_.uniq(finalArray, function(row) { return row.difference; }),3);
        return improvedareas;

    },

    getWorstImprovedAreas: function (surveyresults) {

        let results = this.getLastMonthData(surveyresults);
        let sortedArray = _.sortBy(results, function(o) { return o.rating;});
        let groupedArray = _(sortedArray).groupBy(function(surveyresult) { return surveyresult.mood; });

        let data = _(groupedArray).map(function(g, key) {
            let mtop = _.sortBy(g, function(o) { return o.created.d; });
            let difference = (mtop[mtop.length -1].rating - mtop[0].rating).toFixed(1);
            let mood = mtop[0].mood;
            return {mood : mood, difference: difference};
        });

        let finalArray = _.sortBy(data, function(o) { return o.difference;});
        let improvedareas = _.first(_.uniq(finalArray, function(row) { return row.difference; }),3);
        return improvedareas;

    }

};

export default moodratings;