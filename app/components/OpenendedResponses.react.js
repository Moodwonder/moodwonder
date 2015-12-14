import React from 'react';
import _ from 'underscore';
import OpenEndedActions from 'actions/OpenEndedActions';
import OpenEndedStore from 'stores/OpenEndedStore';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';



export default class OpenendedResponses extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          questions : OpenEndedStore.getState().questions,
          members : OpenEndedStore.getState().members,
          answers : OpenEndedStore.getState().answers,
          uid: '',
          multilang: MlangStore.getState().multilang
      };
  }

  componentDidMount() {
      OpenEndedActions.getQuestions();
      OpenEndedActions.getMembers();
      OpenEndedStore.listen(this._onOpenChange);

      $('.member').dropdown('show');

      $('.member').dropdown({
         onChange: this.myFunction
      });
  }

  componentWillUnmount() {
      OpenEndedStore.unlisten(this._onOpenChange);
  }

  componentDidUpdate() {
      //$('.member').dropdown();
  }

  _onOpenChange = () => {
      this.setState({
          questions: OpenEndedStore.getState().questions,
          members : OpenEndedStore.getState().members,
          answers : OpenEndedStore.getState().answers
      });
  }

  onChangeMember = (e) => {
      let uid = e.target.value;
      if (uid) {
          OpenEndedActions.getAnswers(uid);
          this.setState({ uid: uid});
      }
  }

  myFunction = () => {
      let x = document.getElementById("member");
      let uid = x.value;
      if (uid) {
          OpenEndedActions.getAnswers(uid);
          this.setState({ uid: uid});
      }
  }


  render() {

      let questions = this.state.questions;
      let members = this.state.members;
      let answers = this.state.answers;
      let uid = this.state.uid;
      let mlarray = this.state.multilang;

      let options;
      if (members) {
          options = members.map((member) => {
              if (member.firstname === '' || member.firstname === undefined) {
                  return (<option value={member._id}>{member.email}</option>);
              } else {
                  return (<option value={member._id}>{member.firstname + " " + member.lastname}</option>);
              }
          });
      }

      let sResponses;
      let username;
      let content;
      let smember = _.filter(members, function(v) { return v._id == uid; });

      let data = answers.map((ans) => {
          let temp = {};
          for (let q in questions) {
              temp.most_improved_qone = questions[q].most_improved_qone;
              temp.most_improved_aone = ans.most_improved_aone;
              temp.most_improved_qtwo = questions[q].most_improved_qtwo;
              temp.most_improved_atwo = ans.most_improved_atwo;
              temp.most_improved_qthree = questions[q].most_improved_qthree;
              temp.most_improved_athree = ans.most_improved_athree;
              temp.least_improved_qone = questions[q].least_improved_qone;
              temp.least_improved_aone = ans.least_improved_aone;
              temp.least_improved_qtwo = questions[q].least_improved_qtwo;
              temp.least_improved_atwo = ans.least_improved_atwo;
              temp.least_improved_qthree = questions[q].least_improved_qthree;
              temp.least_improved_athree = ans.least_improved_athree;
          }
          return temp;
      });

      if (uid) {

          for (let u in smember) {
              if(smember[u].firstname === '' || smember[u].firstname === undefined) {
                  username = smember[u].email;
              } else {
                  username = smember[u].firstname + " " + smember[u].lastname;
              }
          }

          content = data.map((row) => {

              return (
                        <div className="custom-box">
                            <div className="ui two column stackable grid survey">

                                <div className="column padin-lft">
                                    <div className="ui form options">
                                        <div className="inline fields">{row.most_improved_qone}</div>
                                    </div>
                                </div>

                                <div className="column ">
                                    <label className="line-height">{row.most_improved_aone}</label>
                                </div>

                                <div className="column padin-lft">
                                    <div className="ui form options">
                                        <div className="inline fields">{row.most_improved_qtwo}</div>
                                    </div>
                                </div>

                                <div className="column ">
                                    <label className="line-height">{row.most_improved_atwo}</label>
                                </div>

                                <div className="column padin-lft">
                                    <div className="ui form options">
                                        <div className="inline fields">{row.most_improved_qthree}</div>
                                    </div>
                                </div>

                                <div className="column ">
                                    <label className="line-height">{row.most_improved_athree}</label>
                                </div>

                                <div className="column padin-lft">
                                    <div className="ui form options">
                                        <div className="inline fields">{row.least_improved_qone}</div>
                                    </div>
                                </div>

                                <div className="column ">
                                    <label className="line-height">{row.least_improved_aone}</label>
                                </div>

                                <div className="column padin-lft">
                                    <div className="ui form options">
                                        <div className="inline fields">{row.least_improved_qtwo}</div>
                                    </div>
                                </div>

                                <div className="column ">
                                    <label className="line-height">{row.least_improved_atwo}</label>
                                </div>

                                <div className="column padin-lft">
                                    <div className="ui form options">
                                        <div className="inline fields">{row.least_improved_qthree}</div>
                                    </div>
                                </div>

                                <div className="column ">
                                    <label className="line-height">{row.least_improved_athree}</label>
                                </div>

                            </div>
                        </div>
              );
          });


          sResponses = (
                    <div className="custom-box">
                        <div className="ui two column stackable grid survey">
                            <div className="column ">
                                <label className="line-height">User - {username}</label>
                            </div>
                            <div className="column "></div>
                        </div>
                    </div>
          );

      }


      return (
            <div className="ui segment brdr-none padding-none width-rating">
                <div className="clear"></div>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <h4 className="ui header ryt com">{GetText('OPER_TITLE', mlarray)}</h4>
                    </div>
                    <div className="column"></div>
                    <div className="column">
                        <div className="three column">
                            <select id="member" onChange={this.onChangeMember} style={{"float": "right"}} className="ui dropdown member">
                                <option value="">Select a member</option>
                                {options}
                            </select>
                        </div>
                    </div>
                </div>

                {sResponses}
                {content}

            </div>
      );
  }
}
