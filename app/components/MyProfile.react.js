import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
// import LanguageContants from 'constants/LanguageConstants';


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

      let _this = this;

      $(function() {

          let options = {
            multiple: false,
            multipart: true,
            maxUploads: 2,
            maxSize: 6000,
            queue: false,
            allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
            accept: 'image/*',
            debug: false,
            hoverClass: 'btn-hover',
            focusClass: 'active',
            disabledClass: 'disabled',
            responseType: 'json',
            onSubmit: function(filename, ext) {
            }
          };

          // updateuserphoto
          let change_banner_image = document.getElementById('change_banner_image');
          let change_profile_image = document.getElementById('change_profile_image');
          options.url  = '/updateuserphoto';
          options.name = 'profilephoto';
          options.button = change_profile_image;
          options.onComplete = function(file, response, btn) {
              _this.fileUploadSuccessProfile(response);
          };
          new ss.SimpleUpload(options);

          // updateuserbanner
          options.url  = '/updateuserbanner';
          options.name = 'bannerimage';
          options.button = change_banner_image;
          options.onComplete = function(file, response, btn) {
              _this.fileUploadSuccessBanner(response);
          };
          new ss.SimpleUpload(options);
      });
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

  fileUploadSuccessProfile = (response) => {
      let userDetails = this.state.userDetails;
      if(response.status){
          userDetails.profile_image = response.image;
          this.setState({ userDetails: userDetails });
      }
  }

  fileUploadSuccessBanner = (response) => {
      let userDetails = this.state.userDetails;
      if(response.status){
          userDetails.cover_image = response.image;
          this.setState({ userDetails: userDetails });
      }
  }

  _onChange = (state) => {
      this.setState(state);
      //console.log(this.state.userDetails);
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


       // Manage user summary
      let summaryForm = [
       <h3 className="ui dividing header">
            <i className="file text outline icon"></i> PRFL_SUMMARY
            <a className="action"><i onClick={this.onEditSummaryClick} className="write icon"></i></a>
       </h3>,

       <p>{userInfo.summary}</p>
      ];

      if(this.state.summaryEdit){
          summaryForm = (
            <div>
                <h3 className="ui dividing header">
                    <i className="file text outline icon"></i> PRFL_SUMMARY
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
                <i className="user icon"></i> PRFL_PERSONAL_INFO
                <a className="action"><i onClick={this.onEditPersonalInfoClick} className="write icon"></i></a>
            </h3>
            <div className=" field">
                <div className="field ui two column stackable grid container">
                    <label className="column">PRFL_PINFO_FNAME</label>
                    <label className="column">{userInfo.fname}</label>
                </div>
                <div className="field ui two column stackable grid container">
                    <label className="column">PRFL_PINFO_LNAME</label>
                    <label className="column">{userInfo.lname}</label>
                </div>
                <div className="field ui two column stackable grid container">
                    <label className="column">PRFL_PINFO_CHANGE_PSWD</label>
                    <label className="column">* * * * * * * *</label>
                </div>
                <div className="field ui two column stackable grid container">
                    <label className="column">PRFL_PINFO_CNFM_PSWD</label>
                    <label className="column">* * * * * * * *</label>
                </div>
            </div>
        </div>
      );

      if(this.state.personalInfoEdit){
          personalInfoForm = (
            <div>
                <h3 className="ui dividing header"><i className="user icon"></i>PRFL_PERSONAL_INFO</h3>
                    <div className=" field">
                        <div className="field">
                            <label>PRFL_PINFO_FNAME*</label>
                            <input placeholder="First Name" onChange={this._onChangePersonalInfo} id="fname" value={userInfo.fname} type="text" />
                        </div>
                        <div className="field">
                            <label>PRFL_PINFO_LNAME*</label>
                            <input placeholder="Last Name" onChange={this._onChangePersonalInfo} id="lname" value={userInfo.lname} type="text" />
                        </div>
                        <div className="field">
                            <label>PRFL_PINFO_CHANGE_PSWD</label>
                            <input placeholder="Password" id="password" type="password" />
                        </div>
                        <div className="field">
                            <label>PRFL_PINFO_CNFM_PSWD</label>
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
                <i className="setting icon"></i> PRFL_GENERAL_INFO
                <a className="action"><i onClick={this.onEditGeneralInfoClick} className="write icon"></i></a>
            </h3>
            <div className=" field">
                <div className="field ui two column stackable grid container">
                    <label className="column">PRFL_GINFO_WRK_EMAIL</label>
                    <label className="column">{userInfo.email}</label>
                </div>
                <div className="field ui two column stackable grid container">
                    <label className="column">PRFL_GINFO_LNG</label>
                    <label className="column">{userInfo.language}</label>
                </div>
                <div className="field ui two column stackable grid container">
                    <label className="column">PRFL_GINFO_RPT_FRQ</label>
                    <label className="column">{userInfo.reportfrequency}</label>
                </div>
            </div>
        </div>
      );

      if(this.state.generalInfoEdit){
          generalInfoForm = (
            <div>
                <h3 className="ui dividing header"><i className="setting icon"></i>PRFL_GENERAL_INFO</h3>
                    <div className="field">
                        <div className="field">
                            <label>PRFL_GINFO_WRK_EMAIL*</label>
                            <input placeholder="Work Email" onChange={this._onChangeGenerallInfo} id="email" value={userInfo.email} type="text" />
                        </div>
                        <div className="field">
                            <label>PRFL_GINFO_LNG*</label>
                            <select className="ui dropdown" onChange={this._onChangeGeneralInfo} id="language" value={userInfo.language} >
                                <option value="">Language</option>
                                <option value="EN">EN</option>
                                <option value="FI">FI</option>
                            </select>
                        </div>
                        <div className="field">
                            <label>PRFL_GINFO_RPT_FRQ</label>
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
              <div className="column profile-cover" style={{ backgroundImage: 'url(' + userInfo.cover_image + ')' }}>
                 <div className="dp-container">
                    <img className="ui tiny circular image dp" id="change_profile_image" src={userInfo.profile_image} alt="" />
                    <a className="action act-cover-image"><i id="change_banner_image" className="write icon"></i></a>
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
                    <h4 className="ui header ryt">PRFL_EDIT_PROFILE</h4>
                    {message}
                    <div className="ui small form">

                        {summaryForm}

                        {personalInfoForm}

                        {generalInfoForm}

                    </div>
                 </div>
              </div>
           </div>
        </div>
      );

  }
}

MyProfile.contextTypes = { router: React.PropTypes.func };
