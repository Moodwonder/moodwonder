import React from 'react';
import _ from 'underscore';
import CustomSurveyResultsActions from 'actions/CustomSurveyResultsActions';
import CustomSurveyResultsStore from 'stores/CustomSurveyResultsStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import Submenu from 'components/Submenu.react';

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

      let userGroup = _(surveyresponses).groupBy(function(row) {
          return row.user_id;
      });

      let rData = _(userGroup).map(function(g, key) {

          for (let u in users) {
              let user = users[u];
              if(user._id === key) {
                  return {
                            username: user.name,
                            surveyresponse: _.sortBy(g, function(o) { return o.question_id; })
                        };
              }
          }

      });


      let stitle = surveyform.map(function(survey) {
          return survey.surveytitle;
      });
      let content = '';

      content = rData.map(function(data) {
          let username = data.username;
          let surveyresponse = data.surveyresponse;
          let responsecontent = '';

          responsecontent = surveyresponse.map(function(resdata) {

              let answers = resdata.answers.map(function(ans) {
                  return (<span>
                            {ans.option}
                            <br/>
                          </span>);
              });

              return (<div>
                        <span>Question : {resdata.question}</span>
                        <br/>
                        <div>Answer : {answers}</div>
                      </div>);
          });

          return (<div>
                       <span>User - {username}</span>
                       <br/>
                       {responsecontent}
                       <br/>
                  </div>);
      });


      return (
      <div className="container">
      <Submenu />
        <div className="form-group">
          <a href="/surveyforms" >Custom Survey Listing</a>
        </div>
        <h2>{stitle}</h2>
        {content}
      </div>
    );
  }
}

Customsurveyresponses.contextTypes = { router: React.PropTypes.func };


