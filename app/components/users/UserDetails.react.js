import React from 'react';
import RequireAuth from 'utils/requireAuth';
import AdminUserActions from 'actions/AdminUserActions';
import AdminUserStore from 'stores/AdminUserStore';
import DatePicker from 'react-date-picker';

export default RequireAuth(class UserDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = AdminUserStore.getState();
    }

    componentDidMount(){
        let _id =  false;
        try{
            _id = this.props.params.uid;
        }catch(err){
            console.log(err);
        }
        if(_id){
            AdminUserActions.getUsersDetails({ _id: _id });
        }
        AdminUserStore.listen(this._onChange);
    }

    _onChange = (state) => {
        this.setState(state);
    }

    userStatusChange = (userstatus) => {
        let _id =  false;
        try{
            _id = this.props.params.uid;
        }catch(err){
            console.log(err);
        }
        if(_id){
            AdminUserActions.updateUserDetails({ _id: _id, userstatus: userstatus });
        }
    }

    onTabClick = (Tab) => {
        this.setState({ Tab: Tab });
    }

    render() {

        let message;
        if (this.state.hasError && this.state.message !== '' ) {
            message = (
                <div className={ (this.state.hasError) ? 'alert alert-warning' : 'alert alert-info' }>
                {this.state.message}
                </div>
            );
        }
        let userDetails;
        if(this.state.userDetails){

            let data = { status: false, onChangeFn: this.userStatusChange };
            if(this.state.userDetails.userstatus === 'Active'){
                data.status = true;
            }
            userDetails = (
            <ul className="list-group">
              <li className="list-group-item"><img src={this.state.userDetails.profile_image} /></li>
              <li className="list-group-item">First name : {this.state.userDetails.fname}</li>
              <li className="list-group-item">Last name : {this.state.userDetails.lname}</li>
              <li className="list-group-item">Work email : {this.state.userDetails.email}</li>
              <li className="list-group-item">Language : {this.state.userDetails.language}</li>
              <li className="list-group-item">Manager : {this.state.userDetails.mymanager}</li>
              <li className="list-group-item">Report frequency : {this.state.userDetails.reportfrequency}</li>
              <li className="list-group-item">User status : <ChangeUserStatus data={data} /> </li>
            </ul>
            );
        }

        let Tab = [];
        Tab[0] = userDetails;
        Tab[1] = [ <li>No data</li> ];
        let activeTab = [];
        activeTab[0] = 'tab-pane fade';
        activeTab[1] = 'tab-pane fade';

        try{
            Tab[1] = [ <OpenEndedQuestionsAnswers uid={this.props.params.uid} /> ];
        }catch(err){
            console.log(err);
        }

        if( this.state.Tab !== undefined ){
            activeTab[this.state.Tab] += ' in active';
        }else{
            activeTab[0] += ' in active';
        }

        return (
            <div className="container">
            {message}
            <h1>Users</h1>
              <ul className="nav nav-tabs">
                <li><a onClick={this.onTabClick.bind(this,0)} >User Details</a></li>
                <li><a onClick={this.onTabClick.bind(this,1)} >responses for open ended questions</a></li>
              </ul>
                <div className="tab-content">
                  <div id="home" className={activeTab[0]}>
                    {Tab[0]}
                  </div>
                  <div id="menu1" className={activeTab[1]}>
                    {Tab[1]}
                  </div>
                </div>
            </div>
        );
    }
});

class ChangeUserStatus extends React.Component {

    constructor(props) {
        super(props);
        try{
            let checked = false;
            let statusText = 'Inactive';
            if(this.props.data.status){
                checked = true;
                statusText = 'Active';
            }
            this.state = {
                checked: checked,
                statusText: statusText
            };
        }catch(err){
            console.log(err);
        }
    }

    onChange = (e) => {
        if(this.state.checked){
            this.setState({
                checked: false,
                statusText: 'Inactive'
            });
        }else{
            this.setState({
                checked: true,
                statusText: 'Active'
            });
        }
        this.props.data.onChangeFn((!this.state.checked));
    }

    render() {
        return (
        <div>
        <input type="checkbox" name="userStatus" checked={this.state.checked} onChange={this.onChange} value={this.state.checked} />
        {this.state.statusText}
        </div>
        );
    }
}


class OpenEndedQuestionsAnswers extends React.Component {

    constructor(props) {
        super(props);
        this.list = [ <li>No data</li> ];
        try{
            this.state = {
                hasData:false
            };
        }catch(err){
            console.log(err);
        }
    }

    onData = (data) => {
        let res;
        if(data !== undefined){
            res = data.map((data, key) => {
                return [ <li key={key} className="list-group-item">{data.q} : {data.a}</li> ];
            });
        }else{
            res = [ <li className="list-group-item"> No record found </li> ];
        }
        this.list = res;
    }

    getAnswers = (date) => {
        let _id =  false;
        try{
            _id = this.props.uid;
        }catch(err){
            console.log(err);
        }
        let param = { _id: _id };
        if(date !== undefined){
            param = { _id: _id, date: date };
        }
        AdminUserActions.OpenEndedQuestionsAnswers(param);
    }

    componentDidMount(){
        this.getAnswers();
        AdminUserStore.listen(this._onChange);
    }

    _onChange = (state) => {
        if(state.openEnded){
            this.onData(state.openEnded);
            this.setState({hasData: true});
        }
    }

    render() {

        return (
            <div>
                <DatePicker onChange={this.getAnswers}/>
                <ul className="list-group">
                  {this.list}
                </ul>
            </div>
        );
    }
}
