import React from 'react';
import TeamActions from 'actions/TeamActions';
import TeamStore from 'stores/TeamStore';
import { MyOwnInput } from 'components/Formsy-components';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class MyTeam extends React.Component {

  constructor (props) {
      super(props);
      mixins(Navigation, this);
      this.state = TeamStore.getState();
      this.state.canSubmit  = false;
      this.state.canSubmitAddMember = true;
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

  _onAddMemberSubmit = (model) => {
      TeamActions.addMemberToTeam(model);
  }

  onRemoveMember = (team_id, member_id) => {
      TeamActions.removeMemberFromTeam({ 'team_id': team_id, 'member_id': member_id });
  }

  render() {

      let renderedResult;

      let message;

      let teamUserList;

      if(this.state.hasTeam){
          teamUserList = this.state.teams.map((data, key) => {

              let members;
              members = data.members.map((mem, key) => {
                  return (
                      <ul>
                          <li>{mem.member_name} <a onClick={this.onRemoveMember.bind(this,data._id,mem._id)} > Remove</a></li>
                       </ul>
                  );
              });
              return (
                  <li className="list-group-item">
                      <div className="row">{data.name}</div>
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
                          {members}
                      </Formsy.Form>
                  </li>
              );
          });
      }

      if (this.state.message !== '' ) {
          message = (
              <div className={ (this.state.hasError) ? 'alert alert-warning' : 'alert alert-info' }>
                  {this.state.message}
               </div>
          );
      }

      renderedResult = (
        <div className="container">
            <ul className="pagination">
              <li><a href="/survey">Survey</a></li>
              <li><a href="/myprofile">My Profile</a></li>
              <li><a href="/mycompany">My Company</a></li>
              <li><a href="/mymanager">My Manager</a></li>
              <li><a href="/myteam">My Teams</a></li>
            </ul>
            <h2>My Team</h2>
            {message}
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
        </div>
      );


      return (
            <div className="login">
              {renderedResult}
             <ul className="list-group">
              {teamUserList}
             </ul>
            </div>
      );

  }
}
MyTeam.contextTypes = { router: React.PropTypes.func };
