import React from 'react';
import getFormData from 'get-form-data';
import LanguageActions from 'actions/LanguageActions';
import LanguageStore from 'stores/LanguageStore';

export default class Languages extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
         formstatus: false,
         languages: [],
         addlanguageform: false,
         editlanguage: '',
         editcode: '',
         editid: '',
         editlanguageform: false,
         showform: false
     };
  }

  componentDidMount() {
      LanguageActions.getLanguages();
      LanguageStore.listen(this._onChange);
      this.setState({formstatus: false});
  }

  componentWillUnmount() {
      LanguageStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
          languages: LanguageStore.getState().languages
      });
  }

  onLanguageSubmit = (e) => {
      e.preventDefault();
      let form = document.querySelector('#languageForm');
      let data = getFormData(form, {trim: true});
      let language = language || {};
      language.language = data['language'];
      language.code = data['code'];
      let id = data['id'];

      if (window.confirm('Are sure you want to add new Language.')) {
          if(id === '') {
              LanguageActions.addLanguage(language);
          } else {
              LanguageActions.editLanguage(id, language);
          }
      }
  }

  onAddNewLanguage = (e) => {
      e.preventDefault();
      this.setState({addlanguageform: true});
      this.setState({editlanguageform: false});
      this.setState({showform: true});
      this.setState({editcode: ''});
      this.setState({editid: ''});
      this.setState({editlanguage: ''});
  }

  onDeleteLanguage = (e) => {
      e.preventDefault();
      this.setState({showform: false});
      let id = e.target.id;
      LanguageActions.deleteLanguage(id);
  }

  onEditLanguage = (e, child) => {
      this.setState({addlanguageform: false});
      this.setState({showform: true});
      let id = e.target.id;
      let languages = this.state.languages;

      for (let i = 0; i < languages.length; i++) {
          let language = languages[i];
          if (language._id === id) {
              this.setState({editlanguage: language.language});
              this.setState({editcode: language.code});
              this.setState({editid: language._id});
              this.setState({editlanguageform: true});
          }
      }
  }

  onChangeLanguage = (e) => {
      this.setState({editlanguage: e.target.value});
  }

  onChangeCode = (e) => {
      this.setState({editcode: e.target.value});
  }


  render() {
      let languages = this.state.languages;
      let formstatus = this.state.formstatus;
      let addlanguageform = this.state.addlanguageform;
      let editlanguageform = this.state.editlanguageform;
      let showform = this.state.showform;
      let statusmessage = '';
      let formcontents = '';
      let items = '';
      let sno = 1;

      items = languages.map((language) => {
          return (<tr>
                <td className="text-center">{sno++}</td>
                <td className="text-center">{language.language}</td>
                <td className="text-center">{language.code}</td>
                <td className="text-center">
                  <a href="#"
                     onClick={this.onEditLanguage}
                     code={language.code}
                     language={language.language}
                     id={language._id}>Edit</a>
                  &nbsp;/&nbsp;
                  <a href="#" onClick={this.onDeleteLanguage} id={language._id}>Delete</a>
                </td>
              </tr>
              );
      });

      if(showform) {

          let formtitle = '';
          if (addlanguageform) {
              formtitle = 'Add New Language';
          } else if (editlanguageform) {
              formtitle = 'Edit Language';
          }

          formcontents = (
                  <div className="form-group">
                    <h4>{formtitle}</h4>
                    <br/>
                    <form id="languageForm" className="form-horizontal">
                      <div className="form-group">
                        <label className="col-sm-2 control-label">Language</label>
                        <div className="col-sm-10">
                          <input type="text"
                                 className="form-control"
                                 name="language"
                                 value={this.state.editlanguage}
                                 onChange={this.onChangeLanguage}
                                 ref="language"
                                 placeholder="language"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-2 control-label">Code</label>
                        <div className="col-sm-10">
                          <input type="text"
                                 className="form-control"
                                 name="code"
                                 value={this.state.editcode}
                                 onChange={this.onChangeCode}
                                 ref="code"
                                 placeholder="code"/>
                        </div>
                        <input type="hidden" name="id" value={this.state.editid}  ref="id"/>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-2 control-label">&nbsp;</label>
                        <div className="col-sm-10">
                          <button className="btn btn-primary" onClick={this.onLanguageSubmit}>Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  );
      }

      if(formstatus) {
          statusmessage = (<div className="alert alert-success">
                            <strong>Success!</strong> Form submitted.
                           </div>
                          );
      }

      return (
      <div className="container">
        <h2>Languages</h2>
        <br/>
        <div className="form-group">
          <a href="#" onClick={this.onAddNewLanguage}>Add New Language</a>
        </div>

        <div className="form-group">
            <table className="table table-striped table-hover">
              <thead>
                <tr className="info">
                  <th className="text-center"></th>
                  <th className="text-center">Language</th>
                  <th className="text-center">Code</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {items}
              </tbody>
            </table>
        </div>

        <div className="form-group">
         {statusmessage}
        </div>

        <div className="form-group">
         <br/><br/>
         {formcontents}
        </div>

      </div>
    );
  }
}

