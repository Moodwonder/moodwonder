import React from 'react';
import _ from 'underscore';
import CustomSurveyResultsActions from 'actions/CustomSurveyResultsActions';
import CustomSurveyResultsStore from 'stores/CustomSurveyResultsStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class Customsurveyresponses extends React.Component {

  constructor(props) {
      super(props);
      mixins(Navigation, this);
      this.state = {
          surveyform: [],
          users: [],
          surveyresponses: []
      };
  }

  componentDidMount() {
      let id = this.props.params.key;
      CustomSurveyResultsActions.getSurveyResponses(id);
      CustomSurveyResultsStore.listen(this._onChange);
      //this.setState({formstatus: false});
  }

  componentWillUnmount() {
      CustomSurveyResultsStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
       surveyform: CustomSurveyResultsStore.getState().surveyform,
       users: CustomSurveyResultsStore.getState().users,
       surveyresponses: CustomSurveyResultsStore.getState().surveyresponses
    });
  }



  render() {

      let surveyform = this.state.surveyform;
      let users = this.state.users;
      let surveyresponses = this.state.surveyresponses;
      let content = '';

      let stitle = surveyform.map(function(survey) {
          return survey.surveytitle;
      });

      if (surveyresponses.length > 0) {
          let userGroup = _(surveyresponses).groupBy(function(row) {
              return row.user_id;
          });

          let rData = _(userGroup).map(function(g, key) {

              for (let u in users) {
                  let user = users[u];
                  if(user._id === key) {
                      return {
                                //username: user.name,
                                surveyresponse: _.sortBy(g, function(o) { return o.question_id; })
                            };
                  }
              }
          });

          content = rData.map(function(data) {
              //let username = data.username;
              let surveyresponse = data.surveyresponse;
              let responsecontent = '';

              responsecontent = surveyresponse.map(function(resdata) {

                  let answers = resdata.answers.map(function(ans) {
                      return (
                                <div className="column padin-lft">
                                    <div className="">
                                        <div className="inline fields">
                                            A : {ans.option}
                                        </div>
                                    </div>
                                </div>
                      );
                  });

                  return ([
                            <div className="column " style={{"marginTop":"10px"}}>
                                <label className="">Q : {resdata.question}:</label>
                            </div>,
                            {answers}
                  ]);
              });

              return (
                        <div className="custom-box">
                            <div className="ui one column stackable grid survey">
                                {responsecontent}
                            </div>
                        </div>
                     );
          });

      } else {
          content = (
                    <div className="custom-box">
                        <div className="ui one column stackable grid survey">
                            <div className="column ">
                                <label className="line-height">No responses.</label>
                            </div>
                        </div>
                    </div>
          );
      }


      return (
        <div className="ui segment brdr-none padding-none width-rating">
            <div className="clear"></div>
            <div className="ui two column stackable grid container ">
                <div className="column">
                    <h4 className="ui header ryt com">{stitle}</h4>
                </div>
                <div className="column">
                    <div className="three  column">
                        <div className="test-gen ui submit ble button "> <a href="/surveyforms">Survey lists</a></div>
                    </div>
                </div>
            </div>
            {content}
        </div>
      );
  }
}

Customsurveyresponses.contextTypes = { router: React.PropTypes.func };


