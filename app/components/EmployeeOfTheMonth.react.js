import React from 'react';
import EOTMActions from 'actions/EmployeeOfTheMonthActions';
import EOTMStore from 'stores/EmployeeOfTheMonthStore';
import UserStore from 'stores/UserStore';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class EmployeeOfTheMonth extends React.Component {

    constructor(props) {
        super(props);
        this.state = EOTMStore.getState();
        this.state.multilang = MlangStore.getState().multilang;
        this.filtered = [];
        this.ShowMoreStatus = true;
        this.mytotalvotes = 0;
        this.hasData = false;
        this.last_id = '';
        this.search = false;
    }

    componentDidMount() {
        // console.log('componentDidMount');
        EOTMActions.getallemployees();
        EOTMStore.listen(this._onChange);
    }

    componentWillUnmount() {
        // console.log('componentWillUnmount');
        EOTMStore.unlisten(this._onChange);
    }

    _onChange = (state) => {

        // console.log(state);
        // console.log(this.ShowMoreStatus);
        if(this.ShowMoreStatus){
            this.ShowMoreStatus = false;
            state.employees.data.employees.map((data, key) => {
                this.filtered.push(data);
            });
           // console.log(state);
            // console.log(this.filtered);
            this.mytotalvotes = state.employees.data.mytotalvotes;
            this.hasData = state.hasEmployees;
            let last_employee = this.filtered[this.filtered.length-1];
            if( last_employee !== undefined && last_employee._id !== undefined && last_employee._id !== ''){
                this.last_id = last_employee._id;
            }
        }

        if(this.state.voteStatus && (!this.state.hasError)){
            this.filtered[this.state.votekey].myvote = true;
            this.filtered[this.state.votekey].votes++;
            this.mytotalvotes++;
            state.voteStatus = false;
        }
        this.setState(state);
    }

    _onPopClick = (emp_id,key) => {
        // key : vote widget unique key
        $( "body" ).addClass( "dimmed dimmable" );
        // console.log(key);

        this.setState({
            modal:true,
            emp_id:emp_id,
            votekey: key
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

        // console.log('_onSearch');
        let keyword = React.findDOMNode(this.refs.search).value.trim();
        if( keyword !== '' ){
            this.search = true;
            this.last_id = '';
            this.filtered = [];
            EOTMActions.getallemployees({ keyword: keyword });
            this.ShowMoreStatus = true;
        }
    }

    showMoreUsers = () => {

        // console.log('showMoreUsers');
        let keyword = React.findDOMNode(this.refs.search).value.trim();
        let obj = {};
        if( keyword !== '' ){
            obj.keyword = keyword;
        }
        if( this.last_id !== '' ){
            obj.last_id = this.last_id;
        }
        EOTMActions.getallemployees(obj);
        this.ShowMoreStatus = true;
    }

    // Function to sort the user list by the entered word in the search user text box
    // It is disabled now
    _onChangeSearch = (e) => {
        // console.log('_onChangeSearch');
        let text = e.target.value.trim();

        // fetch fresh data after clearing the search text box
        if( text === '' && this.search ){
            this.search = false;
            this.ShowMoreStatus = true;
            this.filtered = [];
            EOTMActions.getallemployees();
        }

        /*
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
        */
    }

    _onVoteSubmit = (e) => {
        if(parseInt(this.mytotalvotes) < 5){
            let comment = React.findDOMNode(this.refs.comment).value.trim();
            EOTMActions.saveVote({ emp_id: this.state.emp_id, comment: comment });
        }
    }

    render() {
        // console.log('render..');
        // console.log(this.state);

        let mlarray = this.state.multilang;

        let employees = '';
        if(this.state.hasEmployees){
            employees = this.filtered.map((data, key) => {
                return [<VoteWidget _id={data._id} uid={this.state.employees.data.current_user_id} photo={data.photo} name={data.name} votes={data.votes} active={data.myvote} click={this._onPopClick} index={key} />];
            });
        }

        let message;
        if (this.state.message !== '' ) {
            message = (
                <div className="ui success message segment">
                    <ul className="list">
                        <li>{this.state.message}</li>
                    </ul>
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
                <ProfileHeader data={{votes: this.mytotalvotes }}/>
                <div className="ui secondary menu account">
                    <div className="ui container">
                        <div className="ui right labeled left icon input">
                            <i className="search icon"></i>
                            <input type="text" ref="search" onChange={this._onChangeSearch} placeholder={GetText('EOM_SEARCH_PLACEHOLDER_1', mlarray)} />
                            <a className="ui tag label" onClick={this._onSearch} > {GetText('EOM_SEARCH_BTN_1', mlarray)} </a>
                        </div>
                    </div>
                </div>
                <h4 className="ui header ryt">{GetText('EOM_TITLE_1', mlarray)}</h4>
                {message}
                <div className="ui link five cards stackable grid cast">
                    {employees}
                </div>
                <div className="ui horizontal divider"> <a onClick={this.showMoreUsers}>{GetText('EOM_SHOW_MORE', mlarray)}</a> </div>
                {modal}
            </div>
        );
    }
}

class VoteWidget extends React.Component {

    constructor(props) {
        super(props);
        //this.state = {};
        //this.state.multilang = MlangStore.getState().multilang;
    }

    _onModalClick = () => {
        if(this.props.votes !== undefined){
            this.props.click(this.props._id,this.props.index);
        }
    }

    render() {

        //let mlarray = this.state.multilang;

        let voteBtn = (
            <div onClick={this._onModalClick} className='extra content' >
                <i className="thumbs outline up icon"></i>
                VOTE
            </div>
        );

        if(this.props._id === this.props.uid){
            voteBtn = (
                <div className='extra content disabled' >
                    <i className="thumbs outline up icon"></i>
                    VOTE
                </div>
            );
        }

        if(this.props.active){
            voteBtn = (
                <div className='extra content voted' >
                    <i className="thumbs outline up icon"></i>
                    VOTE
                </div>
            );
        }

        return (
            <div className="card">
                <div className="image">
                    <img src={this.props.photo} alt="Profile Photo"/>
                </div>
                <div className="content">
                    <div className="header"><a href={ `/publicprofile/${this.props._id}` } >{this.props.name}</a></div>
                    <div className="total-votes">
                        <p>{this.props.votes} votes</p>
                    </div>
                </div>
                {voteBtn}
            </div>
        );
    }
}

class ProfileHeader extends React.Component {

    constructor(props) {

        super(props);
        this.state = UserStore.getState();
        // this.state.multilang = MlangStore.getState().multilang;
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
        // let mlarray = this.state.multilang;
        if(this.state.votes !== undefined) {
            text = [<p className="votes"> You have { ( 5 - this.state.votes ) } more votes remaining</p>];
        }
        //console.log(this.state);

        return (
        <div className="ui margin-grid ">
            <div className="column profile-cover" style={{ backgroundImage: 'url('+this.state.userData.cover_image+')'}}>
                <div className="dp-container">
                    <img className="ui tiny circular image dp" src={this.state.userData.profile_image} alt=""/>
                    <a href="#" className="action act-cover-image"></a>
                    <div className="title">
                        <h3>{this.state.userData.fname} {this.state.userData.lname}</h3>
                        <span className="text-shadow">{this.state.userData.email} </span>
                        {text}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
