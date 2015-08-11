import React from 'react';
import Immutable from 'immutable';
import TeamActions from 'actions/TeamActions';
import TeamStore from 'stores/TeamStore';
import { MyOwnInput, MyOwnSelect } from 'components/Formsy-components';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class MyTeam extends React.Component {

  constructor (props) {
    super(props);
    mixins(Navigation, this);
    this.state = TeamStore.getState();
    this.state.canSubmit = false;
    this.validationErrors = {};
  }

  componentDidMount () {
    // TeamActions.getuserinfo();
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

  render() {

    let renderedResult;

    let message;
    
    let teamUserList;

    if(this.state.hasTeam){
        teamUserList = this.state.teams.map((data, key) => {
        return (
          <li className="list-group-item"><div className="row">{data.teamname}</div></li>
        );
      });
    }

    if (this.state.message != '' ) {
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
