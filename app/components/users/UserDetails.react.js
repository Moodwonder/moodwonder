import React from 'react';
import RequireAuth from 'utils/requireAuth';
import AdminUserActions from 'actions/AdminUserActions';
import AdminUserStore from 'stores/AdminUserStore';

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

    render() {

        let message;
        if (this.state.message !== '' ) {
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
        return (
            <div className="container">
            {message}
            <h1>Users</h1>
            {userDetails}
            </div>
        );
    }
});

class ChangeUserStatus extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
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
