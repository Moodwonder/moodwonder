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
          SIGNUP_TITLE: '',
          SUB_TITLE: ''
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
          SIGNUP_TITLE: pagedata.SIGNUP_TITLE,
          SUB_TITLE: pagedata.SUB_TITLE
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


  render() {

      let pagedata = this.state.pagedata;
      let SIGNUP_TITLE = this.state.SIGNUP_TITLE;
      let SUB_TITLE = this.state.SUB_TITLE;


      return (
      <div className="container">
        <h4>Edit - Signup page keys</h4>
        <form id="signupForm" className="form-horizontal">
          <input type="hidden" name="_id" value={pagedata._id} />
          <input type="hidden" name="language" value={pagedata.language} />

          <div className="form-group">
            <label className="col-sm-2 control-label">SIGNUP_TITLE</label>
            <div className="col-sm-10">
              <input className="form-control"
                     name="SIGNUP_TITLE"
                     type="text"
                     value={SIGNUP_TITLE}
                     onChange={this.onChangeKeys.bind(this, 'SIGNUP_TITLE')} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">SUB_TITLE</label>
            <div className="col-sm-10">
              <input className="form-control"
                     name="SUB_TITLE"
                     type="text"
                     value={SUB_TITLE}
                     onChange={this.onChangeKeys.bind(this, 'SUB_TITLE')} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label"></label>
            <div className="col-sm-10">
              <button className="btn btn-primary" onClick={this.onSubmitSignup}>Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

}


