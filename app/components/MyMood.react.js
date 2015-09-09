import React from 'react';
// import $ from 'jquery';
import getFormData from 'get-form-data';
import MoodActions from 'actions/MoodActions';
import MoodStore from 'stores/MoodStore';
import Submenu from 'components/Submenu.react';
let LineChart = require("react-chartjs").Line;


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
          moodrate: '',
          moods: [],
          popup: false
      };
  }

  componentDidMount() {
      let form = document.querySelector('#moodRating');
      let data = getFormData(form, {trim: true});
      let moodrate = data['moodrate'];
      this.setState({moodrate: moodrate});
      //MoodActions.getMyMoods('559f8d6601c08d2c1d25f448');
      MoodActions.getMyMoods();
      MoodStore.listen(this._onChange);
  }

  componentWillUnmount() {
      MoodStore.unlisten(this._onChange);
  }

  _onChange = () => {
      this.setState({
         moods : MoodStore.getState().moods
      });
  }

  onSubmitMood = (e) => {
      e.preventDefault();
      let form = document.querySelector('#moodRating');
      let data = getFormData(form, {trim: true});

      let commentForm = document.querySelector('#commentForm');
      let commentData = getFormData(commentForm, {trim: true});

      let moodrate = data['moodrate'];

      let mood = mood || {};
      mood.rating = moodrate;
      //mood.user_id = '559f8d6601c08d2c1d25f448';
      mood.title = commentData['title'];
      mood.description = commentData['description'];
      MoodActions.addMood(mood);
      this.setState({ popup : false });
  }

  onChangeMood = (e) => {
      e.preventDefault();
      let moodrate = e.target.value;
      this.setState({moodrate: moodrate});
  }

  onPopupClose = (e) => {
      e.preventDefault();
      this.setState({ popup : false });
  }

  onPopupShow = (e) => {
      e.preventDefault();
      this.setState({ popup : true });
  }


  render() {
      let moodrate = this.state.moodrate;
      let moods = this.state.moods;
      let popup = this.state.popup;
      let xlabel = [];
      let ydata = [];
      let lastMood = lastMood || {};

      let i = moods.length - 1;
      for(let mood of moods) {
          if(i >= 0) {
              xlabel[i] = mood.datetime;
              ydata[i] = mood.rating;
          }

          if (i === (moods.length - 1)) {
              lastMood.rating = mood.rating;
              lastMood.datetime = mood.datetime;
          }

          i--;
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
            label: "Second Dataset",
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

      let lastRated = '';
      if(lastMood.rating) {
          lastRated = (<span>Last rated {lastMood.rating}</span>);
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
                                        <select name="title">
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
                                        <textarea name="description" id="description" placeholder="How would you improve employee engagement?"></textarea>
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


      return (
       <div className="container">
            <Submenu />
               <br/>
               {modal}
                <form id="moodRating">
                  <div className="form-group">
                    <label>Rate your mood</label>
                     <input type="range" id="moodrate" name="moodrate" max="5" min="1" defaultValue="3.7" step="0.1" title={moodrate} onChange={this.onChangeMood} />
                     <label>{moodrate}</label>
                     <br/>
                     {lastRated}
                  </div>
                  <br/>
                  <div className="form-group">
                    <button className="btn btn-primary" onClick={this.onPopupShow}>Submit</button>
                  </div>
                </form>
                <br/><br/>
                <div className="form-group">
                    <label> Moodwonder trend</label>
                    <br/><br/>
                    <LineChart data={chartdata} options={chartoptions} width="600" height="250" redraw/>
                </div>
          </div>
    );
  }
}

