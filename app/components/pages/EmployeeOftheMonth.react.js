import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';


export default class EmployeeOftheMonth extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          pagedata: [],
          language: props.language,
          EOM_TITLE_1: '',
          EOM_SHOW_MORE: '',
          EOM_SEARCH_PLACEHOLDER_1: '',
          EOM_SEARCH_BTN_1: ''
      };
  }

  componentDidMount() {
      PageStore.listen(this._onChange);
      PageActions.getPage({page: 'eom', language: this.state.language});
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
          EOM_TITLE_1: pagedata.EOM_TITLE_1,
          EOM_SHOW_MORE: pagedata.EOM_SHOW_MORE,
          EOM_SEARCH_PLACEHOLDER_1: pagedata.EOM_SEARCH_PLACEHOLDER_1,
          EOM_SEARCH_BTN_1: pagedata.EOM_SEARCH_BTN_1
      });
  }

  onCancelLogin = (e) => {
      e.preventDefault();
  }

  onSubmitEOM = (e) => {
      e.preventDefault();
      this.props.onClick(this);
  }

  eomTitle = (e) => {
      e.preventDefault();
      this.setState({ EOM_TITLE_1: e.target.value });
  }
  eomShowMore = (e) => {
      e.preventDefault();
      this.setState({ EOM_SHOW_MORE: e.target.value });
  }
  eomSearchPlaceholder = (e) => {
      e.preventDefault();
      this.setState({ EOM_SEARCH_PLACEHOLDER_1: e.target.value });
  }
  eomSearchBtn = (e) => {
      e.preventDefault();
      this.setState({ EOM_SEARCH_BTN_1: e.target.value });
  }



  render() {

      let pagedata = this.state.pagedata;
      let EOM_TITLE_1 = this.state.EOM_TITLE_1;
      let EOM_SHOW_MORE = this.state.EOM_SHOW_MORE;
      let EOM_SEARCH_PLACEHOLDER_1 = this.state.EOM_SEARCH_PLACEHOLDER_1;
      let EOM_SEARCH_BTN_1 = this.state.EOM_SEARCH_BTN_1;


      return (
            <div className="ui container">
            <h4>Edit - Login page keys</h4>
            <div className="ui three column stackable grid container ">
                <div className="column">
                    <form id="employeeOftheMonthForm" className="ui form">
                      <input type="hidden" name="_id" value={pagedata._id} />
                      <input type="hidden" name="language" value={pagedata.language} />

                      <div className="field">
                        <label>EOM_TITLE_1</label>
                        <input className="form-control"
                                 name="EOM_TITLE_1"
                                 type="text"
                                 value={EOM_TITLE_1}
                                 onChange={this.eomTitle} />
                      </div>
                      <div className="field">
                        <label>EOM_SHOW_MORE</label>
                        <input className="form-control"
                                 name="EOM_SHOW_MORE"
                                 type="text"
                                 value={EOM_SHOW_MORE}
                                 onChange={this.eomShowMore} />
                      </div>
                      <div className="field">
                        <label>EOM_SEARCH_PLACEHOLDER_1</label>
                        <input className="form-control"
                                 name="EOM_SEARCH_PLACEHOLDER_1"
                                 type="text"
                                 value={EOM_SEARCH_PLACEHOLDER_1}
                                 onChange={this.eomSearchPlaceholder} />
                      </div>
                      <div className="field">
                        <label>EOM_SEARCH_BTN_1</label>
                        <input className="form-control"
                                 name="EOM_SEARCH_BTN_1"
                                 type="text"
                                 value={EOM_SEARCH_BTN_1}
                                 onChange={this.eomSearchBtn} />
                      </div>

                      <div className="field">
                        <button className="ui blue button" onClick={this.onSubmitEOM}>Submit</button>
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



