import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import Submenu from 'components/Submenu.react';
import LanguageContants from 'constants/LanguageConstants';

export default class MyProfile extends React.Component {

  constructor (props) {
      super(props);
      mixins(Navigation, this);
      this.state = UserStore.getState();
      this.state.canSubmit       =  false;
      this.state.summaryEdit     =  false;
      this.state.personalInfo    =  false;
      this.state.generalInfoEdit =  false;
      this.validationErrors      =  {};
  }

  componentDidMount () {
      UserActions.getuserinfo();
      UserStore.listen(this._onChange);
  }

  componentWillUnmount () {
      UserStore.unlisten(this._onChange);
  }

  enableButton = () => {
      this.setState({canSubmit: true});
  }

  disableButton = () => {
      this.setState({canSubmit: false});
  }

  fileUploadSuccessProfile = (param,response) => {
	  let userDetails = this.state.userDetails;
      if(response.status){
		  userDetails.profile_image = response.image;
          this.setState({ userDetails: userDetails });
      }
  }

  fileUploadSuccessBanner = (param,response) => {
	  let userDetails = this.state.userDetails;
      if(response.status){
		  userDetails.cover_image = response.image;
          this.setState({ userDetails: userDetails });
      }
  }

  changeProfilePicClick = () => {
	  $('#dz1 .dz-clickable').trigger('click');
  }

  changeBannerPicClick = () => {
	  $('#dz2 .dz-clickable').trigger('click');
  }

  _onChange = (state) => {
      this.setState(state);
      console.log(this.state.userDetails);
  }

  _onSaveSubmit = (model) => {
      UserActions.saveUserInfo(model);
  }

  _onSaveSummary = (model) => {
	  let summary = document.getElementById('summary').value;
	  if(summary !== ''){
		  this._onSaveSubmit({ summary: summary, type: 'summary'});
	  }
  }

  onEditSummaryClick = () => {
      this.setState({ summaryEdit: true, summary: this.state.userDetails.summary });
  }

  onCancelEditSummaryClick = () => {
      this.setState({ summaryEdit: false });
  }

  _onChangeSummary = (event) => {
      this.setState({summary: event.target.value});
  }


  _onSavePersonalInfo = (model) => {
	  let fname     =  document.getElementById('fname').value;
	  let lname     =  document.getElementById('lname').value;
	  let password  =  document.getElementById('password').value;
	  let cpassword =  document.getElementById('cpassword').value;
	  if(fname !== '' && lname !== '' ){
		  this._onSaveSubmit({ fname: fname, lname: lname, password: password, cpassword: cpassword, type: 'personalinfo'});
	  }
  }

  onEditPersonalInfoClick = () => {
      this.setState({ personalInfoEdit: true, summary: this.state.userDetails.summary });
  }

  onCancelEditPersonalInfoClick = () => {
      this.setState({ personalInfoEdit: false });
  }

  _onChangePersonalInfo = (event) => {

	  let userDetails = this.state.userDetails;

	  if(event.target.id === 'fname'){
		  userDetails.fname = event.target.value;
		  this.setState({ userDetails: userDetails });
	  }

	  if(event.target.id === 'lname'){
		  userDetails.lname = event.target.value;
		  this.setState({ userDetails: userDetails });
	  }

  }


  _onSaveGeneralInfo = (model) => {
	  let email             =  document.getElementById('email').value;
	  let reportfrequency   =  document.getElementById('reportfrequency').value;
	  let language          =  document.getElementById('language').value;

	  if(email !== '' && reportfrequency !== '' && language !== '' ){
		  this._onSaveSubmit({ email: email, report_frequency: reportfrequency, language: language, type: 'generalinfo'});
	  }
  }

  onEditGeneralInfoClick = () => {
      this.setState({ generalInfoEdit: true });
  }

  onCancelEditGeneralInfoClick = () => {
      this.setState({ generalInfoEdit: false });
  }

  _onChangeGeneralInfo = (event) => {

	  let userDetails = this.state.userDetails;

	  if(event.target.id === 'language'){
		  userDetails.language = event.target.value;
		  this.setState({ userDetails: userDetails });
	  }

	  if(event.target.id === 'reportfrequency'){
		  userDetails.reportfrequency = event.target.value;
		  this.setState({ userDetails: userDetails });
	  }

  }


  render() {

      let renderedResult;

      let message;

      let userInfo = this.state.userDetails;

      if (this.state.message !== '' ) {
          message = (
            <div className={ (this.state.hasError) ? 'ui message' : 'ui message' }>
				<div className="header">Message</div>
                <p>{this.state.message}</p>
            </div>
          );
      }

      let componentConfigProfilePic = {
        postUrl: '/updateuserphoto',
        allowedFiletypes: ['.jpg', '.png', '.gif']
      };

      let djsConfigProfilePic = {
      maxFiles: 1,
      paramName: 'profilephoto',
      dictDefaultMessage: "",
      uploadMultiple: false,
      success: this.fileUploadSuccessProfile
      };

      let componentConfigBannerPic = {
        postUrl: '/updateuserbanner',
        allowedFiletypes: ['.jpg', '.png', '.gif']
      };

      let djsConfigBannerPic = {
      maxFiles: 1,
      paramName: 'bannerimage',
      dictDefaultMessage: "",
      uploadMultiple: false,
      success: this.fileUploadSuccessBanner
      };

      let eventHandlers = {
        // This one receives the dropzone object as the first parameter
        // and can be used to additional work with the dropzone.js
        // object
        init: null,
        // All of these receive the event as first parameter:
        drop: callbackArray,
        dragstart: null,
        dragend: null,
        dragenter: null,
        dragover: null,
        dragleave: null,
        // All of these receive the file as first parameter:
        addedfile: simpleCallBack,
        removedfile: null,
        thumbnail: null,
        error: null,
        processing: null,
        uploadprogress: null,
        sending: null,
        success: null,
        complete: null,
        canceled: null,
        maxfilesreached: null,
        maxfilesexceeded: null,
        // All of these receive a list of files as first parameter
        // and are only called if the uploadMultiple option
        // in djsConfig is true:
        processingmultiple: null,
        sendingmultiple: null,
        successmultiple: null,
        completemultiple: null,
        canceledmultiple: null,
        // Special Events
        totaluploadprogress: null,
        reset: null,
        queuecompleted: null
      };

      let callbackArray = [
        function () {
            console.log('Look Ma, I\'m a callback in an array!');
        },
        function () {
            console.log('Wooooow!');
        }
      ];

      let simpleCallBack = function () {
          console.log('I\'m a simple callback');
      };

	   // Manage user summary
      let summaryForm = [
	   <h3 className="ui dividing header">
			<i className="file text outline icon"></i> Summary
			<a className="action"><i onClick={this.onEditSummaryClick} className="write icon"></i></a>
	   </h3>,

	   <p>{userInfo.summary}</p>
      ];

      if(this.state.summaryEdit){
			summaryForm = (
			<div>
				<h3 className="ui dividing header">
					<i className="file text outline icon"></i> Summary
				</h3>
				<div className="field">
					<label>Text</label>
					<textarea id="summary" name="summary" onChange={this._onChangeSummary} value={this.state.summary}></textarea>
				</div>
				<div className="ui submit  button cancel" onClick={this.onCancelEditSummaryClick} >Cancel</div>
				<div className="ui submit button submitt" onClick={this._onSaveSummary.bind(this)} >Submit</div>
			</div>
			);
	  }

	  // Manage user personal info
      let personalInfoForm = (
		<div>
			<h3 className="ui dividing header">
				<i className="user icon"></i> Personal Info
				<a className="action"><i onClick={this.onEditPersonalInfoClick} className="write icon"></i></a>
			</h3>
			<div className=" field">
				<div className="field ui two column stackable grid container">
					<label className="column">First Name</label>
					<label className="column">{userInfo.fname}</label>
				</div>
				<div className="field ui two column stackable grid container">
					<label className="column">Last Name</label>
					<label className="column">{userInfo.lname}</label>
				</div>
				<div className="field ui two column stackable grid container">
					<label className="column">Change Password</label>
					<label className="column">* * * * * * * *</label>
				</div>
				<div className="field ui two column stackable grid container">
					<label className="column">Confirm Password</label>
					<label className="column">* * * * * * * *</label>
				</div>
			</div>
		</div>
      );

      if(this.state.personalInfoEdit){
			personalInfoForm = (
			<div>
				<h3 className="ui dividing header"><i className="user icon"></i>Personal Info</h3>
					<div className=" field">
						<div className="field">
							<label>First Name*</label>
							<input placeholder="First Name" onChange={this._onChangePersonalInfo} id="fname" value={userInfo.fname} type="text" />
						</div>
						<div className="field">
							<label>Last Name*</label>
							<input placeholder="Last Name" onChange={this._onChangePersonalInfo} id="lname" value={userInfo.lname} type="text" />
						</div>
						<div className="field">
							<label>Password</label>
							<input placeholder="Password" id="password" type="password" />
						</div>
						<div className="field">
							<label>Confirm Password</label>
							<input placeholder="Confirm Password" id="cpassword" type="Password" />
						</div>
					</div>
				<div className="ui submit  button cancel" onClick={this.onCancelEditPersonalInfoClick} >Cancel</div>
				<div className="ui submit button submitt" onClick={this._onSavePersonalInfo.bind(this)} >Submit</div>
			</div>
			);
	  }

	  // Manage user general info
      let generalInfoForm = (
		<div>
			<h3 className="ui dividing header">
				<i className="setting icon"></i> General Info
				<a className="action"><i onClick={this.onEditGeneralInfoClick} className="write icon"></i></a>
			</h3>
			<div className=" field">
				<div className="field ui two column stackable grid container">
					<label className="column">Work Email</label>
					<label className="column">{userInfo.email}</label>
				</div>
				<div className="field ui two column stackable grid container">
					<label className="column">Language</label>
					<label className="column">{userInfo.language}</label>
				</div>
				<div className="field ui two column stackable grid container">
					<label className="column">Report Frequency</label>
					<label className="column">{userInfo.reportfrequency}</label>
				</div>
			</div>
		</div>
      );

      if(this.state.generalInfoEdit){
			generalInfoForm = (
			<div>
				<h3 className="ui dividing header"><i className="setting icon"></i>General Info</h3>
					<div className="field">
						<div className="field">
							<label>Work Email*</label>
							<input placeholder="Work Email" onChange={this._onChangeGenerallInfo} id="email" value={userInfo.email} type="text" />
						</div>
						<div className="field">
							<label>Language*</label>
							<select className="ui dropdown" onChange={this._onChangeGeneralInfo} id="language" value={userInfo.language} >
								<option value="">Language</option>
								<option value="EN">EN</option>
								<option value="FI">FI</option>
							</select>
						</div>
						<div className="field">
							<label>Report Frequency</label>
							<select className="ui dropdown"  onChange={this._onChangeGeneralInfo} id="reportfrequency" value={userInfo.reportfrequency} >
								<option value="">Report Frequency</option>
								<option value="Weekly">Weekly</option>
								<option value="Monthly">Monthly</option>
								<option value="Never">Never</option>
						 </select>
						</div>
					</div>
				<div className="ui submit  button cancel" onClick={this.onCancelEditGeneralInfoClick} >Cancel</div>
				<div className="ui submit button submitt" onClick={this._onSaveGeneralInfo.bind(this)} >Submit</div>
			</div>
			);
	  }

      return (
        <div>
           <div className="ui segment padding-none width-header rate header-middle-container">
              <div className="">
                 <h2>RATE YOUR MOOD</h2>
                 <p>How are you feeling at work today?</p>
              </div>
              <div className="ui slider range ">
                 <input type="range" />
              </div>
              <div  className="">
                 <button className="ui yellow button">Submit</button>
              </div>
              <div  className="">
                 <button className="ui yellow button answer positive">Answer all statements</button>
              </div>
           </div>
           <div className="invite-people mobile">
              <h2>Invite people anonymously</h2>
              <p>Invite everyone anonymously in your network, friends, colleagues, your boss, ex-colleagues ...</p>
              <div className="ui input">
                 <input placeholder="Enter e-mail " type="text" />
              </div>
              <button className="ui orange button">Invite</button>
           </div>
           <div className="ui  margin-grid ">
              <div className="column profile-cover" style={{"background-image": userInfo.cover_image }}>
                 <div className="dp-container">
                    <img className="ui tiny circular image dp" onClick={this.changeProfilePicClick} src={userInfo.profile_image} alt="" />
                    <a className="action act-cover-image"><i onClick={this.changeBannerPicClick} className="write icon"></i></a>
                    <div className="title">
                       <h3>{userInfo.fname}</h3>
                       <span>{userInfo.email}</span>
                    </div>
                 </div>
              </div>
           </div>
           <div className="ui secondary  menu account">
                <a className=" act-menu active item" style={{"padding":"0 10px!important"}}>
                    <i className="file image outline icon"></i>My Profile
                </a>
                <a className="act-menu item" style={{"padding":"0 10px!important"}}>
                    <i className="user icon"></i>My Manager
                </a>
                <a className=" act-menu item" style={{"padding":"0 10px!important"}}>
                    <i className="users icon"></i>My Team
                </a>
            </div>
           <div className="ui two column stackable grid">
              <div className="ten wide column">
                 <div className="ui segment">
                    <h4 className="ui header ryt">Edit Profile</h4>
                    {message}
                    <div className="ui small form">

						{summaryForm}

						{personalInfoForm}

						{generalInfoForm}
						<div id="dz1">
							<DropzoneComponent config={componentConfigProfilePic} eventHandlers={eventHandlers} djsConfig={djsConfigProfilePic} />
						</div>
						<div id="dz2">
							<DropzoneComponent config={componentConfigBannerPic} eventHandlers={eventHandlers} djsConfig={djsConfigBannerPic} />
						</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      );

  }
}

MyProfile.contextTypes = { router: React.PropTypes.func };
