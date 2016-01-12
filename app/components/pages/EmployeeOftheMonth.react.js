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
          EOM_SEARCH_BTN_1: '',
          EOM_VOTE_BTN: '',
          EOM_VOTECOUNT_TEXT: '',
          EOM_VOTE_PERIOD: '',
          EOM_POPUP_TITLE: '',
          EOM_POPUP_COMMENT: '',
          EOM_POPUP_VOTE_BTN: '',
          EOM_POPUP_CLOSE_BTN: '',
          EOM_VOTE_COUNT_MESSAGE: ''
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
          EOM_SEARCH_BTN_1: pagedata.EOM_SEARCH_BTN_1,
          EOM_VOTE_BTN: pagedata.EOM_VOTE_BTN,
          EOM_VOTECOUNT_TEXT: pagedata.EOM_VOTECOUNT_TEXT,
          EOM_VOTE_PERIOD: pagedata.EOM_VOTE_PERIOD,
          EOM_POPUP_TITLE: pagedata.EOM_POPUP_TITLE,
          EOM_POPUP_COMMENT: pagedata.EOM_POPUP_COMMENT,
          EOM_POPUP_VOTE_BTN: pagedata.EOM_POPUP_VOTE_BTN,
          EOM_POPUP_CLOSE_BTN: pagedata.EOM_POPUP_CLOSE_BTN,
          EOM_VOTE_COUNT_MESSAGE: pagedata.EOM_VOTE_COUNT_MESSAGE
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
  eomVoteBtn = (e) => {
      e.preventDefault();
      this.setState({ EOM_VOTE_BTN: e.target.value });
  }
  eomVoteCountText = (e) => {
      e.preventDefault();
      this.setState({ EOM_VOTECOUNT_TEXT: e.target.value });
  }
  eomVotePeriod = (e) => {
      e.preventDefault();
      this.setState({ EOM_VOTE_PERIOD: e.target.value });
  }
  eomPopupTitle = (e) => {
      e.preventDefault();
      this.setState({ EOM_POPUP_TITLE: e.target.value });
  }
  eomPopupComment = (e) => {
      e.preventDefault();
      this.setState({ EOM_POPUP_COMMENT: e.target.value });
  }
  eomPopupVoteBtn = (e) => {
      e.preventDefault();
      this.setState({ EOM_POPUP_VOTE_BTN: e.target.value });
  }
  eomPopupCloseBtn = (e) => {
      e.preventDefault();
      this.setState({ EOM_POPUP_CLOSE_BTN: e.target.value });
  }
  eomVoteCountMessage = (e) => {
      e.preventDefault();
      this.setState({ EOM_VOTE_COUNT_MESSAGE: e.target.value });
  }



  render() {

      let pagedata = this.state.pagedata;
      let EOM_TITLE_1 = this.state.EOM_TITLE_1;
      let EOM_SHOW_MORE = this.state.EOM_SHOW_MORE;
      let EOM_SEARCH_PLACEHOLDER_1 = this.state.EOM_SEARCH_PLACEHOLDER_1;
      let EOM_SEARCH_BTN_1 = this.state.EOM_SEARCH_BTN_1;
      let EOM_VOTE_BTN = this.state.EOM_VOTE_BTN;
      let EOM_VOTECOUNT_TEXT = this.state.EOM_VOTECOUNT_TEXT;
      let EOM_VOTE_PERIOD = this.state.EOM_VOTE_PERIOD;
      let EOM_POPUP_TITLE = this.state.EOM_POPUP_TITLE;
      let EOM_POPUP_COMMENT = this.state.EOM_POPUP_COMMENT;
      let EOM_POPUP_VOTE_BTN = this.state.EOM_POPUP_VOTE_BTN;
      let EOM_POPUP_CLOSE_BTN = this.state.EOM_POPUP_CLOSE_BTN;
      let EOM_VOTE_COUNT_MESSAGE = this.state.EOM_VOTE_COUNT_MESSAGE;


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
                        <label>EOM_VOTE_BTN</label>
                        <input className="form-control"
                                 name="EOM_VOTE_BTN"
                                 type="text"
                                 value={EOM_VOTE_BTN}
                                 onChange={this.eomVoteBtn} />
                      </div>
                      <div className="field">
                        <label>EOM_VOTECOUNT_TEXT</label>
                        <input className="form-control"
                                 name="EOM_VOTECOUNT_TEXT"
                                 type="text"
                                 value={EOM_VOTECOUNT_TEXT}
                                 onChange={this.eomVoteCountText} />
                      </div>
                      <div className="field">
                        <label>EOM_VOTE_PERIOD</label>
                        <input className="form-control"
                                 name="EOM_VOTE_PERIOD"
                                 type="text"
                                 value={EOM_VOTE_PERIOD}
                                 onChange={this.eomVotePeriod} />
                      </div>
                      <div className="field">
                        <label>EOM_POPUP_TITLE</label>
                        <input className="form-control"
                                 name="EOM_POPUP_TITLE"
                                 type="text"
                                 value={EOM_POPUP_TITLE}
                                 onChange={this.eomPopupTitle} />
                      </div>
                      <div className="field">
                        <label>EOM_POPUP_COMMENT</label>
                        <input className="form-control"
                                 name="EOM_POPUP_COMMENT"
                                 type="text"
                                 value={EOM_POPUP_COMMENT}
                                 onChange={this.eomPopupComment} />
                      </div>
                      <div className="field">
                        <label>EOM_POPUP_VOTE_BTN</label>
                        <input className="form-control"
                                 name="EOM_POPUP_VOTE_BTN"
                                 type="text"
                                 value={EOM_POPUP_VOTE_BTN}
                                 onChange={this.eomPopupVoteBtn} />
                      </div>
                      <div className="field">
                        <label>EOM_POPUP_CLOSE_BTN</label>
                        <input className="form-control"
                                 name="EOM_POPUP_CLOSE_BTN"
                                 type="text"
                                 value={EOM_POPUP_CLOSE_BTN}
                                 onChange={this.eomPopupCloseBtn} />
                      </div>
                      <div className="field">
                        <label>EOM_VOTE_COUNT_MESSAGE</label>
                        <input className="form-control"
                                 name="EOM_VOTE_COUNT_MESSAGE"
                                 type="text"
                                 value={EOM_VOTE_COUNT_MESSAGE}
                                 onChange={this.eomVoteCountMessage} />
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



