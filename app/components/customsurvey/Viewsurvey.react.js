import React from 'react';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import CustomSurveyStore from 'stores/CustomSurveyStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import MlangStore from 'stores/MlangStore';
import GetText from 'utils/GetText';


export default class Viewsurvey extends React.Component {

  constructor(props) {
      super(props);
      mixins(Navigation, this);
      this.state = CustomSurveyStore.getState();
      this.state.filtered = [];
      this.state.multilang = MlangStore.getState().multilang;
  }

  componentDidMount() {
      CustomSurveyActions.getMyCSurveyForms();
      CustomSurveyStore.listen(this._onChange);
      //$('#tableData').paging({limit: 5});
      MlangStore.listen(this._onMLChange);
  }

  componentDidUpdate () {
      //$(document).ready(function () {
      //   $('#tableData').paging({limit: 5});
      //});
  }

  componentWillUnmount() {
      CustomSurveyStore.unlisten(this._onChange);
      MlangStore.unlisten(this._onMLChange);
  }

  _onChange = (state) => {
      this.setState({
        myforms: CustomSurveyStore.getState().myforms,
        filtered: this.state.myforms
      });
  }

  _onMLChange = () => {
      this.setState({
          multilang: MlangStore.getState().multilang
      });
  }

  onSearchTitle = (e) => {
      e.preventDefault();
      let text = e.target.value;
      let myforms = this.state.myforms;
      let filtered = [];
      myforms.map((data, key) => {
          if((data.surveytitle.toLowerCase()).indexOf(text.toLowerCase()) === 0){
              //return data;
              filtered.push(data);
          }
      });
      this.setState({filtered: filtered});
  }

  onTakeASurvey = (e) => {
      e.preventDefault();
      let id = e.target.id;
      //CustomSurveyActions.deleteForm(id);
      window.location.assign('/takesurvey/' + id);
  }

  render() {
      //let forms = this.state.forms;
      let mlarray = this.state.multilang;
      let myforms = this.state.filtered;
      let items = null;
      let sno = 1;
      items = myforms.map((form) => {
          return (
              <tr>
                  <td>{sno++}</td>
                  <td>{form.surveytitle}</td>
                  <td>{form.createddate}</td>
                  <td><a href="#" onClick={this.onTakeASurvey} id={form._id}>{GetText('SVFM_VIEWSURVEY_LINK', mlarray)}</a>
                  </td>
              </tr>
              );
      });


      return (
            <div className="ui segment brdr-none padding-none width-rating  ">
                <div className="clear"></div>
                <div className="ui two column stackable grid container ">
                    <div className="column">
                        <h4 className="ui header ryt com">{GetText('SVFM_TITLE', mlarray)}</h4>
                    </div>
                    <div className="column"></div>
                </div>
                <div className="ui four column stackable grid container">
                    <div className="five column">
                        <div className="ui search">
                            <div className="ui icon input">
                                <input className="prompt" type="text" placeholder={GetText('SVFM_SEARCH_BOX', mlarray)} name="searchtitle" id="searchtitle" onChange={this.onSearchTitle} />
                                <i className="search icon"></i> </div>
                            <div className="results"></div>
                        </div>
                    </div>
                </div>
                <div className="ui container">
                    <table id="tableData" className="ui celled striped table">
                        <thead>
                            <tr>
                                <th>{GetText('SVFM_TBLNUMBER', mlarray)}</th>
                                <th>{GetText('SVFM_TBLTITLE', mlarray)}</th>
                                <th>{GetText('SVFM_TBLDATE', mlarray)}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </div>
            </div>
      );
  }
}

Viewsurvey.contextTypes = { router: React.PropTypes.func };


