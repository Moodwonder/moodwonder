import React from 'react';
import _ from 'underscore';
let LineChart = require("react-chartjs").Line;
import SurveyActions from 'actions/SurveyActions';
import SurveyStore from 'stores/SurveyStore';
import CompanyGraphdata from 'utils/CompanyGraphdata';
import CompanyRatings from 'utils/CompanyRatings';
import FullStar from 'components/FullStar.react';
import HalfStar from 'components/HalfStar.react';
import BlankStar from 'components/BlankStar.react';
import MyCompanyInfo from 'components/MyCompanyInfo.react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';


let chartoptions = {
    animation: false,
    bezierCurve: false,
    datasetFill : false,
    showScale: true,
    scaleOverride: true,
    scaleShowVerticalLines: false,
    scaleGridLineWidth : 1,
    scaleSteps: 6,
    scaleStepWidth: 1,
    responsive: true,
    scaleStartValue: 0,
    scaleShowLabels: true,
    tooltipTemplate: "<%= value %>"
};


export default class MyCompany extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          engagementgraphtab: true,
          companyratingstab: false,
          companyinfotab : false,
          companyedata: [],
          questions: [],
          graphengagement: 'mw_index',
          graphtabclick: false,
          currentuserid: '',
          teams: [],
          userDetails: []
      };
      this.engagementmoods = [];
      this.userstate = UserStore.getState();
  }

    componentDidUpdate () {
        // console.log(this.state);
    }
  componentDidMount() {
      SurveyActions.getCompanyData();
      SurveyActions.getMostEngagingManagers();
      SurveyActions.getEngagementSurvey();
      SurveyActions.getMyTeams();
      SurveyStore.listen(this._onChangeData);

      UserActions.getuserinfo();
      UserStore.listen(this._onChangeUserData);

      $('.ui.menu .ui.dropdown').dropdown({
        on: 'click'
      });
  }

  componentWillUnmount() {
      SurveyStore.unlisten(this._onChangeData);
      UserStore.unlisten(this._onChangeUserData);
  }

  componentDidUpdate () {
      //$('.graphengagement').dropdown({
      //    on: 'click'
      //});
      //$('.graphengagement').dropdown({
      //    onChange: this.onChangeGraphEngagement
      //});
      if (this.state.graphtabclick) {
          $('.graphengagement').dropdown({
              onChange: this.onChangeGraphEngagement
          });
      }
  }

  _onChangeData = () => {
      this.setState({
         companyedata: SurveyStore.getState().companyedata,
         questions : SurveyStore.getState().questions,
         currentuserid: SurveyStore.getState().currentuserid,
         teams: SurveyStore.getState().teams
      });

      this.engagementmoods = this.state.questions.map((data, key) => {
          return data.mood;
      });
  }

  _onChangeUserData = () => {
      this.setState({
         userDetails: UserStore.getState().userDetails
      });
  }

  engagementGraphClick = (e) => {
      e.preventDefault();
      this.setState({
          engagementgraphtab: true,
          companyratingstab : false,
          companyinfotab : false,
          graphtabclick: true
      });
  }

  companyRatingsClick = (e) => {
      e.preventDefault();
      this.setState({
          engagementgraphtab: false,
          companyratingstab : true,
          companyinfotab : false,
          graphtabclick: false
      });
  }

  companyInfoClick = (e) => {
      e.preventDefault();
      this.setState({
          engagementgraphtab: false,
          companyratingstab : false,
          companyinfotab : true,
          graphtabclick: false
      });
  }

  isFloat = (n) => {
      return n === +n && n !== (n|0);
  }

  getStars = (rating, star) => {
      let rate =  Math.abs(rating);
      let intRating =  parseInt(rate);
      let rows = [];
      for (let i = 0; i < intRating; i++) {
          rows.push(<FullStar star={star} />);
      }
      if (this.isFloat(rate)) {
          rows.push(<HalfStar star={star} />);
      }
      for (let j = 0; j < (4 - intRating); j++) {
          rows.push(<BlankStar />);
      }
      if (rows.length !== 5) {
          rows.push(<BlankStar />);
      }

      return rows;
  }

  bindDropdown = () => {
      $('.ui.menu .ui.dropdown').dropdown({
        on: 'click'
      });
      $('.graphengagement').dropdown({
          onChange: this.onChangeGraphEngagement
      });
  }

  onChangeGraphEngagement = (value) => {
      console.log(value);
      this.setState({ graphengagement : value });
  }



  render() {

      let engagementgraphtab = this.state.engagementgraphtab;
      let companyratingstab = this.state.companyratingstab;
      let companyinfotab = this.state.companyinfotab;
      let companyedata = this.state.companyedata;
      let graphengagement = this.state.graphengagement;
      let currentuserid = this.state.currentuserid;
      let teams = this.state.teams;
      let userDetails = this.state.userDetails;


      //Start : CompanyRatings
      let topThreeAreas = CompanyRatings.getTopThreeAreas(companyedata);
      let worstThreeAreas = CompanyRatings.getWorstThreeAreas(companyedata);
      let improvedAreas = CompanyRatings.getCompanyMostImprovedAreas(companyedata);
      let worstAreas = CompanyRatings.getCompanyWorstImprovedAreas(companyedata);

      let topthree = topThreeAreas.map((data, key) => {

          let rows = this.getStars(data.avg, "green");

          return (
                    <div className="column padding-ryt">
                        <div className="extra center aligned">
                            <p className="head">{data.avg}</p>
                                <div data-rating={data.avg} className="ui star rating">
                                    {rows}
                                </div>
                            <div className="title">{data.mood}</div>
                        </div>
                    </div>
                 );
      });

      let worstthree = worstThreeAreas.map((data, key) => {

          let rows = this.getStars(data.avg, "red");

          return (
                    <div className="column padding-ryt">
                        <div className="extra center aligned">
                            <p className="head">{data.avg}</p>
                            <div data-rating={data.avg} className="ui star rating">
                                {rows}
                            </div>
                            <div className="title">{data.mood}</div>
                        </div>
                    </div>
                 );
      });

      let improvedareas = improvedAreas.map((data, key) => {

          let rows = this.getStars(data.avg, "green");

          return (
                    <div className="column padding-ryt">
                        <div className="extra center aligned">
                            <p className="head">{data.avg}</p>
                            <div data-rating={data.avg} className="ui star rating">
                                {rows}
                            </div>
                            <div className="title">{data.mood}</div>
                        </div>
                    </div>
                 );
      });

      let worstareas = worstAreas.map((data, key) => {

          let rows = this.getStars(data.avg, "red");

          return (
                    <div className="column padding-ryt">
                        <div className="extra center aligned">
                            <p className="head">{data.avg}</p>
                            <div data-rating={data.avg} className="ui star rating">
                                {rows}
                            </div>
                            <div className="title">{data.mood}</div>
                        </div>
                    </div>
                 );
      });
      //End : CompanyRatings


      //Start: Engagement Graph
      let engagementmoods = this.engagementmoods;
      let moodoptions = '';
      moodoptions = engagementmoods.map((data, key) => {
          return (<option value={data}>{data}</option>);
      });

      let myGraphData = CompanyGraphdata.getMyEngagementData(graphengagement, companyedata, currentuserid);
      let mylastrate;
      for (let row of _.last(myGraphData,1)) {
          mylastrate = row.rating;
      }

      //Start : MyGraphdata
      let myxlabel = [];
      let myydata = [];
      let mycount = myGraphData.length - 1;
      let myindex = 0;

      for(let mydata of myGraphData) {
          if(myindex <= mycount) {
              myxlabel[myindex] = mydata.created.d;
              myydata[myindex] = mydata.rating;
          }
          myindex++;
      }

      if (myxlabel.length === 0) {
          let today = new Date();
          let year = today.getFullYear();
          let month = ('0' + (today.getMonth() + 1)).slice(-2);
          let day = ('0' + today.getDate()).slice(-2);
          myxlabel.push(year + '-' + month + '-' +day);
      }

      let mychartdata =  mychartdata || {};
      let mydata = {
            label: "First Dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: myydata
          };

      let mydatasets = [];
      mydatasets.push(mydata);

      mychartdata.labels = myxlabel;
      mychartdata.datasets = mydatasets;
      //End : MyGraphdata

      //Start : CompanyGraphdata
      let compnayGraphData = CompanyGraphdata.getEngagementGraphData(graphengagement, companyedata);
      let clastrate;
      for (let row of _.last(compnayGraphData,1)) {
          clastrate = row.rating;
      }

      let xlabel = [];
      let ydata = [];
      let count = compnayGraphData.length - 1;
      let index = 0;

      for(let data of compnayGraphData) {
          if(index <= count) {
              xlabel[index] = data.created.d;
              ydata[index] = data.rating;
          }
          index++;
      }

      if (xlabel.length === 0) {
          let today = new Date();
          let year = today.getFullYear();
          let month = ('0' + (today.getMonth() + 1)).slice(-2);
          let day = ('0' + today.getDate()).slice(-2);
          xlabel.push(year + '-' + month + '-' +day);
      }

      let chartdata =  chartdata || {};
      let data = {
            label: "First Dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: ydata
          };

      let datasets = [];
      datasets.push(data);

      chartdata.labels = xlabel;
      chartdata.datasets = datasets;
      //End : CompanyGraphdata


      //Start : Team Graph Data
      let teamgraph = teams.map((data, key) => {

          let teamGraphData = CompanyGraphdata.getTeamEngagementGraphData(graphengagement, companyedata, data.member_ids);
          let tlastrate = _.last(teamGraphData,1);

          let txlabel = [];
          let tydata = [];
          let tcount = teamGraphData.length - 1;
          let tindex = 0;

          for(let data of teamGraphData) {
              if(tindex <= tcount) {
                  txlabel[tindex] = data.created.d;
                  tydata[tindex] = data.rating;
              }
              tindex++;
          }

          if (txlabel.length === 0) {
              let today = new Date();
              let year = today.getFullYear();
              let month = ('0' + (today.getMonth() + 1)).slice(-2);
              let day = ('0' + today.getDate()).slice(-2);
              txlabel.push(year + '-' + month + '-' +day);
          }

          let tchartdata =  tchartdata || {};
          let tdata = {
              label: "First Dataset",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: tydata
          };

          let tdatasets = [];
          tdatasets.push(tdata);

          tchartdata.labels = txlabel;
          tchartdata.datasets = tdatasets;

          return (
                    <div className="ui  column stackable grid">
                        <div className="column ">
                            <div className="ui segment brdr">
                                <h2 className="com">{data.teamname} <span className="chrt"><i className="signal icon large"></i></span> <span className="points">{tlastrate[0].rating}</span> </h2>
                                <div><LineChart data={tchartdata} options={chartoptions} width="800" height="250" redraw/></div>
                            </div>
                        </div>
                    </div>
          );
      });
      //End : Team Graph Data

      //End: Engagement Graph

      let engagementGraphTabContent = null;
      if (engagementgraphtab) {
          engagementGraphTabContent = (
                <div className="ui bottom attached segment brdr-none menu">
                    <div className="ui  column stackable grid container">
                        <div className="column  brdr-none padding-none">
                            <div className="ui segment brdr-none padding-none ">
                                <h4 className="ui header ryt com">Moodwonder trend</h4>
                                <div className=" right menu mobile">
                                    <select className="ui search dropdown graphengagement" onChange={this.onChangeGraphEngagement} onClick={this.bindDropdown} value={graphengagement} name="graphengagement">
                                        <option value="mw_index">MW-Index</option>
                                        {moodoptions}
                                    </select>
                                </div>
                                <div className="clear"></div>
                                <div className="ui  column stackable grid">
                                    <div className="column ">
                                        <div className="ui segment brdr">
                                            <h2 className="com">Myself <span className="chrt"><i className="signal icon large"></i></span> <span className="points">{mylastrate}</span> </h2>
                                            <div><LineChart data={mychartdata} options={chartoptions} width="800" height="250" redraw/></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui  column stackable grid">
                                    <div className="column ">
                                        <div className="ui segment brdr">
                                            <h2 className="com">{userDetails.companyname} <span className="chrt"><i className="signal icon large"></i></span> <span className="points">{clastrate}</span> </h2>
                                            <div><LineChart data={chartdata} options={chartoptions} width="800" height="250" redraw/></div>
                                        </div>
                                    </div>
                                </div>
                                {teamgraph}
                            </div>
                        </div>
                    </div>
                </div>
          );
      }

      let moodRatingsTabContent = null;
      if (companyratingstab) {

          moodRatingsTabContent = (
                <div className="ui bottom attached segment brdr-none menu minus-margin-top">
                    <div className="ui segment brdr-none padding-none width-rating">
                        <div className="clear"></div>
                        <div className="ui two cards column stackable">

                            <div className="ui card  box-gry">
                                <div className="content box-gry-border">
                                    <div className="header">MY TOP THREE AREAS</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container  ">
                                        {topthree}
                                    </div>
                                </div>
                            </div>

                            <div className="ui card box-gry">
                                <div className="content box-gry-border">
                                    <div className="header">MY WORST THREE AREAS</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container ">
                                        {worstthree}
                                    </div>
                                </div>
                            </div>

                            <div className="ui card  box-gry ">
                                <div className="content box-gry-border">
                                    <div className="header">MY MOST IMPROVED AREAS (LAST 1 MONTH)</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container  ">
                                        {improvedareas}
                                    </div>
                                </div>
                            </div>

                            <div className="ui card  box-gry ">
                                <div className="content box-gry-border">
                                    <div className="header">MY LEAST IMPROVED AREAS (LAST 1 MONTH)</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container  ">
                                        {worstareas}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          );
      }

      let display = (companyinfotab) ? 'block': 'none' ;

      // Enable company info tab if the current user is admin
      let comInfoTab = null;
      let comInfoTabContent = null;
      if((this.userstate.user.get('usertype')==='admin')){
          comInfoTab = [<a className="item mobile column" onClick={this.companyInfoClick} href="#"> Company Info </a>];
          comInfoTabContent = [<div style={{display: display}}><MyCompanyInfo/></div>];
      }


      return (
            <div>
                <div className="ui tabular menu tab three column">
                    <a className="item active mobile column" onClick={this.engagementGraphClick} href="#"> Engagement Graph </a>
                    <a className="item mobile column" onClick={this.companyRatingsClick} href="#"> Company Ratings </a>
                    {comInfoTab}
                </div>
                {engagementGraphTabContent}
                {moodRatingsTabContent}
                {comInfoTabContent}
            </div>
      );
  }
}

