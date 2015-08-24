import React from 'react';
// import Immutable from 'immutable';
import getFormData from 'get-form-data';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';
import Languageoptions from 'components/pages/Languageoptions.react';
import Homepage from 'components/pages/Homepage.react';
import Signuppage from 'components/pages/Signuppage.react';
import Loginpage from 'components/pages/Loginpage.react';
import RequireAuth from 'utils/requireAuth';


export default RequireAuth(class Pages extends React.Component {
  constructor(props) {
      super(props);
      this.state = PageStore.getState();
      this.state = {
         page: 'home',
         language: 'english',
         formstatus: false,
         pagedata: []
     };
  }

  componentDidMount() {
      PageStore.listen(this._onChange);
      PageActions.getLanguages();
      PageActions.getPage({page: this.state.page, language: this.state.language});
      this.setState({formstatus: false});
  }

  componentWillUnmount() {
      PageStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
          languages: PageStore.getState().languages,
          pagedata: PageStore.getState().pagedata
      });
  }



  onSelectLanguage = (e, child) => {
      //let qid = child.props.qid;
      let language = e.target.value;
      PageActions.getPage({page: this.state.page, language: language});
      this.setState({language: language});
      this.setState({formstatus: false});
  }

  onSelectPage = (e, child) => {
      //let qid = child.props.qid;
      let page = e.target.value;
      PageActions.getPage({page: page, language: this.state.language});
      this.setState({page: page});
  }

  /**
   * Signup page submit
   */
  onSubmitSignup = (e) => {
      let formData = document.querySelector('#signupForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let signup = signup || {};

      signup.language = data['language'];
      signup.SIGNUP_TITLE = data['SIGNUP_TITLE'];
      signup.SUB_TITLE = data['SUB_TITLE'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'signup', signup);
          this.setState({formstatus: true});
      }
  }

  /**
   * Home page submit
   */
  onSubmitHome = (e) => {
      let formData = document.querySelector('#homeForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let home = home || {};

      home.language = data['language'];
      home.HOME_TITLE = data['HOME_TITLE'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'home', home);
          this.setState({formstatus: true});
      }
  }

  /**
   * Login page submit
   */
  onSubmitLogin = (e) => {
      let formData = document.querySelector('#signupForm');
      let data = getFormData(formData, {trim: true});
      let pageid = data['_id'];
      let login = login || {};

      login.language = data['language'];
      login.LOIGN_TITLE = data['LOIGN_TITLE'];
      login.USERNAME = data['USERNAME'];
      login.PASSWORD = data['PASSWORD'];
      login.FORGOT_PASSWORD = data['FORGOT_PASSWORD'];

      if (window.confirm('Are you sure you want to submit the changes ?')) {
          PageActions.updatePageKeys(pageid, 'login', login);
          this.setState({formstatus: true});
      }
  }


  render() {
      let languages = this.state.languages;
      let page = this.state.page;
      let formstatus = this.state.formstatus;
      let contents = '';
      //let pagedata = this.state.pagedata;
      //let pagekeys = pagekeys || {};
      //pagekeys.pagekey = pagedata;
      let statusmessage = '';

      if(formstatus) {
          statusmessage = (<div className="alert alert-success">
                            <strong>Success!</strong> Form submitted.
                           </div>
                          );
      }

      switch(page){
          case 'home':
              contents = (<Homepage language={this.state.language} onClick={this.onSubmitHome}/>);
              break;

          case 'signup':
              contents = (<Signuppage language={this.state.language} onClick={this.onSubmitSignup}/>);
              break;

          case 'login':
              contents = (<Loginpage language={this.state.language} onClick={this.onSubmitLogin}/>);
              break;

          default: break;
      }


      return (
      <div className="container">
        <h2>Language - Pages</h2>
        <br/><br/>
        <form id="pageForm" className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputPage" className="col-sm-2 control-label">Select Page : </label>
            <div className="col-sm-10">
                <select className="form-control" id="inputPage" name="page" onChange={this.onSelectPage}>
                    <option value="home">Home</option>
                    <option value="signup">Signup</option>
                    <option value="login">Login</option>
                </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPage" className="col-sm-2 control-label">Select language : </label>
            <div className="col-sm-10">
                <Languageoptions languages={languages} onChange={this.onSelectLanguage}/>
            </div>
          </div>
        </form>
        <div className="form-group">
         {statusmessage}
        </div>
        <div className="form-group">
         <br/><br/>
         {contents}
        </div>
      </div>
    );
  }
});



