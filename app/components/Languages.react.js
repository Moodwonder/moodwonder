import React from 'react';
import Immutable from 'immutable';
import getFormData from 'get-form-data';
import LanguageActions from 'actions/LanguageActions';
import LanguageStore from 'stores/LanguageStore';
import Languageoptions from 'components/Languageoptions.react';

export default class Languages extends React.Component {
  constructor(props) {
    super(props);
    this.state = LanguageStore.getState();
     this.state = {
         page: 'home',
         language: 'english'
     }
  }
  
  componentDidMount() {
      LanguageStore.listen(this._onChange);
      LanguageActions.getLanguages();
      let query = query || {};
      query.page = this.state.page;
      query.language = this.state.language;
      LanguageActions.getPage(query);
  }

  componentWillUnmount() {
      LanguageStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
      this.setState(state);
      // this.setState({
      //     languages: LanguageStore.getState().languages
      // });
  }
  
  onSurveySubmit = (e) => {
      e.preventDefault();
      let form = document.querySelector('#languageForm');
      let data = getFormData(form, {trim: true});
      console.log(JSON.stringify(data));
      let language = language || {};
      language.language = data['language'];
      language.code = data['code'];
      // console.log(language);
      
      if (window.confirm('Are sure you want to add new Language.')) {
          console.log('yes');
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
    console.log('pagedata');
    console.log(pagedata);
    return (
      <div className="container">
        <h2>Languages</h2>
        <form id="languageForm">
        <div className="form-group">
          <input type="text" name="language" id="language" ref="language" placeholder="language"/>&nbsp;&nbsp;
          <input type="text" name="code" id="code" ref="code" placeholder="code"/>&nbsp;&nbsp;
          <button className="btn btn-primary" onClick={this.onSurveySubmit}>Add Language</button>
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
         
        </div>
        
      </div>
    );
  }
}

