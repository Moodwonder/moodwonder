import React from 'react';
import OpenEndedActions from 'actions/OpenEndedActions';
import OpenEndedStore from 'stores/OpenEndedStore';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';



export default class OpenendedResponses extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          members : OpenEndedStore.getState().members,
          answers : OpenEndedStore.getState().answers,
          uid: '',
          multilang: MlangStore.getState().multilang
      };
  }

  componentDidMount() {
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

      let content;

      let data = answers.map((ans) => {
          let temp = {};

          temp.most_improved_qone = ans.most_improved_qone;
          temp.most_improved_aone = ans.most_improved_aone;
          temp.most_improved_qtwo = ans.most_improved_qtwo;
          temp.most_improved_atwo = ans.most_improved_atwo;
          temp.most_improved_qthree = ans.most_improved_qthree;
          temp.most_improved_athree = ans.most_improved_athree;
          temp.least_improved_qone = ans.least_improved_qone;
          temp.least_improved_aone = ans.least_improved_aone;
          temp.least_improved_qtwo = ans.least_improved_qtwo;
          temp.least_improved_atwo = ans.least_improved_atwo;
          temp.least_improved_qthree = ans.least_improved_qthree;
          temp.least_improved_athree = ans.least_improved_athree;
          temp.most_improved_mood = ans.most_improved_mood;
          temp.least_improved_mood = ans.least_improved_mood;

          return temp;
      });

      if (uid) {

          if (data.length > 0) {
              content = data.map((row) => {

                  return (
                            <div className="custom-box">
                                <div className="ui one column stackable grid survey">

                                    <div className="column padin-lft">
                                        <div className="ui form options">
                                            <div className="inline fields">{'Most improved areas - ' + row.most_improved_mood}</div>
                                        </div>
                                    </div>

                                    <div className="column ">
                                        <label className="line-height"></label>
                                    </div>

                                    <div className="column padin-lft">
                                        <div className="ui form options">
                                            <div className="inline fields">Q:&nbsp; {row.most_improved_qone}</div>
                                        </div>
                                    </div>

                                    <div className="column ">
                                        <label className="line-height">A:&nbsp; {row.most_improved_aone}</label>
                                    </div>

                                    <div className="column padin-lft">
                                        <div className="ui form options">
                                            <div className="inline fields">Q:&nbsp; {row.most_improved_qtwo}</div>
                                        </div>
                                    </div>

                                    <div className="column ">
                                        <label className="line-height">A:&nbsp; {row.most_improved_atwo}</label>
                                    </div>

                                    <div className="column padin-lft">
                                        <div className="ui form options">
                                            <div className="inline fields">Q:&nbsp; {row.most_improved_qthree}</div>
                                        </div>
                                    </div>

                                    <div className="column ">
                                        <label className="line-height">A:&nbsp; {row.most_improved_athree}</label>
                                    </div>

                                    <div className="column padin-lft">
                                        <div className="ui form options">
                                            <div className="inline fields">{'Least improved areas - ' + row.least_improved_mood}</div>
                                        </div>
                                    </div>

                                    <div className="column ">
                                        <label className="line-height"></label>
                                    </div>

                                    <div className="column padin-lft">
                                        <div className="ui form options">
                                            <div className="inline fields">Q:&nbsp; {row.least_improved_qone}</div>
                                        </div>
                                    </div>

                                    <div className="column ">
                                        <label className="line-height">A:&nbsp; {row.least_improved_aone}</label>
                                    </div>

                                    <div className="column padin-lft">
                                        <div className="ui form options">
                                            <div className="inline fields">Q:&nbsp; {row.least_improved_qtwo}</div>
                                        </div>
                                    </div>

                                    <div className="column ">
                                        <label className="line-height">A:&nbsp; {row.least_improved_atwo}</label>
                                    </div>

                                    <div className="column padin-lft">
                                        <div className="ui form options">
                                            <div className="inline fields">Q:&nbsp; {row.least_improved_qthree}</div>
                                        </div>
                                    </div>

                                    <div className="column ">
                                        <label className="line-height">A:&nbsp; {row.least_improved_athree}</label>
                                    </div>

                                </div>
                            </div>
                  );
              });

          } else {

              content = (
                        <div className="custom-box">
                            <div className="ui two column stackable grid survey">
                                <div className="column ">
                                    <label className="line-height">No results.</label>
                                </div>
                                <div className="column "></div>
                            </div>
                        </div>
              );
          }

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

                {content}

            </div>
      );
  }
}
