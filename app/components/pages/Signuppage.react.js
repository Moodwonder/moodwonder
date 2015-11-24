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
          SGN_TITLE: '',
          SGN_WORK_EMAIL: '',
          SGN_BTN_SUBMIT: ''
      };
  }

  componentDidMount() {
      PageStore.listen(this._onChange);
      PageActions.getPage({page: 'signup', language: this.state.language});
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
          SGN_TITLE: pagedata.SGN_TITLE,
          SGN_WORK_EMAIL: pagedata.SGN_WORK_EMAIL,
          SGN_BTN_SUBMIT: pagedata.SGN_BTN_SUBMIT
      });
  }

  onSubmitSignup = (e) => {
      e.preventDefault();
      this.props.onClick(this);
  }

  onChangeKeys = (e, key) => {
      e.preventDefault();
      this.setState({ [key]: e.target.value });
  }

  onChangeSignupTitle = (e) => {
      e.preventDefault();
      this.setState({ SGN_TITLE: e.target.value });
  }

  onChangeWorkEmail = (e) => {
      e.preventDefault();
      this.setState({ SGN_WORK_EMAIL: e.target.value });
  }

  onChangeBtnSubmit = (e) => {
      e.preventDefault();
      this.setState({ SGN_BTN_SUBMIT: e.target.value });
  }



  render() {

      let pagedata = this.state.pagedata;
      let SGN_TITLE = this.state.SGN_TITLE;
      let SGN_WORK_EMAIL = this.state.SGN_WORK_EMAIL;
      let SGN_BTN_SUBMIT = this.state.SGN_BTN_SUBMIT;


      return (
        <div className="ui container">
            <h4>Edit - Signup page keys</h4>
            <div className="ui three column stackable grid container ">
                <div className="column">
                    <form id="signupForm" className="ui form">
                      <input type="hidden" name="_id" value={pagedata._id} />
                      <input type="hidden" name="language" value={pagedata.language} />

                      <div className="field">
                        <label>SGN_TITLE</label>
                        <input className="form-control"
                                 name="SGN_TITLE"
                                 type="text"
                                 value={SGN_TITLE}
                                 onChange={this.onChangeSignupTitle} />
                      </div>

                      <div className="field">
                        <label>SGN_WORK_EMAIL</label>
                        <input className="form-control"
                                 name="SGN_WORK_EMAIL"
                                 type="text"
                                 value={SGN_WORK_EMAIL}
                                 onChange={this.onChangeWorkEmail} />
                      </div>

                      <div className="field">
                        <label>SGN_BTN_SUBMIT</label>
                        <input className="form-control"
                                 name="SGN_BTN_SUBMIT"
                                 type="text"
                                 value={SGN_BTN_SUBMIT}
                                 onChange={this.onChangeBtnSubmit} />
                      </div>

                      <div className="field">
                          <button className="ui blue button" onClick={this.onSubmitSignup}>Submit</button>
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


