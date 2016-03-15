require('react-date-picker/base.css');
require('react-date-picker/theme/hackerone.css');
import React from 'react';
import Question from 'components/customsurvey/Question.react';
import getFormData from 'get-form-data';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import CustomSurveyStore from 'stores/CustomSurveyStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import Submenu from 'components/Submenu.react';
import DatePicker from 'react-date-picker';

export default class Customsurvey extends React.Component {

    constructor(props) {
        super(props);
        mixins(Navigation, this);
        this.state = CustomSurveyStore.getState();
        this.state = {
            qIndex: 1,
            questions: ['q1'],
            radio: [],
            rIndex: 1,
            checkbox: [],
            cIndex: 1,
            textbox: [],
            tIndex: 1,
            textarea: [],
            txIndex: 1,
            formstatus: false,
            freezedate: '',
            today: '',
            organization: []
        };
    }

    componentDidMount() {
        let today = new Date();
        let yToday = today.getFullYear();
        let mToday = ('0' + (today.getMonth() + 1)).slice(-2);
        let dToday = ('0' + today.getDate()).slice(-2);
        today = yToday + '-' + mToday + '-' + dToday;

        CustomSurveyActions.getOrganization();
        CustomSurveyStore.listen(this._onChange);
        this.setState({formstatus: false});
        this.setState({freezedate: today});
        this.setState({today: today});
    }

    componentWillUnmount() {
        this.setState({qIndex: this.state.qIndex + 1});
        CustomSurveyStore.unlisten(this._onChange);
    }

    _onChange = () => {
        this.setState({
            isSurveySaved: CustomSurveyStore.getState().isSurveySaved,
            organization: CustomSurveyStore.getState().organization
        });
    }

    onFormListsClick = (e) => {
        e.preventDefault();
        this.context.router.transitionTo('/surveyforms');
    }

    onSurveyClick = (e) => {
        e.preventDefault();
        this.context.router.transitionTo('/takesurvey');
    }

    onSurveySubmit = (e) => {
        e.preventDefault();
        let form = document.querySelector('#surveyForm');
        let data = getFormData(form, {trim: true});
        let question = this.state.questions;
        let survey = survey || {};

        survey.surveytitle = data['surveytitle'];
        survey.freezedate = data['freezedate'];
        survey.targetgroup = data['targetgroup'];
        if(survey.targetgroup === 'organization') {
            survey.target_teamid = data['target_teamid'];
        } else {
            survey.targetlevel = data['targetlevel'];
            survey.targetvalue = data['targetvalue'];
        }

        survey.questions = [];
        let keys = Object.keys(data);

        for(let qid of question){
            let id = qid.replace('q', '');
            let qTemp = {};

            qTemp.question = data['question_' + qid];
            qTemp.question_id = id;
            qTemp.answertype = data['answertype_' + qid];
            qTemp.answers = [];

            let rString = qid + 'r';
            let cString = qid + 'c';
            let tString = qid + 'te';
            let txString = qid + 'tx';

            for (let key of keys) {
                let aTemp = {};
                if((key.search(rString) !== -1) || (key.search(cString) !== -1))
                {
                    aTemp.option = data[key][0];
                    qTemp.answers.push(aTemp);
                }
                if((key.search(tString) !== -1) || (key.search(txString) !== -1))
                {
                    aTemp.option = '';
                    qTemp.answers.push(aTemp);
                }
            }

            survey.questions.push(qTemp);
        }

        //Start: Form validation
        let errorFlag = false;
        if (survey.surveytitle === '' || survey.surveytitle === null) {

            alert('Please enter survey title.');
            errorFlag = true;

        } else if (survey.targetgroup === 'organization' && (survey.target_teamid === '' || survey.target_teamid === '0')) {

            alert('Please create a team or add your company first.');
            errorFlag = true;

        } else if (survey.targetgroup === 'survey' && (survey.targetvalue === '' || survey.targetvalue === null)) {

            alert('Please enter survey percentage.');
            errorFlag = true;

        } else {

            for(let qid of question){
                let id = qid.replace('q', '');
                if(data['question_' + qid] === '' || data['question_' + qid] === null) {

                    alert('Please enter question ' + id);
                    errorFlag = true;
                    break;

                } else if(data['answertype_' + qid] === '0') {

                    alert('Please choose an answer type for question ' + id);
                    errorFlag = true;
                    break;

                } else if(data['answertype_' + qid] === 'radio') {

                    let rString = qid + 'r';
                    for (let key of keys) {
                        if((key.search(rString) !== -1))
                        {
                            if (data[key][0] === '' || data[key][0] === null) {
                                alert('Radio option empty for question ' + id);
                                errorFlag = true;
                                break;
                            }
                        }
                    }

                } else if(data['answertype_' + qid] === 'checkbox') {

                    let cString = qid + 'c';
                    for (let key of keys) {
                        if((key.search(cString) !== -1))
                        {
                            if (data[key][0] === '' || data[key][0] === null) {
                                alert('Checkbox option empty for question ' + id);
                                errorFlag = true;
                                break;
                            }
                        }
                    }
                }
            }

        }
        //End: Form validation

        if(!errorFlag) {
            if (window.confirm('Please review the survey, once posted it cannot be edited.')) {
                CustomSurveyActions.createCustomSurveyForm(survey);
                this.setState({formstatus: true});
            }
        }
    }

    onAddQuestion = (e) => {
        e.preventDefault();
        let qIndex = parseInt(this.state.qIndex);
        let questions = this.state.questions;
        qIndex++;
        questions.push('q' + qIndex);
        this.setState({qIndex: qIndex});
        this.setState({questions: questions});
    }

    onRemoveQuestion = (child) => {
        let qid = child.props.qid;
        let questions = this.state.questions;
        let key = questions.indexOf(qid);
        if(key !== -1) {
            questions.splice(key, 1);
        }
        this.setState({questions: questions});
    }

    onAddRadioOption = (e, child) => {
        let rIndex = parseInt(this.state.rIndex);
        let qid = child.props.qid;
        let radio = this.state.radio;
        rIndex++;
        radio.push(qid + 'r' + rIndex);
        this.setState({rIndex: rIndex});
        this.setState({radio: radio});
    }

    onRemoveRadioOption = (e, child) => {
        let rid = child.props.rid;
        let radio = this.state.radio;
        let key = radio.indexOf(rid);
        if(key !== -1) {
            radio.splice(key, 1);
        }
        this.setState({radio: radio});
    }

    onAddCheckboxOption = (e, child) => {
        let cIndex = parseInt(this.state.cIndex);
        let qid = child.props.qid;
        let checkbox = this.state.checkbox;
        cIndex++;
        checkbox.push(qid + 'c' + cIndex);
        this.setState({cIndex: cIndex});
        this.setState({checkbox: checkbox});
    }

    onRemoveCheckboxOption = (e, child) => {
        let cid = child.props.cid;
        let checkbox = this.state.checkbox;
        let key = checkbox.indexOf(cid);
        if(key !== -1) {
            checkbox.splice(key, 1);
        }
        this.setState({checkbox: checkbox});
    }

    changeHandler = (key, attr, event) => {
        let state = {};
        state[key] = this.state[key] || {};
        state[key][attr] = event.currentTarget.value;
        this.setState(state);
    };

    onDateChange = (e) => {
        this.setState({freezedate: e});
    };

    onSelectAnswerType = (e, child) => {
        let qid = child.props.qid;
        let answerType = e.target.value;

        let radio = this.state.radio;
        let checkbox = this.state.checkbox;
        let textbox = this.state.textbox;
        let textarea = this.state.textarea;

        // Radio - Clear all the previous states against qustion id.
        let rClear = [];
        for(let item of radio){
            if(item.search(qid) !== -1) {
                rClear.push(item);
            }
        }
        for(let item of rClear){
            radio.splice(radio.indexOf(item), 1);
        }
        this.setState({radio: radio});

        // Checkbox - Clear all the previous states against qustion id.
        let cClear = [];
        for(let item of checkbox){
            if(item.search(qid) !== -1) {
                cClear.push(item);
            }
        }
        for(let item of cClear){
            checkbox.splice(checkbox.indexOf(item), 1);
        }
        this.setState({checkbox: checkbox});

        // Textbox - Clear all the previous states against qustion id.
        let tClear = [];
        for(let item of textbox){
            if(item.search(qid) !== -1) {
                tClear.push(item);
            }
        }
        for(let item of tClear){
            textbox.splice(textbox.indexOf(item), 1);
        }
        this.setState({textbox: textbox});

        // Textarea - Clear all the previous states against qustion id.
        let txClear = [];
        for(let item of textarea){
            if(item.search(qid) !== -1) {
                txClear.push(item);
            }
        }
        for(let item of txClear){
            textarea.splice(textarea.indexOf(item), 1);
        }
        this.setState({textarea: textarea});

        let aid = '';

        switch(answerType){
        case 'radio':
            aid = qid + 'r1';
            let nRadio = this.state.radio;
            nRadio.push(aid);
            this.setState({radio: nRadio});
            break;
        case 'checkbox':
            aid = qid + 'c1';
            let nCheckbox = this.state.checkbox;
            nCheckbox.push(aid);
            this.setState({checkbox: nCheckbox});
            break;
        case 'textbox':
            aid = qid + 'te1';
            let nTextbox = this.state.textbox;
            nTextbox.push(aid);
            this.setState({textbox: nTextbox});
            break;
        case 'textarea':
            aid = qid + 'tx1';
            let nTextarea = this.state.textarea;
            nTextarea.push(aid);
            this.setState({textarea: nTextarea});
            break;
        default: break;
        }
    }

    render() {

        let questions = this.state.questions;
        let radio = this.state.radio;
        let checkbox = this.state.checkbox;
        let textbox = this.state.textbox;
        let textarea = this.state.textarea;
        let formstatus = this.state.formstatus;
        let freezedate = this.state.freezedate;
        let today = this.state.today;
        let organization = this.state.organization;
        let statusmessage = '';

        let teamoption = '';
        let companyoption = '';
        let teams = [];

        if (organization.companyname !== '') {
            companyoption = (<option value={organization.companyname}>
                {organization.companyname}
            </option>);
        }

        let teamdata = organization.teams;

        for(let key in teamdata) {
            let team = teamdata[key];
            teams.push({_id: team._id, teamname: team.teamname});
        }

        teamoption = (teams).map((team) => {
            return (<option value={team._id}>{team.teamname}</option>);
        });

        if(formstatus) {
            statusmessage = (
                <div className="alert alert-success">
                    <strong>Success!</strong> Form submitted.
                    </div>
                );
        }

        let sno = 1;
        let contents = questions.map((qid) => {
            let rString = qid + 'r';
            let rArr = [];
            for (let item of radio) {
                if(item.search(rString) !== -1)
                {
                    rArr.push(item);
                }
            }

            let cString = qid + 'c';
            let cArr = [];
            for (let item of checkbox) {
                if(item.search(cString) !== -1)
                {
                    cArr.push(item);
                }
            }

            let tString = qid + 'te';
            let tArr = [];
            for (let item of textbox) {
                if(item.search(tString) !== -1)
                {
                    tArr.push(item);
                }
            }

            let txString = qid + 'tx';
            let txArr = [];
            for (let item of textarea) {
                if(item.search(txString) !== -1)
                {
                    txArr.push(item);
                }
            }

            return (
                <Question
                    qid={qid}
                    sno={sno++}
                    onClick={this.onRemoveQuestion}
                    onChange={this.onSelectAnswerType}
                    changeQuestion={this.changeHandler}
                    formdata={this.state.formdata}
                    radio={rArr}
                    removeRadio={this.onRemoveRadioOption}
                    addRadio={this.onAddRadioOption}
                    changeRadio={this.changeHandler}
                    checkbox={cArr}
                    removeCheckbox={this.onRemoveCheckboxOption}
                    addCheckbox={this.onAddCheckboxOption}
                    changeCheckbox={this.changeHandler}
                    textbox={tArr}
                    textarea={txArr}
                    />
            );
        });

        return (
            <div className="container">
                <Submenu />
                <div className="form-group">
                    <a href="#" onClick={this.onFormListsClick}>
                        <b>Custom Survey Listing</b>
                    </a>&nbsp;&nbsp;
                </div>
                {statusmessage}
                <h2>Custom Survey Generation.</h2>
                <form id="surveyForm">
                    <div className="form-group">
                        <input type="text" ref="surveytitle" onChange={this.changeHandler.bind(this, 'formdata', 'surveytitle')} className="form-control" id="surveytitle" placeholder="Name of the survey"/>
                    </div>
                    <div className="form-group">
                        <label>Freeze date:</label>
                        <input type="text" ref="freezedate" name="freezedate" id="freezedate" value={freezedate} placeholder="Pick a date"/>
                        <div className="datepicker">
                            <DatePicker minDate={today} onChange={this.onDateChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Target group</label>
                        <br/>
                        <input type="radio" name="targetgroup" value="organization" defaultChecked/>&nbsp; Org &nbsp;
                        <select name="target_teamid" className="navigation__item ui dropdown">
                            <option value="0">Select company or team</option>
                            {companyoption}
                            {teamoption}
                        </select>
                        <br/>
                        <input type="radio" name="targetgroup" value="survey" />&nbsp; Survey &nbsp;
                        <input type="text"  name="targetvalue" />%&nbsp;&nbsp;&nbsp;
                        <select name="targetlevel" className="navigation__item ui dropdown">
                            <option value="above">Above</option>
                            <option value="below">Below</option>
                        </select>
                    </div>
                    <h4>Enter questions here..</h4>
                    <div>
                        {contents}
                    </div>
                    <br/>
                    <div className="form-group">
                        <button className="btn btn-success" onClick={this.onAddQuestion}>Add Question</button>&nbsp;&nbsp;
                        <button className="btn btn-primary" onClick={this.onSurveySubmit}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

Customsurvey.contextTypes = { router: React.PropTypes.func };
