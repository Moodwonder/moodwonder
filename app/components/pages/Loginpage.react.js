import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';


export default class Signuppage extends React.Component {

  constructor(props) {
      super(props);
      // this.state = PageStore.getState();
      this.state = {
          pagedata: [],
          language: props.language,
          LGN_TITLE: '',
          LGN_USERNAME: '',
          LGN_PASSWORD: '',
          LGN_FORGOT_PASSWORD: '',
          LGN_BTN_SUBMIT: ''
      };
  }

  componentDidMount() {
      PageStore.listen(this._onChange);
      PageActions.getPage({page: 'login', language: this.state.language});
  }

  componentWillUnmount() {
      PageStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
          pagedata: PageStore.getState().pagedata
      });

      let pagedata = this.state.pagedata;
      this.setState({
          LGN_TITLE: pagedata.LGN_TITLE,
          LGN_USERNAME: pagedata.LGN_USERNAME,
          LGN_PASSWORD: pagedata.LGN_PASSWORD,
          LGN_FORGOT_PASSWORD: pagedata.LGN_FORGOT_PASSWORD,
          LGN_BTN_SUBMIT: pagedata.LGN_BTN_SUBMIT
      });
  }

  onCancelLogin = (e) => {
      e.preventDefault();
  }

  onSubmitLogin = (e) => {
      e.preventDefault();
      this.props.onClick(this);
  }

  onChangeLoginTitle = (e) => {
      e.preventDefault();
      this.setState({ LGN_TITLE: e.target.value });
  }

  onChangeUsername = (e) => {
      e.preventDefault();
      this.setState({ LGN_USERNAME: e.target.value });
  }

  onChangePassword = (e) => {
      e.preventDefault();
      this.setState({ LGN_PASSWORD: e.target.value });
  }

  onChangeFPassword = (e) => {
      e.preventDefault();
      this.setState({ LGN_FORGOT_PASSWORD: e.target.value });
  }

  onChangeBtnSubmit = (e) => {
      e.preventDefault();
      this.setState({ LGN_BTN_SUBMIT: e.target.value });
  }


  render() {

      let pagedata = this.state.pagedata;
      let LGN_TITLE = this.state.LGN_TITLE;
      let LGN_USERNAME = this.state.LGN_USERNAME;
      let LGN_PASSWORD = this.state.LGN_PASSWORD;
      let LGN_FORGOT_PASSWORD = this.state.LGN_FORGOT_PASSWORD;
      let LGN_BTN_SUBMIT = this.state.LGN_BTN_SUBMIT;


      return (
            <div className="ui container">
            <h4>Edit - Login page keys</h4>
            <div className="ui three column stackable grid container ">
                <div className="column">
                    <form id="signupForm" className="ui form">
                      <input type="hidden" name="_id" value={pagedata._id} />
                      <input type="hidden" name="language" value={pagedata.language} />
                      <div className="field">
                        <label>LGN_TITLE</label>
                        <input className="form-control"
                                 name="LGN_TITLE"
                                 type="text"
                                 value={LGN_TITLE}
                                 onChange={this.onChangeLoginTitle} />
                      </div>
                      <div className="field">
                        <label>LGN_USERNAME</label>
                        <input className="form-control"
                                 type="text"
                                 name="LGN_USERNAME"
                                 value={LGN_USERNAME}
                                 onChange={this.onChangeUsername} />
                      </div>
                      <div className="field">
                        <label>LGN_PASSWORD</label>
                        <input className="form-control"
                                 type="text"
                                 name="LGN_PASSWORD"
                                 value={LGN_PASSWORD}
                                 onChange={this.onChangePassword} />
                      </div>
                      <div className="field">
                        <label>LGN_FORGOT_PASSWORD</label>
                        <input className="form-control"
                                 type="text"
                                 name="LGN_FORGOT_PASSWORD"
                                 value={LGN_FORGOT_PASSWORD}
                                 onChange={this.onChangeFPassword} />
                      </div>
                      <div className="field">
                        <label>LGN_BTN_SUBMIT</label>
                        <input className="form-control"
                                 type="text"
                                 name="LGN_BTN_SUBMIT"
                                 value={LGN_BTN_SUBMIT}
                                 onChange={this.onChangeBtnSubmit} />
                      </div>
                      <div className="field">
                        <button className="ui blue button" onClick={this.onSubmitLogin}>Submit</button>
                      </div>
                    </form>
                </div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
        </div>
    );
  }

}



