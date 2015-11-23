import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Homepage extends React.Component {

  constructor(props) {
      super(props);
      // this.state = PageStore.getState();
      this.state = {
          pagedata: [],
          language: props.language,
          HOM_TITLE: ''
      };
  }


  componentDidMount() {
      PageStore.listen(this._onChange);
      PageActions.getPage({page: 'home', language: this.state.language});
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
          HOM_TITLE: pagedata.HOM_TITLE
      });
  }

  onSubmitHome = (e) => {
      e.preventDefault();
      this.props.onClick(this);
  }

  onChangeHomeTitle = (e) => {
      e.preventDefault();
      this.setState({ HOM_TITLE: e.target.value });
  }


  render() {

      let pagedata = this.state.pagedata;
      let HOM_TITLE = this.state.HOM_TITLE;


      return (
      <div className="ui container">
        <h4>Edit - Home page keys</h4>
        <div className="ui three column stackable grid container ">
            <div className="column">
                <form id="homeForm" className="ui form">
                  <input type="hidden" name="_id" value={pagedata._id} />
                  <input type="hidden" name="language" value={pagedata.language} />
                  <div className="field">
                    <label>HOM_TITLE</label>
                    <input type="text"
                             name="HOM_TITLE"
                             className="form-control"
                             value={HOM_TITLE}
                             onChange={this.onChangeHomeTitle} />
                  </div>
                  <div className="field">
                    <button className="ui blue button" onClick={this.onSubmitHome}>Update</button>
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


