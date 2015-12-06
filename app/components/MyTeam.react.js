import React from 'react';
import TeamActions from 'actions/TeamActions';
import TeamStore from 'stores/TeamStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

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
      this.addmember = { messages: [], serverresponse: {} };
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

      this.addmember.messages       =  state.messages;
      this.addmember.serverresponse =  state.serverresponse;
      this.setState(state);
  }

  _onSaveSubmit = () => {
      let teamname = React.findDOMNode(this.refs.teamname).value.trim();
      TeamActions.createTeam({ teamname: teamname });
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

      let message;

      let messages;

      let teamUserList;

      if(this.state.hasTeam){

          teamUserList = this.state.teams.map((data, key) => {

              let members;
              members = data.members.map((mem, key) => {
                  return (
                    <div className="field ui  three column stackable grid sub">
                      <label className="column">{mem.member_email}</label>
                      <label className="column">{mem.member_name}</label>
                      <a onClick={this.onRemoveMember.bind(this,data._id,mem._id,mem.usertype)} className="action column right">
                        <i className="trash outline icon"></i>
                      </a>
                    </div>
                  );
              });
              return [
                   <EditableMyTeam onSave={this._onUpdateTeamName} teamid={data._id} value={data.name} />,
                   <h4>PRFL_TEAM_SUBORDINATES</h4>,
                    <div className=" field">
                        {members}
                        <AddAnotherMember options={{team_id: data._id, onsave: this._onAddMemberSubmit, messages: this.addmember.messages, serverresponse: this.addmember.serverresponse}} />
                    </div>
              ];
          });
      }

      return (
            <div className="ui segment">
              {messages}
              {message}
                <h4 className="ui header ryt">MY TEAM</h4>
                <div className="ui small form team">
                    <h3 className="ui dividing header">PRFL_TEAM_TOP_MSG</h3>
                    <AddTeam />
                    {teamUserList}
                </div>
            </div>
      );
  }
}

class AddAnotherMember extends React.Component {

  constructor(props) {
      super(props);
      this.state =
          {
            showform: 'none'
          };
  }

  componentDidMount() {
      TeamStore.listen(this._onChange);
  }

  _onChange = (state) => {
      this.setState(state);
  }

  componentWillReceiveProps(e) {
      // to set default
      let messages = ( this.props.options.messages ) ? this.props.options.messages : [];
      let serverresponse = ( this.props.options.serverresponse ) ? this.props.options.serverresponse : [];
      this.setState({Edit: false, value: this.props.value, messages: messages, serverresponse: serverresponse });
  }

  onShowFormClick = () => {
      this.setState({ showform: 'block' });
  }

  onSaveClick = (e) => {

      let membername = React.findDOMNode(this.refs.membername).value.trim();
      let team_id = this.props.options.team_id;
      // let feedback = this.props.options.onsave({ team_id: this.props.options.team_id, membername: membername });
      // callback is a unique string to identify the componet to display the message
      if(membername !== ''){
          let model = { callback: team_id, team_id: team_id, membername: membername };
          if(typeof model.membername === 'string'){
              model.membername = [model.membername];
          }
          // console.log(model);
          TeamActions.addMemberToTeam(model);
          React.findDOMNode(this.refs.membername).value = "";
      }else{
          this.setState({ messages: ['Name is required'], serverresponse: { callback : this.props.options.team_id } });
      }
      e.preventDefault();
  }

  render() {

      let multimessages;

      if (this.state.messages  && this.state.messages[0] !== undefined && this.state.serverresponse.callback === this.props.options.team_id) {
          multimessages = this.state.messages.map((mes, key) => {
              return [<li>{mes}</li>];
          });
          multimessages = (
            <div className="ui error message segment">
                <ul className="list">
                    {multimessages}
                </ul>
            </div>
          );
      }

      return (
        <form  onSubmit={this.onSaveClick} >
            <h4  onClick={this.onShowFormClick}  className="ui dividing header"><a><i className="add circle icon large"></i></a>PRFL_TEAM_ADD_ANOTHER</h4>
            <div style={{ display: this.state.showform }}  className="form">
                {multimessages}
                <div className="field ui  two column stackable grid " >
                    <div className="column">
                        <label >PRFL_TEAM_WRK_EML</label>
                    </div>
                    <div className="column">
                        <input placeholder="PRFL_TEAM_WRK_EML" ref="membername" type="text" />
                    </div>
                </div>
                <h3 className="ui dividing header"> </h3>
                <button type="submit" className="ui submit  button submitt">PRFL_TEAM_SUBORDINATES_SAVE</button>
            </div>
        </form>
      );
  }
}

class AddTeam extends React.Component {

  constructor(props) {
      super(props);
      this.state =
          {
            showform: 'none'
          };
  }

  componentDidMount() {
      TeamStore.listen(this._onChange);
  }

  _onChange = (state) => {
      this.setState(state);
  }

  onShowFormClick = () => {
      this.setState({ showform: 'block' });
  }

  _onSaveSubmit = (e) => {
      let teamname = React.findDOMNode(this.refs.teamname).value.trim();
      if(teamname !== ''){
          TeamActions.createTeam({ callback: 'addteam',teamname: teamname });
      }else{
          this.setState({ serverresponse: { callback: 'addteam' }, message: 'Team name is required' });
      }
      e.preventDefault();
  }

  render() {

      let messages;

      if ( this.state.message !== undefined && this.state.message !== '' && this.state.serverresponse.callback === 'addteam' ) {

          messages = (
              <div className="ui error message" style={{ display: 'block' }} >
                {this.state.message}
              </div>
          );
      }

      let CreateTeamUI = [
        <h3 className="ui dividing header" >
            <i className="add user icon"></i>
            <label>PRFL_TEAM_ADD_TEAM</label>
            <a className="action"  onClick={this.onShowFormClick}>
                <i className="write icon"></i>
            </a>
        </h3>,
        <form style={{ display: this.state.showform }} onSubmit={this._onSaveSubmit} className="form">
            {messages}
            <div className="field ui  two column stackable grid " >
                <div className="column">
                    <label>PRFL_TEAM_NAME</label>
                </div>
                <div className="column">
                    <input placeholder="PRFL_TEAM_NAME" ref="teamname" type="text" />
                </div>
            </div>
            <button type="submit" className="ui submit  button submitt">PRFL_TEAM_SAVE</button>
        </form>
      ];

      return (
        <div>
            {CreateTeamUI}
        </div>
      );
  }
}

class EditableMyTeam extends React.Component {

  constructor(props) {
      super(props);
      this.state =
          {
            showform: 'none',
            value:props.value
          };
  }

  componentDidMount() {
      TeamStore.listen(this._onChange);
  }

  _onChange = (state) => {
      this.setState(state);
  }

  componentWillReceiveProps(e) {
      // to set default
      this.setState({ value: this.props.value });
  }

  changeValue = (event) => {
      this.setState({value:event.target.value});
  }

  onShowFormClick = () => {
      this.setState({ showform: 'block' });
  }

  onSaveClick = (e) => {
      console.log('onSaveClick');
      let teamname = this.state.value;
      let teamid   = this.props.teamid;
      if(this.props.value !== this.state.value){
          console.log('aaaaaaa');
          if(teamname.trim() !== ''){
              this.props.onSave({ callback: teamid,teamname: teamname,teamid: teamid});
          }else{
              this.setState({ serverresponse: { callback: this.props.teamid }, message: 'Team name is required' });
          }
      }else{
          console.log('bbbbbb');
          this.setState({ serverresponse: { callback: this.props.teamid }, message: 'No changes' });
      }
      e.preventDefault();
  }

  render() {

      let messages;

      if (this.state.message !== undefined && this.state.message !== '' && this.state.serverresponse.callback === this.props.teamid) {

          messages = (
              <div className="ui error message" style={{ display: 'block' }} >
                {this.state.message}
              </div>
          );
      }

      return (
        <div>
            <h3 className="ui dividing header" >
                <i className="add user icon"></i>
                <label>{this.props.value}</label>
                <a className="action"  onClick={this.onShowFormClick}>
                    <i className="write icon"></i>
                </a>
            </h3>
            <form onSubmit={this.onSaveClick.bind(this)} style={{ display: this.state.showform }}  className="form">
                {messages}
                <div className="field ui  two column stackable grid " >
                    <div className="column">
                        <label>PRFL_TEAM_NAME</label>
                    </div>
                    <div className="column">
                        <input placeholder="PRFL_TEAM_NAME" ref="teamname" type="text"  onChange={this.changeValue} value={this.state.value} />
                    </div>
                </div>
                <button type="submit" className="ui submit  button submitt">PRFL_TEAM_SAVE </button>
            </form>
        </div>
      );
  }
}
MyTeam.contextTypes = { router: React.PropTypes.func };
