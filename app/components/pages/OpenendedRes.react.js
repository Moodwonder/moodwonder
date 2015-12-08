import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';


export default class OpenendedRes extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          pagedata: [],
          language: props.language,
          OPER_TITLE : ''
      };
  }

  componentDidMount() {
      PageStore.listen(this._onChange);
      PageActions.getPage({page: 'openendedres', language: this.state.language});
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
          OPER_TITLE: pagedata.OPER_TITLE
      });
  }

  onCancelLogin = (e) => {
      e.preventDefault();
  }

  onSubmitOpenendedRes = (e) => {
      e.preventDefault();
      this.props.onClick(this);
  }

  onChangeBannerTitle = (e) => {
      e.preventDefault();
      this.setState({ OPER_TITLE: e.target.value });
  }



  render() {

      let pagedata = this.state.pagedata;
      let OPER_TITLE = this.state.OPER_TITLE;


      return (
            <div className="ui container">
            <h4>Edit - Login page keys</h4>
            <div className="ui three column stackable grid container ">
                <div className="column">
                    <form id="openendedresForm" className="ui form">
                      <input type="hidden" name="_id" value={pagedata._id} />
                      <input type="hidden" name="language" value={pagedata.language} />

                      <div className="field">
                        <label>OPER_TITLE</label>
                        <input className="form-control"
                                 name="OPER_TITLE"
                                 type="text"
                                 value={OPER_TITLE}
                                 onChange={this.onChangeBannerTitle} />
                      </div>

                      <div className="field">
                        <button className="ui blue button" onClick={this.onSubmitOpenendedRes}>Submit</button>
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



