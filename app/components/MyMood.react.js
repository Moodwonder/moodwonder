import React from 'react';
// import $ from 'jquery';
import getFormData from 'get-form-data';
import Submenu from 'components/Submenu.react';
let LineChart = require("react-chartjs").Line;
let BarChart = require("react-chartjs").Bar;
import MoodSlider from 'components/MoodSlider.react';
import SurveyActions from 'actions/SurveyActions';
import SurveyStore from 'stores/SurveyStore';
import Graphdata from 'utils/Graphdata';
import MoodRatings from 'utils/MoodRatings';
import QuickStatistics from 'utils/QuickStatistics';


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
    responsive: false,
    scaleStartValue: 0,
    scaleShowLabels: true,
    tooltipTemplate: "<%= value %>"
    // multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
    // scaleLineColor: 'black'
};

LineChart.prototype.titles = [];


export default class MyMood extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          popup: false,
          questions: [],
          surveyresults: [],
          lastsurvey: [],
          lastmood: [],
          graphperiod: 'all_time',
          graphengagement: 'mw_index',
          engagementgraphtab: true,
          quickstatisticstab: false,
          moodratingstab: false,
          companysurvey: [],
          industrysurvey: [],
          countrysurvey: [],
          currentuserid: ''
      };
      this.engagementmoods = [];
  }

  componentDidMount() {
      SurveyActions.getEngagementSurvey();
      SurveyActions.getEngagementResults();
      SurveyActions.getResultsByCompany();
      SurveyActions.getResultsByIndustry();
      SurveyActions.getResultsByCountry();
      SurveyStore.listen(this._onMoodChange);
  }

  componentWillUnmount() {
      SurveyStore.unlisten(this._onMoodChange);
  }

  _onMoodChange = () => {
      this.setState({
         questions : SurveyStore.getState().questions,
         surveyresults: SurveyStore.getState().surveyresults,
         companysurvey: SurveyStore.getState().companysurvey,
         industrysurvey: SurveyStore.getState().industrysurvey,
         countrysurvey: SurveyStore.getState().countrysurvey,
         currentuserid: SurveyStore.getState().currentuserid,
         lastmood: SurveyStore.getState().lastmood
      });

      this.engagementmoods = this.state.questions.map((data, key) => {
          return data.mood;
      });
  }

  onSubmitMood = (e) => {
      e.preventDefault();
      let form = document.querySelector('#moodRating');
      let data = getFormData(form, {trim: true});

      let commentForm = document.querySelector('#commentForm');
      let commentData = getFormData(commentForm, {trim: true});

      let moodrate = data['moodrate'];
      let surveyResult = [];

      surveyResult = this.engagementmoods.map((data, key) => {
          let mood = mood || {};
          mood.rating = moodrate;
          mood.comment_title = commentData['comment_title'];
          mood.comment = commentData['comment'];
          mood.mood = data;
          return mood;
      });

      SurveyActions.saveEngagementSurvey(surveyResult);
      this.setState({ popup : false });
      SurveyActions.getEngagementResults();
  }

  onPopupClose = (e) => {
      e.preventDefault();
      this.setState({ popup : false });
  }

  onPopupShow = (e) => {
      e.preventDefault();
      this.setState({ popup : true });
  }

  onChangeGraphPeriod = (e) => {
      e.preventDefault();
      let graphperiod = e.target.value;
      this.setState({ graphperiod : graphperiod });
  }

  onChangeGraphEngagement = (e) => {
      e.preventDefault();
      let graphengagement = e.target.value;
      this.setState({ graphengagement : graphengagement });
  }

  engagementGraphClick = (e) => {
      e.preventDefault();
      this.setState({
          engagementgraphtab: true,
          quickstatisticstab : false,
          moodratingstab : false
      });
  }

  quickStatisticsClick = (e) => {
      e.preventDefault();
      this.setState({
          engagementgraphtab: false,
          quickstatisticstab : true,
          moodratingstab : false
      });
  }

  moodRatingsClick = (e) => {
      e.preventDefault();
      this.setState({
          engagementgraphtab: false,
          quickstatisticstab : false,
          moodratingstab : true
      });
  }



  render() {
      let popup = this.state.popup;
      let surveyresults = this.state.surveyresults;
      //let lastMood = (typeof this.state.lastmood !== null) ? this.state.lastmood : null;
      let lastMood = (this.state.lastmood) ? this.state.lastmood : null;
      let graphperiod = this.state.graphperiod;
      let graphengagement = this.state.graphengagement;
      let engagementgraphtab = this.state.engagementgraphtab;
      let quickstatisticstab = this.state.quickstatisticstab;
      let moodratingstab = this.state.moodratingstab;
      let companysurvey = this.state.companysurvey;
      let industrysurvey = this.state.industrysurvey;
      let countrysurvey = this.state.countrysurvey;
      let currentuserid = this.state.currentuserid;

      //console.log('currentuserid');
      //console.log(currentuserid);
      console.log('companysurvey');
      //console.log(JSON.stringify(companysurvey));

      let xlabel = [];
      let ydata = [];
      let yMoodData = [];

      // Start : Rate your mood
      let engagementmoods = this.engagementmoods;
      let moodoptions = '';
      moodoptions = engagementmoods.map((data, key) => {
          return (<option value={data}>{data}</option>);
      });
      // End : Rate your mood


      let moodGraph = Graphdata.getEngagementGraphData(graphperiod, 'Mood', surveyresults);
      let graphData = Graphdata.getEngagementGraphData(graphperiod, graphengagement, surveyresults);
      let engagementStatitics = Graphdata.getEngagementStatitics(graphperiod, graphengagement, surveyresults);

      // Start : MoodRatings
      let topThreeAreas = MoodRatings.getTopThreeAreas(surveyresults);
      let worstThreeAreas = MoodRatings.getWorstThreeAreas(surveyresults);
      let improvedAreas = MoodRatings.getMostImprovedAreas(surveyresults);
      let worstAreas = MoodRatings.getWorstImprovedAreas(surveyresults);
      let topThreeVsCompany = MoodRatings.getAreasVsCompany(companysurvey, currentuserid, '_TOP');
      let worstThreeVsCompany = MoodRatings.getAreasVsCompany(companysurvey, currentuserid, '_WORST');
      let meVsIndustry = MoodRatings.getMeVsIndustry(industrysurvey, currentuserid);
      let meVsCountry = MoodRatings.getMeVsCountry(countrysurvey, currentuserid);

      let topthree = topThreeAreas.map((data, key) => {
          return (<span className="styled">
                    {data.mood} : <meter min="-5" max="5" low="1" high="3.7" value={data.rating}></meter>
                    <label>{data.rating}</label>
                    <br/>
                  </span>);
      });

      let worstthree = worstThreeAreas.map((data, key) => {
          return (<span className="styled">
                    {data.mood} : <meter min="-5" max="5" low="1" high="3.7" value={data.rating}></meter>
                    <label>{data.rating}</label>
                    <br/>
                  </span>);
      });

      let improvedareas = improvedAreas.map((data, key) => {
          return (<span className="styled">
                    {data.mood} : <meter min="-5" max="5" low="1" high="3.7" value={data.difference}></meter>
                    <label>{data.difference}</label>
                    <br/>
                  </span>);
      });

      let worstareas = worstAreas.map((data, key) => {
          return (<span className="styled">
                    {data.mood} : <meter min="-5" max="5" low="1" high="3.7" value={data.difference}></meter>
                    <label>{data.difference}</label>
                    <br/>
                  </span>);
      });

      let worstthreevscompany;
      if(worstThreeVsCompany.length > 0) {
          worstthreevscompany = worstThreeVsCompany.map((data, key) => {
              return (<span className="styled">
                    {data.mood} : <meter min="-5" max="5" low="1" high="3.7" value={data.avg}></meter>
                    <label>{data.avg}</label>
                    <br/>
                  </span>);
          });
      } else {
          worstthreevscompany = 'You don\'t have any worst areas.';
      }

      let topthreevscompany;
      if(topThreeVsCompany.length > 0) {
          topthreevscompany = topThreeVsCompany.map((data, key) => {
              return (<span className="styled">
                      {data.mood} : <meter min="-5" max="5" low="1" high="3.7" value={data.avg}></meter>
                      <label>{data.avg}</label>
                      <br/>
                    </span>);
          });
      } else {
          topthreevscompany = 'You don\'t have any higher areas.';
      }

      let mevsindustry;
      if (meVsIndustry.length > 0) {
          mevsindustry = meVsIndustry.map((data, key) => {
              return (<span className="styled">
                    {data.mood} : <meter min="-5" max="5" low="1" high="3.7" value={data.diff}></meter>
                    <label>{data.diff}</label>
                    <br/>
                  </span>);
          });
      } else {
          mevsindustry = 'No data available.';
      }

      let mevscountry;
      if (meVsCountry.length > 0) {
          mevscountry  = meVsCountry.map((data, key) => {
              return (<span className="styled">
                    {data.mood} : <meter min="-5" max="5" low="1" high="3.7" value={data.diff}></meter>
                    <label>{data.diff}</label>
                    <br/>
                  </span>);
          });
      } else {
          mevscountry = 'No data available. Please add team members in your company';
      }
      // End : MoodRatings

      // Start : Quick Statistics
      let lastRatings = (QuickStatistics.getLastRatings(surveyresults)).reverse();
      let totalEmployees = QuickStatistics.getTotalEmployees(companysurvey);
      let lastMonthResponses = QuickStatistics.getLastMonthResponses(companysurvey);
      let myEmployeeEngagement = QuickStatistics.getMyEmployeeEngagement(companysurvey, currentuserid);
      let employeeAtRisk = QuickStatistics.getEmployeeAtRisk(companysurvey);


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
      // End : Quick Statistics


      // Start : Engagement Graph
      let count = graphData.length - 1;
      let index = 0;
      for(let data of graphData) {
          if(index <= count) {
              xlabel[index] = data.created.d;
              ydata[index] = data.rating;
          }
          index++;
      }

      let mIndex = 0;
      for(let mood of moodGraph) {
          if(mIndex <= count) {
              yMoodData[mIndex] = mood.rating;
          }
          mIndex++;
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

      let mooddata = {
            label: "Second Dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(200,127,105,1)",
            pointColor: "rgba(200,127,105,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: yMoodData
          };

      let datasets = [];
      datasets.push(data);
      datasets.push(mooddata);

      chartdata.labels = xlabel;
      chartdata.datasets = datasets;
      // End : Engagement Graph


      let lastRated = '';
      if(lastMood !== null) {
          lastRated = lastMood.rating;
      }

      let modal = '';
      if (popup) {
          modal = (
              <div className="modal fade in cmodal-show" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={this.onPopupClose} data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">What has changed?</h4>
                            </div>
                            <div className="modal-body">
                                <form id="commentForm">
                                    <div className="form-group">
                                        <select name="comment_title">
                                            <option value="">What happened...?</option>
                                            <optgroup label="Company, Strategy &amp; Values">
                                                <option value="63">Company event organized</option>
                                                <option value="64">New executive level manager started</option>
                                                <option value="65">Top executive left the company</option>
                                                <option value="66">Strategy changed</option>
                                                <option value="67">Strategy is not followed</option>
                                                <option value="68">Strategy is failing</option>
                                                <option value="69">Do not believe in our strategy</option>
                                                <option value="70">Values are not in use</option>
                                            </optgroup>
                                            <optgroup label="Daily work &amp; Tasks">
                                                <option value="38">Got recognition</option>
                                                <option value="39">Got promotion</option>
                                                <option value="40">Got raise</option>
                                                <option value="41">Feedback received</option>
                                                <option value="42">Targets achieved</option>
                                                <option value="43">Project success</option>
                                                <option value="44">Good project progress</option>
                                                <option value="45">Achieved a lot today</option>
                                                <option value="46">New tasks received</option>
                                                <option value="47">New targets agreed</option>
                                                <option value="48">Changes in job description</option>
                                                <option value="49">Changes in job title</option>
                                                <option value="50">Work related trip</option>
                                                <option value="51">Conference trip</option>
                                                <option value="52">Training confirmed</option>
                                                <option value="53">Training attended</option>
                                                <option value="54">Voluntary work done</option>
                                                <option value="55">Made a mistake at work</option>
                                                <option value="56">I am sick</option>
                                                <option value="57">My child is sick</option>
                                            </optgroup>
                                            <optgroup label="My colleagues and team">
                                                <option value="60">New colleague joined team</option>
                                                <option value="61">Team event organized</option>
                                                <option value="62">Colleague is leaving the company</option>
                                            </optgroup>
                                            <optgroup label="My manager">
                                                <option value="58">New boss</option>
                                                <option value="59">Discussion with boss</option>
                                            </optgroup>
                                        </select>
                                        <br/>
                                        <textarea name="comment" id="comment" placeholder="How would you improve employee engagement?"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={this.onSubmitMood}>Submit</button>
                                <button type="button" onClick={this.onPopupClose} className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
              </div>
            );
      }

      let engagementGraphTabContent = '';
      if (engagementgraphtab) {
          engagementGraphTabContent = (
                  <div>
                    <h3>Engagement Graph</h3>
                        <div className="form-group">
                            <label> Moodwonder trend</label>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <label>Show me</label>
                            <select name="graphperiod" onChange={this.onChangeGraphPeriod} value={graphperiod}>
                                <option value="all_time">All time</option>
                                <option value="last_12_months">Last 12 months</option>
                                <option value="last_6_ months">Last 6 months</option>
                                <option value="last_3_months">Last 3 months</option>
                                <option value="last_month">Last month</option>
                            </select>
                            <span>&nbsp;&nbsp;</span>
                            <label>from</label>
                            <select name="graphengagement" onChange={this.onChangeGraphEngagement} value={graphengagement}>
                                <option value="mw_index">MW-Index</option>
                                {moodoptions}
                            </select>
                            <br/><br/>
                            <span>At Start - {engagementStatitics.start}</span>
                            <br/>
                            <span>Highest - {engagementStatitics.highest}</span>
                            <br/>
                            <span>Lowest - {engagementStatitics.lowest}</span>
                            <br/>
                            <span>Current - {engagementStatitics.current}</span>
                            <br/>
                            <span>30 Days change : {engagementStatitics.thirtydayschange}</span>
                            <br/>
                            <span>Week change : {engagementStatitics.weekchange}</span>
                            <br/><br/>
                            <LineChart data={chartdata} options={chartoptions} width="600" height="250" redraw/>
                        </div>
                  </div>
          );
      }

      let moodRatingsTabContent = '';
      if (moodratingstab) {
          moodRatingsTabContent = (
               <div>
                   <h3>Mood Ratings</h3>
                   <div>
                        <div>
                            <h4>My Top 3 areas</h4>
                            {topthree}
                        </div>
                        <br/>
                        <div>
                            <h4>My Worst 3 areas</h4>
                            {worstthree}
                        </div>
                        <br/>
                        <div>
                            <h4>My Most Improved Areas (Last 1 Month)</h4>
                            {improvedareas}
                        </div>
                        <br/>
                        <div>
                            <h4>My least improved areas (Last 1 Month)</h4>
                            {worstareas}
                        </div>
                        <br/>
                        <div>
                            <h4>Top 3 areas higher than company average</h4>
                            {topthreevscompany}
                        </div>
                        <br/>
                        <div>
                            <h4>Worst 3 areas lower than company average</h4>
                            {worstthreevscompany}
                        </div>
                        <br/>
                        <div>
                            <h4>Me Vs Companies (Industry)</h4>
                            {mevsindustry}
                        </div>
                        <br/>
                        <div>
                            <h4>Me Vs Companies (Country)</h4>
                            {mevscountry}
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
                    {totalEmployees + ' Employees'}
                  </div>
                  <br/>
                  <div>
                    <label>Number of responses (last 1 month)</label>
                    <br/>
                    {lastMonthResponses + ' Response(s) submitted'}
                  </div>
                  <br/>
                  <div>
                    <label>My employee engagement</label>
                    <br/>
                    {myEmployeeEngagement}
                  </div>
                  <br/>
                  <div>
                    <label>Employees at risk of leaving</label>
                    <br/>
                    {employeeAtRisk + ' out of ' + totalEmployees}
                  </div>
                  <br/>
                  <div>
                    <label>Comparison of my responses</label>
                    <br/>
                    <BarChart data={barchartdata} options={barChartOptions} width="600" height="300" redraw/>
                  </div>
                  <br/>
              </div>
          );
      }


      return (
       <div className="container">
            <Submenu />
               {modal}
               <form id="moodRating">
                  <div className="form-group">
                    <label>Rate your mood</label>
                    <MoodSlider lastrated={lastRated} />
                  </div>
                  <br/>
                  <div className="form-group">
                    <button className="btn btn-primary" onClick={this.onPopupShow}>Submit</button>
                  </div>
               </form>
               <br/><br/>
               <div>
                   <a href="#" onClick={this.engagementGraphClick}>Engagement Graph</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                   <a href="#" onClick={this.quickStatisticsClick}>Quick Statistics</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                   <a href="#" onClick={this.moodRatingsClick}>Mood Ratings</a>
               </div>
                <br/><br/>
                {engagementGraphTabContent}
                {quickStatisticsTabContent}
                {moodRatingsTabContent}
          </div>
    );
  }
}

