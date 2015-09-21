import _ from 'underscore';

const quickstatistics = {

    getLastRatings: function (surveyresults) {
        return _.first(_.sortBy(surveyresults, function(o) { return o.created.d; }).reverse(),13);
    },

    getTotalEmployees: function (companysurvey) {
        return _.uniq(companysurvey, function(person) { return person.user_id; }).length;
    },

    getLastMonthResponses: function (companysurvey) {
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

        let results = _.filter(companysurvey, function(v) { return v.created.d >= ndatestring; });
        let uGroupResults = _(results).groupBy(function(result) {
                return result.mood;
            });

        return _.map(uGroupResults.Mood, function(n, i) { return i; }).length;

    },

    getMyEmployeeEngagement: function (companysurvey, uid) {

        let userresults = _(companysurvey).where({user_id: uid});
        let eng = _.first(_.sortBy(userresults, function(o) { return o._id; }).reverse(), 13);
        let sum = 0;
        for(let u of eng) {
            sum = sum + u.rating;
        }

        return ((sum/13).toFixed(1));
    },

    getEmployeeAtRisk: function (companysurvey) {

        let uGroupResults = _(companysurvey).groupBy(function(result) {
                return result.user_id;
            });

        let uData = _(uGroupResults).map(function(g, key) {
            let latest =  _.first(_.sortBy(g, function(o) { return o._id; }).reverse(),13);
            return {   user_id: key,
                       avg : ((_(latest).reduce(function(m,x) { return m + x.rating; }, 0))/13).toFixed(1)};
        });

        let employee = 0;
        for (let u of uData) {
            if(u.avg < 3.5) {
                employee++;
            }
        }

        return employee;
    }

};

export default quickstatistics;