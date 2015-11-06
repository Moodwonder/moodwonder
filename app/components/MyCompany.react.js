import React from 'react';
// import $ from 'jquery';
//import getFormData from 'get-form-data';
//let LineChart = require("react-chartjs").Line;
let BarChart = require("react-chartjs").Bar;
//import MoodSlider from 'components/MoodSlider.react';
import SurveyActions from 'actions/SurveyActions';
import SurveyStore from 'stores/SurveyStore';
//import Graphdata from 'utils/Graphdata';
import CompanyRatings from 'utils/CompanyRatings';
import CompanyQuickStatistics from 'utils/CompanyQuickStatistics';
import FullStar from 'components/FullStar.react';
import HalfStar from 'components/HalfStar.react';
import BlankStar from 'components/BlankStar.react';
import HalfDaughnut from 'components/HalfDaughnut.react';
import MyCompanyInfo from 'components/MyCompanyInfo.react';

//let chartoptions = {
//    animation: false,
//    bezierCurve: false,
//    datasetFill : false,
//    showScale: true,
//    scaleOverride: true,
//    scaleShowVerticalLines: false,
//    scaleGridLineWidth : 1,
//    scaleSteps: 6,
//    scaleStepWidth: 1,
//    responsive: false,
//    scaleStartValue: 0,
//    scaleShowLabels: true,
//    tooltipTemplate: "<%= value %>"
//};


export default class MyCompany extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          engagementgraphtab: true,
          quickstatisticstab: false,
          companyratingstab: false,
          companyinfotab : false,
          //Start: Quick statistics
          companyedata: [],
          totalcemployees: '',
          loggeduserid: '',
          engagedmanagers: [],
          questions: []
      };
      this.engagementmoods = [];
  }

  componentDidMount() {
      SurveyActions.getCompanyData();
      SurveyActions.getMostEngagingManagers();
      SurveyActions.getEngagementSurvey();
      SurveyStore.listen(this._onChangeData);
  }

  componentWillUnmount() {
      SurveyStore.unlisten(this._onChangeData);
  }

  componentDidUpdate () {
      $('.ui.menu .ui.dropdown').dropdown({
          on: 'click'
      });
  }

  _onChangeData = () => {
      this.setState({
         companyedata: SurveyStore.getState().companyedata,
         totalcemployees: SurveyStore.getState().totalcemployees,
         //loggeduserid: SurveyStore.getState().loggeduserid,
         engagedmanagers: SurveyStore.getState().engagedmanagers,
         questions : SurveyStore.getState().questions
      });

      this.engagementmoods = this.state.questions.map((data, key) => {
          return data.mood;
      });
  }

  engagementGraphClick = (e) => {
      e.preventDefault();
      this.setState({
          engagementgraphtab: true,
          quickstatisticstab : false,
          companyratingstab : false,
          companyinfotab : false
      });
  }

  quickStatisticsClick = (e) => {
      e.preventDefault();
      this.setState({
          engagementgraphtab: false,
          quickstatisticstab : true,
          companyratingstab : false,
          companyinfotab : false
      });
  }

  companyRatingsClick = (e) => {
      e.preventDefault();
      this.setState({
          engagementgraphtab: false,
          quickstatisticstab : false,
          companyratingstab : true,
          companyinfotab : false
      });
  }

  companyInfoClick = (e) => {
      e.preventDefault();
      this.setState({
          engagementgraphtab: false,
          quickstatisticstab : false,
          companyratingstab : false,
          companyinfotab : true
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



  render() {

      let engagementgraphtab = this.state.engagementgraphtab;
      let quickstatisticstab = this.state.quickstatisticstab;
      let companyratingstab = this.state.companyratingstab;
      let companyinfotab = this.state.companyinfotab;
      let companyedata = this.state.companyedata;
      let totalcemployees = this.state.totalcemployees;
      //let loggeduserid = this.state.loggeduserid;
      let engagedmanagers = this.state.engagedmanagers;

      console.log('companyedata');
      console.log(JSON.stringify(companyedata));



      //Start: Quick statistics
      let employeeAtRisk = CompanyQuickStatistics.getEmployeeAtRisk(companyedata);
      let lastMonthResponses = CompanyQuickStatistics.getLastMonthResponses(companyedata);
      let timeSinceLastPost = CompanyQuickStatistics.getTimeSinceLastPosted(companyedata);
      let lastRatings = (CompanyQuickStatistics.getLastRatings(companyedata)).reverse();
      let myCompanyEmployeeEngagement = CompanyQuickStatistics.getCompanyEmployeeEngagement(companyedata);


      let topmanagers;
      if (engagedmanagers.length > 0) {
          topmanagers = engagedmanagers.map((data, index) => {
              let image = "";
              if (index === 0) {
                  image = "assets/images/gold.png";
              } else if (index === 1) {
                  image = "assets/images/silver.png";
              } else if (index === 2) {
                  image = "assets/images/bronge.png";
              }
              return (
                      <div className="ui segment padding-20">
                        {data.name}
                        <span className="badge">
                            <img src={image} alt={data.avg} />
                        </span>
                      </div>
                      );
          });
      } else {
          topmanagers = '';
      }

      let bCount = lastRatings.length - 1;
      let bIndex = 0;
      let bXLabel = [];
      let bYLdata = [];
      for(let data of lastRatings) {
          if(bIndex <= bCount) {
              bXLabel[bIndex] = data.mood;
              bYLdata[bIndex] = data.rating;
          }
          bIndex++;
      }

      let barChartOptions = {
          showScale: true,
          responsive: true,
          scaleOverride: true,
          scaleSteps: 6,
          scaleStepWidth: 1,
          scaleStartValue: 0,
          scaleGridLineWidth : 1,
          scaleLineWidth: 0.5,
          animation: false,
          barShowStroke: true,
          //barValueSpacing : 5
          barDatasetSpacing : 1
      };

      let barchartdata =  barchartdata || {};
      let bardataset = {
            label: "Mood ratings",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: bYLdata
          };

      let bardatasets = [];
      bardatasets.push(bardataset);

      barchartdata.labels = bXLabel;
      barchartdata.datasets = bardatasets;

      let myEngagement = '';
      if (myCompanyEmployeeEngagement > 0) {
          myEngagement = (<HalfDaughnut datatext={myCompanyEmployeeEngagement} />);
      }
      //End: Quick statistics


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
      //End: Engagement Graph

//      let engagementGraphTabContent = '';
//      if (engagementgraphtab) {
//          engagementGraphTabContent = (
//                  <div>
//                    <h3>Engagement Graph</h3>
//                        <div className="form-group">
//                            <label> Moodwonder trend</label>
//                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
//                            <label>Show me</label>
//                            <select name="graphengagement" >
//                                <option value="mw_index">MW-Index</option>
//                                {moodoptions}
//                            </select>
//                            <br/><br/>
//                            <span>At Start - </span>
//                            <br/><br/>
//
//                        </div>
//                  </div>
//          );
//      }

      let engagementGraphTabContent = '';
      if (engagementgraphtab) {
          engagementGraphTabContent = (
                <div className="ui bottom attached segment brdr-none menu minus-margin-top ">
                    <div className="ui bottom attached segment brdr-none menu">
                        <div className="ui  column stackable grid container">
                            <div className="column  brdr-none padding-none">
                                <div className="ui segment brdr-none padding-none ">
                                    <div className=" right menu mobile">
                                        <select className="ui search dropdown graphengagement" name="graphengagement">
                                            <option value="mw_index">MW-Index</option>
                                            {moodoptions}
                                        </select>
                                    </div>
                                    <div className="clear"></div>
                                    <div className="graph">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          );
      }

      let moodRatingsTabContent = '';
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

      let quickStatisticsTabContent = '';
      if (quickstatisticstab) {

          quickStatisticsTabContent = (
                <div className="ui bottom attached segment brdr-none menu minus-margin-top">
                    <div className="ui segment brdr-none padding-none width-rating">
                        <div className="clear"></div>
                        <div className="ui three column stackable grid ">
                            <div className="column ">
                                <div className="ui segment brdr">
                                    <h2>Number of employees</h2>
                                    {totalcemployees}
                                </div>
                            </div>
                            <div className="column ">
                                <div className="ui segment brdr">
                                    <h2>Employees at risk of leaving</h2>
                                    {employeeAtRisk + ' out of ' + totalcemployees}
                                </div>
                            </div>
                            <div className="column ">
                                <div className="ui segment brdr">
                                    <h2>Number of responses (last 1 month)</h2>
                                    {lastMonthResponses + ' Response(s) submitted'}
                                </div>
                            </div>
                            <div className="column ">
                                <div className="ui segment brdr">
                                    <h2>Time since last response</h2>
                                    {timeSinceLastPost}
                                </div>
                            </div>
                            <div className="column ">
                                <div className="ui segment brdr">
                                    <h2>Employee average Engagement</h2>
                                    {myEngagement}
                                </div>
                            </div>
                            <div className="column">
                                <div className="ui segment brdr">
                                    <h2>Most engaging manager</h2>
                                    {topmanagers}
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>
                        <div className="ui three column stackable grid ">
                            <BarChart data={barchartdata} options={barChartOptions} width="800" height="300" redraw/>
                        </div>
                    </div>
                </div>
          );
      }


      let display = (companyinfotab) ? 'block': 'none' ;

      return (
            <div>
                <div className="ui tabular menu tab four column">
                    <a className="item mobile active column" onClick={this.engagementGraphClick} href="#"> Engagement Graph </a>
                    <a className="item mobile column" onClick={this.quickStatisticsClick} href="#"> Quick Statistics </a>
                    <a className="item mobile column" onClick={this.companyRatingsClick} href="#"> Company Ratings </a>
                    <a className="item mobile column" onClick={this.companyInfoClick} href="#"> Company Info </a>
                </div>
                <br/><br/>
                {engagementGraphTabContent}
                {quickStatisticsTabContent}
                {moodRatingsTabContent}
                <div style={{display: display}}><MyCompanyInfo/></div>
            </div>
    );
  }
}

