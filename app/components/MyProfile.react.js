import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import { MyOwnInput, MyOwnSelect } from 'components/Formsy-components';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import Submenu from 'components/Submenu.react';
import LanguageContants from 'constants/LanguageConstants';

export default class MyProfile extends React.Component {

  constructor (props) {
      super(props);
      mixins(Navigation, this);
      this.state = UserStore.getState();
      this.state.canSubmit = false;
      this.validationErrors = {};
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

  fileUploadSuccess = (param,response) => {
      if(response.status){
          this.setState({ profile_image: response.image });
      }
  }

  _onChange = (state) => {
      this.setState(state);
      console.log(this.state.userDetails);
  }

  _onSaveSubmit = (model) => {
      UserActions.saveUserInfo(model);
  }

  render() {

      let renderedResult;

      let message;

      let userInfo = this.state.userDetails;

      if (this.state.message !== '' ) {
          message = (
            <div className={ (this.state.hasError) ? 'alert alert-warning' : 'alert alert-info' }>
              {this.state.message}
            </div>
          );
      }

      let componentConfig = {
        postUrl: '/updateuserphoto',
        allowedFiletypes: ['.jpg', '.png', '.gif']
      };

      let djsConfig = {
      maxFiles: 1,
      paramName: 'profilephoto',
      dictDefaultMessage: "Drop files here to upload",
      thumbnailWidth: 200,
      thumbnailHeight: 200,
      uploadMultiple: false,
      success: this.fileUploadSuccess,
          previewTemplate: React.renderToStaticMarkup(
            <div className="dz-preview dz-file-preview">
              <div className="dz-details">
                <img data-dz-thumbnail />
              </div>
            </div>
          )
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


      renderedResult = (
      <div className="container">
        <Submenu />
      <h2>My Profile</h2>
      {message}
      <div className="">
        <div className="col-sm-4" >
          { this.state.profile_image ? <div className="propic-wrapper"><img src={this.state.profile_image} /></div> : null}
          <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig} />
        </div>
        <div className="col-sm-4" >
        <Formsy.Form onValidSubmit={this._onSaveSubmit}
        onValid={this.enableButton}
        onInvalid={this.disableButton} >
          <MyOwnInput
          name="firstname"
          className="form-control"
          value={userInfo.fname}
          placeholder="First name"
          validationError="First name is required"
          required/>

          <MyOwnInput
          name="lastname"
          className="form-control"
          value={userInfo.lname}
          placeholder="Last name"
          validationError="Last name is required"
          required/>

          <MyOwnInput
          name="email"
          autocomplete="off"
          className="form-control"
          value={userInfo.email}
          placeholder="Work Email"
          validations="isEmail"
          validationError="This is not a valid email"
          required/>

          <MyOwnSelect
          name="language"
          className="form-control"
          value={userInfo.language}
          placeholder="Language"
          options={[LanguageContants.EN, LanguageContants.FI]}
          />

          <MyOwnSelect
          name="report_frequency"
          className="form-control"
          value={userInfo.reportfrequency}
          placeholder="reportfrequency"
          options={['Weekly', 'Monthly', 'Never']}
          />

          <MyOwnInput
          type="password"
          name="password"
          autocomplete="off"
          className="form-control"
          value={userInfo.password}
          placeholder="Password"
          validationError="This is not a valid email" />

          <button type="submit" className="btn btn-default"
          disabled={!this.state.canSubmit}>Submit</button>
        </Formsy.Form>
        </div>
      </div>
      </div>
      );

      return (
          <div className="login">
            {renderedResult}
          </div>
      );

  }
}

MyProfile.contextTypes = { router: React.PropTypes.func };
