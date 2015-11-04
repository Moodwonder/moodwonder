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



  render() {

      let engagementgraphtab = this.state.engagementgraphtab;
      let quickstatisticstab = this.state.quickstatisticstab;
      let companyratingstab = this.state.companyratingstab;
      let companyinfotab = this.state.companyinfotab;
      let companyedata = this.state.companyedata;
      let totalcemployees = this.state.totalcemployees;
      //let loggeduserid = this.state.loggeduserid;
      let engagedmanagers = this.state.engagedmanagers;

      //console.log('companyedata');
      //console.log(JSON.stringify(companyedata));



      //Start: Quick statistics
      let employeeAtRisk = CompanyQuickStatistics.getEmployeeAtRisk(companyedata);
      let lastMonthResponses = CompanyQuickStatistics.getLastMonthResponses(companyedata);
      let timeSinceLastPost = CompanyQuickStatistics.getTimeSinceLastPosted(companyedata);
      let lastRatings = (CompanyQuickStatistics.getLastRatings(companyedata)).reverse();
      let myCompanyEmployeeEngagement = CompanyQuickStatistics.getCompanyEmployeeEngagement(companyedata);


      let topmanagers;
      if (engagedmanagers.length > 0) {
          topmanagers = engagedmanagers.map((data, index) => {
              return (<span className="styled">
                    <label>{index+1} : {data.name + "  ["  + data.avg + "]"}</label>
                    <br/>
                  </span>);
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
      //End: Quick statistics


      //Start : CompanyRatings
      let topThreeAreas = CompanyRatings.getTopThreeAreas(companyedata);
      let worstThreeAreas = CompanyRatings.getWorstThreeAreas(companyedata);
      let improvedAreas = CompanyRatings.getCompanyMostImprovedAreas(companyedata);
      let worstAreas = CompanyRatings.getCompanyWorstImprovedAreas(companyedata);

      let topthree = topThreeAreas.map((data, key) => {
          return (<span>
                    {data.mood} : <meter min="-5" max="5" low="1" high="3.7" value={data.avg}></meter>
                    <label>{data.avg}</label>
                    <br/>
                  </span>);
      });

      let worstthree = worstThreeAreas.map((data, key) => {
          return (<span>
                    {data.mood} : <meter min="-5" max="5" low="1" high="3.7" value={data.avg}></meter>
                    <label>{data.avg}</label>
                    <br/>
                  </span>);
      });

      let improvedareas = improvedAreas.map((data, key) => {
          return (<span>
                    {data.mood} : <meter min="-5" max="5" low="1" high="3.7" value={data.avg}></meter>
                    <label>{data.avg}</label>
                    <br/>
                  </span>);
      });

      let worstareas = worstAreas.map((data, key) => {
          return (<span>
                    {data.mood} : <meter min="-5" max="5" low="1" high="3.7" value={data.avg}></meter>
                    <label>{data.avg}</label>
                    <br/>
                  </span>);
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
               <div>
                   <h3>Company Ratings</h3>
                   <div>
                        <div>
                            <h4>Company Top 3 areas</h4>
                            {topthree}
                        </div>
                        <br/>
                        <div>
                            <h4>Company Worst 3 areas</h4>
                            {worstthree}
                        </div>
                        <br/>
                        <div>
                            <h4>Company - Most Improved Areas (Last 1 Month)</h4>
                            {improvedareas}
                        </div>
                        <br/>
                        <div>
                            <h4>Company - Least Improved Areas (Last 1 Month)</h4>
                            {worstareas}
                        </div>
                        <br/>
                        <div>
                            <h4>My Company Vs Companies (Country)</h4>
                        </div>
                        <br/>
                        <div>
                            <h4>My Company Vs Companies (Industry)</h4>
                        </div>
                        <br/>
                        <div>
                            <h4>Subordinates Vs Companies (Country)</h4>
                        </div>
                        <br/>
                        <div>
                            <h4>Subordinates Vs Companies (Industry)</h4>
                        </div>
                        <br/>
                        <div>
                            <h4>Subordinates - Most Improved Areas (Last 1 Month)</h4>
                        </div>
                        <br/>
                        <div>
                            <h4>Subordinates - Least Improved Areas (Last 1 Month)</h4>
                        </div>
                        <br/>
                    </div>
               </div>
          );
      }

      let quickStatisticsTabContent = '';
      if (quickstatisticstab) {
          quickStatisticsTabContent = (
              <div>
                  <h3>Quick Statistics</h3>
                  <div>
                    <label>Number of employees</label>
                    <br/>
                    {totalcemployees}
                  </div>
                  <br/>
                  <div>
                    <label>Employees at risk of leaving</label>
                    <br/>
                    {employeeAtRisk + ' out of ' + totalcemployees}
                  </div>
                  <br/>
                  <div>
                    <label>Number of responses (last 1 month)</label>
                    <br/>
                    {lastMonthResponses + ' Response(s) submitted'}
                  </div>
                  <br/>
                  <div>
                    <label>Time since last response</label>
                    <br/>
                    {timeSinceLastPost}
                  </div>
                  <br/>
                  <div>
                    <label>My company's employee engagement</label>
                    <br/>
                    {myCompanyEmployeeEngagement}
                  </div>
                  <br/>
                  <div>
                    <label>The most engaging managers</label>
                    <br/>
                    {topmanagers}
                  </div>
                  <br/>
                  <div>
                    <label>Comparison of responses within my company</label>
                    <br/>
                    <BarChart data={barchartdata} options={barChartOptions} width="600" height="300" redraw/>
                  </div>
                  <br/>
              </div>
          );
      }


      let companyInfoTabContent = '';
      if (companyinfotab) {
          companyInfoTabContent = (
              <div>
                  <h3>Company Info</h3>
                  <div>
                    <label>Number of employees</label>
                    <br/>
                  </div>
              </div>
          );
      }


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
                {companyInfoTabContent}
            </div>
    );
  }
}

