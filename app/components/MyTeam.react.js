import React from 'react';
import TeamActions from 'actions/TeamActions';
import TeamStore from 'stores/TeamStore';
import { MyOwnInput } from 'components/Formsy-components';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import Submenu from 'components/Submenu.react';
import Editable from 'components/Editable.react';
import AddAnotherUI from 'components/AddAnotherUI.react';

export default class MyTeam extends React.Component {

  constructor (props) {
      super(props);
      mixins(Navigation, this);
      this.state = TeamStore.getState();
      this.state.canSubmit  = false;
      this.state.canSubmitAddMember = true;
      this.state.CreateTeamForm = false;
      this.state.EditUI = false;
      this.validationErrors = {};
  }

  componentDidMount () {
      TeamActions.getTeams();
      TeamStore.listen(this._onChange);
  }

  componentWillUnmount () {
      TeamStore.unlisten(this._onChange);
  }

  enableButton = () => {
      this.setState({canSubmit: true});
  }

  disableButton = () => {
      this.setState({canSubmit: false});
  }

  _onChange = (state) => {
      this.setState(state);
  }

  _onSaveSubmit = (model) => {
      console.log(model);
      TeamActions.createTeam(model);
  }

  _onUpdateTeamName = (model) => {
      TeamActions.updateTeam(model);
  }

  _onAddMemberSubmit = (model) => {
      if(typeof model.membername === 'string'){
          model.membername = [model.membername];
      }
      TeamActions.addMemberToTeam(model);
  }

  onRemoveMember = (team_id, member_id,account_type) => {
      if (confirm("Are you sure ?") === true) {
          TeamActions.removeMemberFromTeam({ 'team_id': team_id, 'member_id': member_id, 'account_type': account_type });
      }
  }

  showCreateTeamForm = () => {
      this.setState({CreateTeamForm: true});
  }

  render() {

      let CreateTeamUI;

      let message;

      let messages;

      let teamUserList;

      let addTeamsWidget;

      if(this.state.hasTeam){

          addTeamsWidget = (<AddAnotherUI data={ this.state.teams } id={1} onSave={this._onAddMemberSubmit} />);

          teamUserList = this.state.teams.map((data, key) => {

              let members;
              members = data.members.map((mem, key) => {
                  return (
                    <div className="row">
                      <div className="col-sm-4">{mem.member_email}</div>
                      <div className="col-sm-4">{mem.member_name}</div>
                      <div className="col-sm-4"><a onClick={this.onRemoveMember.bind(this,data._id,mem._id,mem.usertype)} > Remove</a></div>
                    </div>
                  );
              });
              return [
                  <li className="list-group-item">
                   <Editable onSave={this._onUpdateTeamName} teamid={data._id} value={data.name} />
                  </li>,
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-sm-4"><h4>SUBORDINATES</h4></div>
                    </div>
                    {members}
                    <br></br>
                    <div className="row">
                      <div className="col-sm-4">
                        <Formsy.Form onValidSubmit={this._onAddMemberSubmit} >

                          <MyOwnInput
                          name="membername"
                          className="form-control"
                          placeholder="Work email"
                          required/>

                          <MyOwnInput
                          type="hidden"
                          name="team_id"
                          value={data._id}
                          required/>

                          <button type="submit" className="btn btn-default"
                          disabled={!this.state.canSubmitAddMember}>Submit</button>
                        </Formsy.Form>
                      </div>
                      <div className="col-sm-8"></div>
                    </div>
                  </li>
              ];
          });
      }

      if (this.state.messages  && this.state.messages[0] !== undefined ) {

          console.log(this.state.messages[0]);
          let wrapper = this.state.messages.map((value, key) => {
              return [<div>{value}</div>];
          });
          messages = (
              <div className='alert alert-info'>
                  {wrapper}
              </div>
          );

      }

      if (this.state.CreateTeamForm) {
          CreateTeamUI = (
              <div className="col-sm-8">
              <ul className="list-group">
              <li className="list-group-item">
              <Formsy.Form onValidSubmit={this._onSaveSubmit}
                onValid={this.enableButton}
                onInvalid={this.disableButton} >

                 <MyOwnInput
                 name="teamname"
                 className="form-control"
                 placeholder="My team name"
                 validationError="Team name is required"
                 required/>

                 <button type="submit" className="btn btn-default"
                 disabled={!this.state.canSubmit}>Submit</button>
              </Formsy.Form>
              </li>
              </ul>
              </div>
          );
      }

      return (
        <div className="container">
          <Submenu />
          <h2>MY TEAM</h2>
          <div className="well">
            <div className="row">
              <div className="col-sm-6">To fully utilize moodwonder, We recommed that you setup your suboridinates</div>
              <div className="col-sm-4"><button type="button" onClick={this.showCreateTeamForm} className="btn btn-primary">Create Team</button></div>
            </div>

            <div className="login">
              {messages}
              {message}
              <br></br>
            <div className="row">
              {CreateTeamUI}
            </div>
            <br></br>
            <div className="row">
              <div className="col-sm-8">
                <ul className="list-group">
                  {teamUserList}
                </ul>
              </div>
              <div className="col-sm-4">
                 {addTeamsWidget}
              </div>
            </div>
            </div>
        </div>
        </div>
      );

  }
}
MyTeam.contextTypes = { router: React.PropTypes.func };
