import React from 'react';
import _ from 'underscore';

export default class Test1 extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var survey = survey || {};
    var data1 = {'surveytitle': 'stitle', 'question_q1': 'q1', 'answertype_q1': 'radio', 'q1r1': ['r1'], 'q1r2': ['r2'], 'question_q2': 'q2', 'answertype_q2': 'checkbox', 'q2c1': ['c1'], 'q2c2': ['c2'], 'q2c3': ['c3'], 'question_q3': 'q3', 'answertype_q3': 'textbox', 'q3t1': '', 'question_q4': 'q4', 'answertype_q4': 'textarea', 'q4tx1': ''};
    var data2 = {'surveytitle': 'Custom Survey Generation.', 'question_q1': 'Question - 1', 'answertype_q1': 'checkbox', 'q1c1': ['q1c1'], 'q1c2': ['q1c2'], 'question_q2': 'Question - 2', 'answertype_q2': 'radio', 'q2r1': ['q2r1'], 'q2r2': ['q2r2'], 'q2r3': ['q2r3'], 'question_q3': 'Question - 3', 'answertype_q3': 'checkbox', 'q3c1': ['q3c1'], 'q3c3': ['q3c3'], 'question_q4': 'Question - 4', 'answertype_q4': 'textbox', 'q4te1': '', 'question_q5': 'Question - 5', 'answertype_q5': 'textarea', 'q5tx1': '', 'question_q6': 'Question - 6', 'answertype_q6': 'radio', 'q6r1': ['q6r1'], 'q6r4': ['q6r4'], 'question_q7': 'Question - 7', 'answertype_q7': 'textarea', 'q7tx1': ''};
    var data = { surveytitle: 'Custom Survey Generation.',
                  question_q1: 'Question - 1',
                  answertype_q1: 'checkbox',
                  q1c1: [ 'q1c1' ],
                  q1c2: [ 'q1c2' ],
                  question_q2: 'Question - 2',
                  answertype_q2: 'radio',
                  q2r1: [ 'q2r1' ],
                  q2r2: [ 'q2r2' ],
                  q2r3: [ 'q2r3' ],
                  question_q3: 'Question - 3',
                  answertype_q3: 'checkbox',
                  q3c1: [ 'q3c1' ],
                  q3c3: [ 'q3c3' ],
                  question_q4: 'Question - 4',
                  answertype_q4: 'textbox',
                  q4te1: '',
                  question_q5: 'Question - 5',
                  answertype_q5: 'textarea',
                  q5tx1: '',
                  question_q6: 'Question - 6',
                  answertype_q6: 'radio',
                  q6r1: [ 'q6r1' ],
                  q6r4: [ 'q6r4' ],
                  question_q7: 'Question - 7',
                  answertype_q7: 'textarea',
                  q7tx1: ''
                };

    var data3 = { surveytitle: 'stitle',
                 question_q1: 'q1',
                 answertype_q1: 'radio',
                 q1r1: [ 'r1' ],
                 q1r2: [ 'r2' ],
                 question_q2: 'q2',
                 answertype_q2: 'checkbox',
                 q2c1: [ 'c1' ],
                 q2c2: [ 'c2' ],
                 q2c3: [ 'c3' ],
                 question_q3: 'q3',
                 answertype_q3: 'textbox',
                 q3te1: '',
                 question_q4: 'q4',
                 answertype_q4: 'textarea',
                 q4tx1: ''
               };

    let question = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];

    survey.id = 'S1';
    survey.surveytitle = data.surveytitle;
    survey.user_id = 1;
    survey.createddate = '29-july-2015';
    survey.target_teamid = 2;
    survey.questions = [];
    var keys = Object.keys(data);

    for(let qid of question){
      var id = qid.replace('q', '');
      var qTemp = {};

      qTemp.question = data['question_' + qid];
      qTemp.question_id = id;
      qTemp.answertype = data['answertype_' + qid];
      qTemp.answers = [];

      var rString = qid + 'r';
      var cString = qid + 'c';
      var tString = qid + 'te';
      var txString = qid + 'tx';

      for (let key of keys) {
        var aTemp = {};
        if((key.search(rString) != -1) || (key.search(cString) != -1))
        {
          aTemp.option = data[key][0];
          qTemp.answers.push(aTemp);
        }
        if((key.search(tString) != -1) || (key.search(txString) != -1))
        {
          aTemp.option = '';
          qTemp.answers.push(aTemp);
        }

      }

      survey.questions.push(qTemp);

    }

    console.log(JSON.stringify(data2));
    console.log(JSON.stringify(survey));

    return (
       <div className="container">
        <h2>Custom Survey Generation.</h2>
      </div>
    );
  }
}

