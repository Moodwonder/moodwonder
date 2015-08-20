import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';


export default class Signuppage extends React.Component {

  constructor(props) {
      super(props);
      this.state = PageStore.getState();
      this.state = {
          pagedata: [],
          language: props.language,
          LOIGN_TITLE: '',
          USERNAME: '',
          PASSWORD: '',
          FORGOT_PASSWORD: ''
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
          LOIGN_TITLE: pagedata.LOIGN_TITLE,
          USERNAME: pagedata.USERNAME,
          PASSWORD: pagedata.PASSWORD,
          FORGOT_PASSWORD: pagedata.FORGOT_PASSWORD
      });
  }

  onCancelLogin = (e) => {
      e.preventDefault();
  }

  onSubmitLogin = (e) => {
      e.preventDefault();
      this.props.onClick(this);
  }

  onChangeKeys = (e, key) => {
      e.preventDefault();
      this.setState({ [key]: e.target.value });
  }


  render() {

      let pagedata = this.state.pagedata;
      let LOIGN_TITLE = this.state.LOIGN_TITLE;
      let USERNAME = this.state.USERNAME;
      let PASSWORD = this.state.PASSWORD;
      let FORGOT_PASSWORD = this.state.FORGOT_PASSWORD;


      return (
      <div className="container">
        <h4>Edit - Login page keys</h4>
        <form id="signupForm" className="form-horizontal">
          <input type="hidden" name="_id" value={pagedata._id} />
          <input type="hidden" name="language" value={pagedata.language} />
          <div className="form-group">
            <label className="col-sm-2 control-label">LOIGN_TITLE</label>
            <div className="col-sm-10">
              <input className="form-control"
                     name="LOIGN_TITLE"
                     type="text"
                     value={LOIGN_TITLE}
                     onChange={this.onChangeKeys.bind(this, 'LOIGN_TITLE')} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">USERNAME</label>
            <div className="col-sm-10">
              <input className="form-control"
                     type="text"
                     name="USERNAME"
                     value={USERNAME}
                     onChange={this.onChangeKeys.bind(this, 'USERNAME')} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">PASSWORD</label>
            <div className="col-sm-10">
              <input className="form-control"
                     type="text"
                     name="PASSWORD"
                     value={PASSWORD}
                     onChange={this.onChangeKeys.bind(this, 'PASSWORD')} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">FORGOT_PASSWORD</label>
            <div className="col-sm-10">
              <input className="form-control"
                     type="text"
                     name="FORGOT_PASSWORD"
                     value={FORGOT_PASSWORD}
                     onChange={this.onChangeKeys.bind(this, 'FORGOT_PASSWORD')} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label"></label>
            <div className="col-sm-10">
              <button className="btn btn-primary" onClick={this.onSubmitLogin}>Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

}



