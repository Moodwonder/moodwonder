import React from 'react';
import ParticipationGraph from 'components/ParticipationGraph.react';
import SurveyParticipationActions from 'actions/SurveyParticipationActions';
import SurveyParticipationStore from 'stores/SurveyParticipationStore';
import SurveyParticipation from 'utils/SurveyParticipation';
import PublicUserStore from 'stores/PublicUserStore';
import EOTMActions from 'actions/EmployeeOfTheMonthActions';
import EOTMStore from 'stores/EmployeeOfTheMonthStore';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class PublicProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = PublicUserStore.getState();
        this.state.isNotValid = true;
        this.state.multilang = MlangStore.getState().multilang;
        this.state.mySurvey = [];
        this.mytotalvotes = 0;
    }

    componentDidMount() {
        if(this.props !== undefined && this.props.params !== undefined && this.props.params.hash !== undefined ){
            SurveyParticipationActions.getMySurveyParticipation({ _id: this.props.params.hash });
        }
        SurveyParticipationStore.listen(this._onChange);
        PublicUserStore.listen(this._onChange);
        EOTMStore.listen(this._onChangeEOTMStore);
    }

    componentWillUnmount() {
        SurveyParticipationStore.unlisten(this._onChange);
    }

    _onChange = (state) => {
        this.setState({
            mySurvey: SurveyParticipationStore.getState().mySurvey
        });
    }

    _onChangeEOTMStore = (state) => {
        if(!state.modal){
            this._onPopClose();
        }

        let publicuser = this.state.publicuser;
        // Changing vote count and status
        if(!state.hasError){
            publicuser.data.vote.mytotalvotes--;
            publicuser.data.vote.myvote = true;
            this.setState(publicuser);
        }else{
            this.setState({ hasError: state.hasError, message: state.message });
        }

    }

    _onModalClick = () => {
        $( "body" ).addClass( "dimmed dimmable" );
        this.setState({
            modal:true,
            emp_id:this.props.params.hash
        });
    }

    _onPopClose = () => {
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
        }else{
            this.setState({
                isNotValid: true
            });
        }
    }

    _onVoteSubmit = (e) => {
        if(parseInt(this.mytotalvotes) < 5){
            let comment = React.findDOMNode(this.refs.comment).value.trim();
            EOTMActions.saveVote({ emp_id: this.state.emp_id, comment: comment });
        }
    }

    render() {

        let mySurvey = this.state.mySurvey;
        let sPercentage = SurveyParticipation.surveyPercentage(mySurvey);
        let mlarray = this.state.multilang;

        let content;


        let manager = [<a>No manager</a>];
        let teams = [<a>No teams</a>];
        if( this.publicuser && this.publicuser.data && this.publicuser.datacurrent_user_id && this.publicuser.datacurrent_user_id === this.props.params.hash ){
            manager = [<a href="/myprofile">Add manager</a>];
            teams = [<a href="/myprofile">Add team</a>];
        }

        let voteBtn = (<a className="ui button vote "> <i className='checkmark icon'></i> {GetText('PUBLIC_PROFILE_VOTE_BTN', mlarray)} </a>);
        try{
            if (this.state.publicuser.data.disablevote) {
                voteBtn   = (<a className="ui button vote disabled" > <i className='checkmark icon'></i> VOTE HERE</a>);
            }
        }catch(e){}

        if (!isNaN(sPercentage) && (sPercentage > 0)) {
            content = (
                <div className="ui segment">
                    <h4 className="ui header ryt"> {GetText('PUBLIC_PROFILE_SURVEYS_PARTICIPATED', mlarray)} </h4>
                    <ParticipationGraph percentage={sPercentage} />
                </div>
            );
        }

        let publicUser = this.state.publicuser;
        //console.log(JSON.stringify(publicUser));
        if (publicUser.data !== undefined && publicUser.data.manager !== undefined && publicUser.data.manager.status !== undefined && publicUser.data.manager.status ) {
            manager = (
                <div className="my-info">
                    <img className="ui middle aligned tiny image circular" src={publicUser.data.manager.data.propic} />
                    <span className="heading">{publicUser.data.manager.data.name}</span>
                </div>
            );
        }

        if (publicUser.data !== undefined && publicUser.data.teams !== undefined && publicUser.data.teams.status !== undefined && publicUser.data.teams.status ) {

            try{
                if(publicUser.data.teams.data.length > 0){
                    teams = publicUser.data.teams.data.map((data, key) => {
                        return (
                            <div className="my-info teams">
                                <span className="heading">{data.teamname}</span>
                            </div>
                        );
                    });
                }
            }catch(e){
                console.log('Error in my teams list');
                console.log(e);
            }
        }

        try{
            if ( publicUser.data.vote.mytotalvotes < 5 && !publicUser.data.vote.myvote) {
                // If my vote is true publicUser.data.mytotalvotes < 5 &&
                if (publicUser.data.disablevote) {
                    voteBtn   = (<a className="ui button vote disabled" > <i className='thumbs up icon'></i> VOTE HERE</a>);
                }else{
                    voteBtn   = (<a className="ui button vote " onClick={this._onModalClick}> <i className='thumbs up icon'></i> VOTE HERE</a>);
                }
            }
        }catch(e){}

        try{
            // Don't shoe vote button, if same user
            if(this.props.params.hash === publicUser.data.current_user_id){
                voteBtn = null;
            }
        }catch(e){}

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
                                <button type="button" disabled={this.state.isNotValid} onClick={this._onVoteSubmit} className="ui submit button submitt" >Vote</button>
                                <button type="button" onClick={this._onPopClose} className="ui submit button cancel" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        let message = null;
        if(this.state.hasError){
            message = (
                <div className="ui negative message">
                    {this.state.message}
                </div>
            );
        }

        return (
            <div className="ui-main">
                <PublicProfileHeader data={ { publicuser: this.state.publicuser } }/>
                <div className="ui secondary menu account">
                    {voteBtn}
                </div>
                <div className="ui two column stackable grid">
                    <div className="nine wide column">
                        {message}
                        <div className="ui segment">
                            <h4 className="ui header ryt"> {GetText('PUBLIC_PROFILE_VOTES', mlarray)} </h4>
                            <p>{publicUser.data.currentuservotes}</p>
                        </div>
                        {content}
                    </div>
                    <div className="seven wide column">
                        <div className="ui segment">
                            <h4 className="ui header ryt"> {GetText('PUBLIC_PROFILE_MANAGERS', mlarray)} </h4>
                            {manager}

                            <h4 className="ui header ryt"> {GetText('PUBLIC_PROFILE_TEAMS', mlarray)} </h4>
                            {teams}

                        </div>
                    </div>
                </div>
                {modal}
            </div>
        );
    }
}

class PublicProfileHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount () {
        this._onChange(this.props.data);
    }
    componentWillReceiveProps (prop) {
        this._onChange(prop.data);
    }
    _onChange = (state) => {
        this.setState(state);
    }
    render() {
        let UIData = {
            eom: null,
            text: '',
            cover_image: '',
            profile_image: '',
            name: '',
            email: ''
        };

        if(this.state.publicuser !== undefined){
            if(this.state.publicuser.data.profile.summary !== undefined){
                UIData.text = [<p className="text-shadow">{this.state.publicuser.data.profile.summary}</p>];
            }
            if(this.state.publicuser.data.currentusereom !== undefined && this.state.publicuser.data.currentusereom !== ''){
                UIData.eom = (<div className="eom"><p>{this.state.publicuser.data.currentusereom} Time</p></div>);
            }
            UIData.cover_image = this.state.publicuser.data.profile.cover_image;
            UIData.profile_image = this.state.publicuser.data.profile.profile_image;
            UIData.name = this.state.publicuser.data.profile.firstname+' '+this.state.publicuser.data.profile.lastname;
            UIData.email = this.state.publicuser.data.profile.email;
        }

        return (
            <div className="ui margin-grid ">
                <div className="column profile-cover" style={{ backgroundImage: 'url('+UIData.cover_image+')'}}>
                    <div className="dp-container">
                        <img className="ui tiny circular image dp" src={UIData.profile_image} alt=""/>
                        {UIData.eom}
                        <div className="title">
                            <h3>{UIData.name}</h3>
                            <span className="text-shadow">{UIData.email}</span>
                            {UIData.text}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
