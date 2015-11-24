import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Signuppage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          pagedata: [],
          language: props.language,
          L_MYMOOD_LINK: '',
          L_MYACCOUNT_LINK: '',
          L_MYCOMPANY_LINK: '',
          L_INVITE_PEOPLE_TITLE: '',
          L_INVITE_PEOPLE_DES: '',
          L_INVITE_INPUT_PLCHOLDER: '',
          L_INVITE_BTN: '',
          L_MYPROFILE_LINK: '',
          L_LOGOUT_LINK: ''
      };
  }

  componentDidMount() {
      PageStore.listen(this._onChange);
      PageActions.getPage({page: 'mwusertheme', language: this.state.language});
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
          L_MYMOOD_LINK: pagedata.L_MYMOOD_LINK,
          L_MYACCOUNT_LINK: pagedata.L_MYACCOUNT_LINK,
          L_MYCOMPANY_LINK: pagedata.L_MYCOMPANY_LINK,
          L_INVITE_PEOPLE_TITLE: pagedata.L_INVITE_PEOPLE_TITLE,
          L_INVITE_PEOPLE_DES: pagedata.L_INVITE_PEOPLE_DES,
          L_INVITE_INPUT_PLCHOLDER: pagedata.L_INVITE_INPUT_PLCHOLDER,
          L_INVITE_BTN: pagedata.L_INVITE_BTN,
          L_MYPROFILE_LINK: pagedata.L_MYPROFILE_LINK,
          L_LOGOUT_LINK: pagedata.L_LOGOUT_LINK
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

  onChangeMymoodLink = (e) => {
      e.preventDefault();
      this.setState({ L_MYMOOD_LINK: e.target.value });
  }

  onChangeMyaccountLink = (e) => {
      e.preventDefault();
      this.setState({ L_MYACCOUNT_LINK: e.target.value });
  }

  onChangeMycompanyLink = (e) => {
      e.preventDefault();
      this.setState({ L_MYCOMPANY_LINK: e.target.value });
  }

  onChangeInviteTitle = (e) => {
      e.preventDefault();
      this.setState({ L_INVITE_PEOPLE_TITLE: e.target.value });
  }

  onChangeInviteDes = (e) => {
      e.preventDefault();
      this.setState({ L_INVITE_PEOPLE_DES: e.target.value });
  }

  onChangeInputPlcholder = (e) => {
      e.preventDefault();
      this.setState({ L_INVITE_INPUT_PLCHOLDER: e.target.value });
  }

  onChangeInviteBtn = (e) => {
      e.preventDefault();
      this.setState({ L_INVITE_BTN: e.target.value });
  }

  onChangeMyprofileLink = (e) => {
      e.preventDefault();
      this.setState({ L_MYPROFILE_LINK: e.target.value });
  }

  onChangeLogoutLink = (e) => {
      e.preventDefault();
      this.setState({ L_LOGOUT_LINK: e.target.value });
  }



  render() {

      let pagedata = this.state.pagedata;
      let L_MYMOOD_LINK = this.state.L_MYMOOD_LINK;
      let L_MYACCOUNT_LINK = this.state.L_MYACCOUNT_LINK;
      let L_MYCOMPANY_LINK = this.state.L_MYCOMPANY_LINK;
      let L_INVITE_PEOPLE_TITLE = this.state.L_INVITE_PEOPLE_TITLE;
      let L_INVITE_PEOPLE_DES = this.state.L_INVITE_PEOPLE_DES;
      let L_INVITE_INPUT_PLCHOLDER = this.state.L_INVITE_INPUT_PLCHOLDER;
      let L_INVITE_BTN = this.state.L_INVITE_BTN;
      let L_MYPROFILE_LINK = this.state.L_MYPROFILE_LINK;
      let L_LOGOUT_LINK = this.state.L_LOGOUT_LINK;


      return (
      <div className="ui container">
        <h4>Edit - Signup page keys</h4>
        <div className="ui three column stackable grid container ">
            <div className="column">
                <form id="mwuserthemeForm" className="ui form">
                  <input type="hidden" name="_id" value={pagedata._id} />
                  <input type="hidden" name="language" value={pagedata.language} />

                  <div className="field">
                    <label>L_MYMOOD_LINK</label>
                    <input className="form-control"
                             name="L_MYMOOD_LINK"
                             type="text"
                             value={L_MYMOOD_LINK}
                             onChange={this.onChangeMymoodLink} />
                  </div>

                  <div className="field">
                    <label>L_MYACCOUNT_LINK</label>
                    <input className="form-control"
                             name="L_MYACCOUNT_LINK"
                             type="text"
                             value={L_MYACCOUNT_LINK}
                             onChange={this.onChangeMyaccountLink} />
                  </div>

                  <div className="field">
                    <label>L_MYCOMPANY_LINK</label>
                    <input className="form-control"
                             name="L_MYCOMPANY_LINK"
                             type="text"
                             value={L_MYCOMPANY_LINK}
                             onChange={this.onChangeMycompanyLink} />
                  </div>

                  <div className="field">
                    <label>L_INVITE_PEOPLE_TITLE</label>
                    <input className="form-control"
                             name="L_INVITE_PEOPLE_TITLE"
                             type="text"
                             value={L_INVITE_PEOPLE_TITLE}
                             onChange={this.onChangeInviteTitle} />
                  </div>

                  <div className="field">
                    <label>L_INVITE_PEOPLE_DES</label>
                    <input className="form-control"
                             name="L_INVITE_PEOPLE_DES"
                             type="text"
                             value={L_INVITE_PEOPLE_DES}
                             onChange={this.onChangeInviteDes} />
                  </div>

                  <div className="field">
                    <label>L_INVITE_INPUT_PLCHOLDER</label>
                    <input className="form-control"
                             name="L_INVITE_INPUT_PLCHOLDER"
                             type="text"
                             value={L_INVITE_INPUT_PLCHOLDER}
                             onChange={this.onChangeInputPlcholder} />
                  </div>

                  <div className="field">
                    <label>L_INVITE_BTN</label>
                    <input className="form-control"
                             name="L_INVITE_BTN"
                             type="text"
                             value={L_INVITE_BTN}
                             onChange={this.onChangeInviteBtn} />
                  </div>

                  <div className="field">
                    <label>L_MYPROFILE_LINK</label>
                    <input className="form-control"
                             name="L_MYPROFILE_LINK"
                             type="text"
                             value={L_MYPROFILE_LINK}
                             onChange={this.onChangeMyprofileLink} />
                  </div>

                  <div className="field">
                    <label>L_LOGOUT_LINK</label>
                    <input className="form-control"
                             name="L_LOGOUT_LINK"
                             type="text"
                             value={L_LOGOUT_LINK}
                             onChange={this.onChangeLogoutLink} />
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


