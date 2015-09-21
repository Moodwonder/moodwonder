import _ from 'underscore';

const quickstatistics = {

    getLastRatings: function (surveyresults) {
        return _.first(_.sortBy(surveyresults, function(o) { return o.created.d; }).reverse(),13);
    }

};

export default quickstatistics;