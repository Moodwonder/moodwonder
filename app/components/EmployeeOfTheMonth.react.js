import React from 'react';
import EOTMActions from 'actions/EmployeeOfTheMonthActions';
import EOTMStore from 'stores/EmployeeOfTheMonthStore';
import UserStore from 'stores/UserStore';

export default class EmployeeOfTheMonth extends React.Component {

    constructor(props) {
        super(props);
        this.state = EOTMStore.getState();
        this.filtered = [];
        this.mytotalvotes = 0;
        this.hasData = false;
        this.last_id = '';
    }

    componentDidMount() {
        console.log('componentDidMount');
        EOTMActions.getallemployees();
        EOTMStore.listen(this._onChange);
    }

    componentWillUnmount() {
        EOTMStore.unlisten(this._onChange);
    }

    _onChange = (state) => {

        state.employees.data.employees.map((data, key) => {
            this.filtered.push(data);
        });
        console.log(this.filtered);
        this.setState(state);
        this.mytotalvotes = this.state.employees.data.mytotalvotes;
        this.hasData = this.state.hasEmployees;
        let last_employee = this.filtered[this.filtered.length-1];
        if( last_employee !== undefined && last_employee._id !== undefined && last_employee._id !== ''){
            this.last_id = last_employee._id;
        }
    }

    _onPopClick = (emp_id) => {
        $( "body" ).addClass( "dimmed dimmable" );
        this.setState({
            modal:true,
            emp_id:emp_id
        });
    }

    _onPopClose = (emp_id) => {
        $( "body" ).removeClass( "dimmed dimmable" );
        this.setState({
            modal:false
        });
    }

    _onChangeComment = (e) => {
        if(e.target.value.trim() !== ''){
            this.setState({
                isNotValid: false
            });
        }
    }

    _onSearch = () => {
        let keyword = React.findDOMNode(this.refs.search).value.trim();
        if( keyword !== '' ){
            this.last_id = '';
            EOTMActions.getallemployees({ keyword: keyword });
        }
    }

    showMoreUsers = () => {

        let keyword = React.findDOMNode(this.refs.search).value.trim();
        let obj = {};
        if( keyword !== '' ){
            obj.keyword = keyword;
        }
        if( this.last_id !== '' ){
            obj.last_id = this.last_id;
        }
        EOTMActions.getallemployees(obj);
    }
    // Function to sort the user list by the entered word in the search user text box
    // It is disabled now
    _onChangeSearch = (e) => {
        console.log('_onChangeSearch');
        let text = e.target.value.trim();
        if(text !== ''){
            if(this.hasData){
                this.filtered = [];
                let i =0;
                this.state.employees.data.employees.map((data, key) => {
                    if((data.name.toLowerCase()).indexOf(text.toLowerCase()) === 0){
                        this.filtered[i] = data;
                        i++;
                    }
                });
                this.hasData = true;
                this.setState(this.state);
            }
        }else{
            this.filtered = this.state.employees.data.employees;
            this.setState(this.state);
        }
    }

    _onVoteSubmit = (e) => {
        if(parseInt(this.mytotalvotes) < 5){
            let comment = React.findDOMNode(this.refs.comment).value.trim();
            EOTMActions.saveVote({ emp_id: this.state.emp_id, comment: comment });
        }
    }

    render() {
        console.log('render....');
        let employees = '';
        if(this.state.hasEmployees){
            employees = this.filtered.map((data, key) => {
                return [<VoteWidget _id={data._id} photo={data.photo} name={data.name} votes={data.votes} active={data.myvote} click={this._onPopClick} />];
            });
        }

        let message;
        if (this.state.message !== '' ) {
            message = (
                <div className={ (this.state.hasError) ? 'alert alert-warning' : 'alert alert-info' }>
                {this.state.message}
                </div>
            );
        }

        let modal;
        if(this.state.modal){
            modal = (
            <div className="ui dimmer modals page transition visible active">
                <div className="ui active modal">
                    <i className="close icon" onClick={this._onPopClose} data-dismiss="modal"></i>
                    <div className="header">Vote</div>
                    <div className="ui segment">
                        <div className="ui small form">
                            <div className="field">
                                <label> Comment</label>
                                <textarea className="form-control" rows="5" ref="comment" onChange={this._onChangeComment} ></textarea>
                            </div>
                            <button type="button" disabled={this.state.isNotValid} onClick={this._onVoteSubmit}    className="ui submit    button cancel" >Vote</button>
                            <button type="button" onClick={this._onPopClose} className="ui submit button submitt" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            );
        }

        return (
            <div className="ui main">
                <ProfileHeader data={{votes: 5, desc: 'lorem ipsum'}}/>
                <div className="ui secondary    menu account">
                    <div className="ui container">
                        <div className="ui right labeled left icon input">
                            <i className="search icon"></i>
                            <input type="text" ref="search" placeholder="Search a name" />
                            <a className="ui tag label" onClick={this._onSearch} > Search </a>
                        </div>
                    </div>
                </div>
                <h4 className="ui header ryt">CAST YOUR VOTES FOR EMPLOYEE OF THE MONTH</h4>
                {message}
                <div className="ui link five cards stackable grid cast">
                    {employees}
                </div>
                <div className="ui horizontal divider"> <a onClick={this.showMoreUsers}>Show More</a> </div>
                {modal}
            </div>
        );
    }

    }

class VoteWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    _onModalClick = (state) => {
        if(this.props.votes !== undefined){
            this.props.click(this.props._id);
        }
    }

    render() {

        let classname = "extra content";
        if(this.props.active){
            classname = "extra content";
        }

        return (
            <div className="card">
                <div className="image">
                    <img src={this.props.photo} alt="Profile Photo"/>
                </div>
                <div className="content">
                    <div className="header">{this.props.name}</div>
                    <div className="total-votes">
                        <p>{this.props.votes} votes</p>
                    </div>
                </div>
                <div onClick={this._onModalClick} className={classname} >
                    <i className="thumbs outline up icon"></i>
                    VOTE
                </div>
            </div>
        );
    }

}

class ProfileHeader extends React.Component {

    constructor(props) {

        super(props);
        this.state = UserStore.getState();
    }
    componentDidMount () {
        UserStore.listen(this._onChange);
    }
    componentWillReceiveProps (prop) {
        this._onChange(prop.data);
    }
    _onChange = (state) => {
        this.setState(state);
    }
    render() {

        let text = null;
        if(this.state.votes !== undefined) {
            text = [<p className="votes"> You have {this.state.votes} more votes remaining</p>];
        }else if(this.state.desc !== undefined){
            text = [<p>{this.state.desc}</p>];
        }
        //console.log(this.state);

        return (
        <div className="ui    margin-grid ">
            <div className="column profile-cover" style={{ backgroundImage: 'url('+this.state.userData.cover_image+')'}}>
                <div className="dp-container">
                    <img className="ui tiny circular image dp" src={this.state.userData.profile_image} alt=""/>
                    <a href="#" className="action act-cover-image"></a>
                    <div className="title">
                        <h3>{this.state.userData.fname} {this.state.userData.lname}</h3>
                        <span>{this.state.userData.email}</span>
                        {text}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
