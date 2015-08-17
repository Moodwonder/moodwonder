import React from 'react';
// import Immutable from 'immutable';
import getFormData from 'get-form-data';
import LanguageActions from 'actions/LanguageActions';
import LanguageStore from 'stores/LanguageStore';
import Languageoptions from 'components/language/Languageoptions.react';
import Homepage from 'components/language/Homepage.react';
import Signuppage from 'components/language/Signuppage.react';
import Loginpage from 'components/language/Loginpage.react';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class Languages extends React.Component {
  constructor(props) {
      super(props);
      mixins(Navigation, this);
      this.state = LanguageStore.getState();
      this.state = {
         page: 'home',
         language: 'english',
         pagedata: LanguageStore.getState().pagedata
     };
  }

  componentDidMount() {
      LanguageStore.listen(this._onChange);
      LanguageActions.getLanguages();
      //let query = query || {};
      //query.page = this.state.page;
      //query.language = this.state.language;
      //this.setState({page: 'home'});
      //this.setState({language: 'engligh'});
      LanguageActions.getPage({page: this.state.page, language: this.state.language});
  }

  componentWillUnmount() {
      LanguageStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
          languages: LanguageStore.getState().languages,
          pagedata: LanguageStore.getState().pagedata
      });
  }

  onLanguageSubmit = (e) => {
      e.preventDefault();
      let form = document.querySelector('#languageForm');
      let data = getFormData(form, {trim: true});
      //console.log(JSON.stringify(data));
      let language = language || {};
      language.language = data['language'];
      language.code = data['code'];
      // console.log(language);
      let languages = this.state.languages;
      languages.push(data['language']);
      this.setState({languages: languages});
      if (window.confirm('Are sure you want to add new Language.')) {
          //console.log('yes');
          LanguageActions.addLanguage(language);
      }
  }

  onSelectLanguage = (e, child) => {
      //let qid = child.props.qid;
      let language = e.target.value;
      LanguageActions.getPage({page: this.state.page, language: language});
      this.setState({language: language});
  }

  onSelectPage = (e, child) => {
      //let qid = child.props.qid;
      let page = e.target.value;
      LanguageActions.getPage({page: page, language: this.state.language});
      this.setState({page: page});
  }

  render() {
      let languages = this.state.languages;
      let pagedata = this.state.pagedata;
      let page = this.state.page;
      let language = this.state.language;
      let contents = '';
      let pagekeys = pagekeys || {};
      pagekeys.pagekey = pagedata;
      console.log(page);
      console.log(language);
      console.log(pagedata);

      switch(page){
          case 'home':
              contents = (<Homepage pagedata={pagekeys.pagekey}/>);
              break;

          case 'signup':
              contents = (<Signuppage pagedata={pagekeys.pagekey}/>);
              break;

          case 'login':
              contents = (<Loginpage pagedata={pagekeys.pagekey}/>);
              break;

          default: break;
      }

      return (
      <div className="container">
        <h2>Languages</h2>
        <form id="languageForm">
        <div className="form-group">
          <input type="text" name="language" id="language" ref="language" placeholder="language"/>&nbsp;&nbsp;
          <input type="text" name="code" id="code" ref="code" placeholder="code"/>&nbsp;&nbsp;
          <button className="btn btn-primary" onClick={this.onLanguageSubmit}>Add Language</button>
        </div>
        </form>
        <br/><br/>
        <h4>Update page keys</h4>
        <form id="pageForm">
          <div className="form-group">
            <label>Select a page:</label>&nbsp;&nbsp;
            <select className="navigation__item" name="page" onChange={this.onSelectPage}>
              <option value="0">Select one</option>
              <option value="home">Home</option>
              <option value="signup">Signup</option>
              <option value="login">Login</option>
            </select>&nbsp;&nbsp;
            <label>Select language:</label>&nbsp;&nbsp;
            <Languageoptions languages={languages} onChange={this.onSelectLanguage}/>
          </div>
        </form>
        <div className="form-group">
         <span>Page id - {pagekeys.pagekey._id}</span>
         {contents}
        </div>
      </div>
    );
  }
}

Languages.contextTypes = { router: React.PropTypes.func };


