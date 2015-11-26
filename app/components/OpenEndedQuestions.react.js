import React from 'react';
import getFormData from 'get-form-data';
import OpenEndedActions from 'actions/OpenEndedActions';
import OpenEndedStore from 'stores/OpenEndedStore';


export default class OpenEndedQuestions extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        questions: [],
        savesurveyflag: false
      };
  }

  componentDidMount() {
      OpenEndedActions.getQuestions();
      OpenEndedStore.listen(this._onChange);
  }

  componentWillUnmount() {
      OpenEndedStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
      this.setState({
          questions: OpenEndedStore.getState().questions,
          savesurveyflag: OpenEndedStore.getState().savesurveyflag
      });

      if (this.state.savesurveyflag) {
          console.log('submitted');
          window.location.assign('/mymood');
      }
  }

  onOpenEndedSurveySubmit = (e) => {
      e.preventDefault();
      let form = document.querySelector('#openEndedForm');
      let data = getFormData(form, {trim: true});
      let openended = openended || {};
      openended.most_improved_aone = data['most_improved_aone'];
      openended.most_improved_atwo = data['most_improved_atwo'];
      openended.most_improved_athree = data['most_improved_athree'];
      openended.least_improved_aone = data['least_improved_aone'];
      openended.least_improved_atwo = data['least_improved_atwo'];
      openended.least_improved_athree = data['least_improved_athree'];

      //let errorFlag =  false;

      //if(openended.most_improved_aone === '' || openended.most_improved_aone === null) {
      //    errorFlag =  true;
      //} else if (openended.most_improved_atwo === '' || openended.most_improved_atwo === null) {
      //    errorFlag =  true;
      //} else if (openended.most_improved_athree === '' || openended.most_improved_athree === null) {
      //    errorFlag =  true;
      //} else if (openended.least_improved_aone === '' || openended.least_improved_aone === null) {
      //    errorFlag =  true;
      //} else if (openended.least_improved_atwo === '' || openended.least_improved_atwo === null) {
      //    errorFlag =  true;
      //} else if (openended.least_improved_athree === '' || openended.least_improved_athree === null) {
      //    errorFlag =  true;
      //}

      //if (errorFlag) {
      //    alert("Please answer all the questions.");
      //} else {
      //    if (window.confirm('Are sure you want to submit Open ended questions?')) {
      //        OpenEndedActions.saveAnswers(openended);
      //    }
      //}

      OpenEndedActions.saveAnswers(openended);
  }

  onOpenEndedSurveyCancel = (e) => {
      e.preventDefault();
      document.getElementById("openEndedForm").reset();
  }



  render() {

      let questions = (this.state.questions).map((question) => {
          return (
                    <div className="ui two column stackable grid survey">

                        <div className="clear"></div>
                        <div className="ui two column stackable grid container ">
                            <div className="column">
                                <h4 className="ui header ryt com">THE MOST IMPROVED AREAS <span style={{"fontSize":"14px"}}> (Optional)</span></h4>
                            </div>
                            <div className="column"></div>
                        </div>

                        <div className="one wide column qst-mobile">
                            <div className="ui grey circular label ">Q.1</div>
                        </div>
                        <div className="fifteen wide column padin-lft">
                            <div className="ui left pointing label "> <span className="qst-mobile-1">Q.1</span>{question.most_improved_qone} </div>
                            <div className="ui form options">
                                <div className="ui form options">
                                    <div className="field">
                                        <textarea name="most_improved_aone" rows="2"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="one wide column qst-mobile">
                            <div className="ui grey circular label ">Q.2</div>
                        </div>
                        <div className="fifteen wide column padin-lft">
                            <div className="ui left pointing label "> <span className="qst-mobile-1">Q.2</span>{question.most_improved_qtwo} </div>
                            <div className="ui form options">
                                <div className="ui form options">
                                    <div className="field">
                                        <textarea name="most_improved_atwo" rows="2"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="one wide column qst-mobile">
                            <div className="ui grey circular label ">Q.3</div>
                        </div>
                        <div className="fifteen wide column padin-lft">
                            <div className="ui left pointing label "> <span className="qst-mobile-1">Q.3</span>{question.most_improved_qthree} </div>
                            <div className="ui form options">
                                <div className="ui form options">
                                    <div className="field">
                                        <textarea name="most_improved_athree" rows="2"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="clear"></div>
                        <div className="ui two column stackable grid container ">
                            <div className="column">
                                <h4 className="ui header ryt com">THE MOST DECREASED AREAS <span style={{"fontSize":"14px"}}> (Optional)</span></h4>
                            </div>
                            <div className="column"></div>
                        </div>


                        <div className="one wide column qst-mobile">
                            <div className="ui grey circular label ">Q.1</div>
                        </div>
                        <div className="fifteen wide column padin-lft">
                            <div className="ui left pointing label "> <span className="qst-mobile-1">Q.1</span>{question.least_improved_qone} </div>
                            <div className="ui form options">
                                <div className="ui form options">
                                    <div className="field">
                                        <textarea name="least_improved_aone" rows="2"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="one wide column qst-mobile">
                            <div className="ui grey circular label ">Q.2</div>
                        </div>
                        <div className="fifteen wide column padin-lft">
                            <div className="ui left pointing label "> <span className="qst-mobile-1">0.2</span>{question.least_improved_qtwo} </div>
                            <div className="ui form options">
                                <div className="ui form options">
                                    <div className="field">
                                        <textarea name="least_improved_atwo" rows="2"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="one wide column qst-mobile">
                            <div className="ui grey circular label ">Q.3</div>
                        </div>
                        <div className="fifteen wide column padin-lft">
                            <div className="ui left pointing label "> <span className="qst-mobile-1">Q.3</span>{question.least_improved_qthree} </div>
                            <div className="ui form options">
                                <div className="ui form options">
                                    <div className="field">
                                        <textarea name="least_improved_athree" rows="2"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="one wide column qst-mobile"></div>
                        <div className="fifteen wide column padin-lft">
                            <div className="ui form options">
                                <div className="ui form options">
                                    <div className="field">
                                        <button className="ui submit  button cancel" onClick={this.onOpenEndedSurveyCancel}>Cancel</button>
                                        <button className="ui submit button submitt" onClick={this.onOpenEndedSurveySubmit}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                 );
      });

      return (
        <div className="ui segment brdr-none padding-none width-rating">
            <form id="openEndedForm">
                {questions}
            </form>
        </div>
    );
  }
}

