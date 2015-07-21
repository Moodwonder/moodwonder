import React from 'react';
import Immutable from 'immutable';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';
import $ from 'jquery';
import Validation, { Validator } from 'rc-form-validation';
import mixins from 'es6-mixins';


export default class List extends React.Component {
  
  constructor(props) {
    super(props);
    mixins(Validation.FieldMixin, this);
    this.state = {
        status: {
            surveytitle: {}
        },
        formData: {
            surveytitle: undefined
        }
    };
  }
  
  componentDidMount() {
      
  }
  
  _handleReset = (e) => {
    e.preventDefault();
    this.refs.validation.reset();
    this.setState(this.getInitialState());
  }
  
  _handleSubmitForm = (e) => {
    e.preventDefault();
    var validation = this.refs.validation;
    validation.validate((valid) => {
      if (!valid) {
        console.log('error in form');
        return;
      } else {
        console.log('submit');
      }
      console.log(this.state.formData);
    });
  }
  
  _userExists(rule, value, callback) {
    setTimeout(function () {
      if (value === '1') {
        callback([new Error('are you kidding?')]);
      }
      else if (value === 'yiminghe') {
        callback([new Error('forbid yiminghe')]);
      } else {
        callback();
      }
    }, 1000);
  }
  
  render() {  
    var status = this.state.status;
    var formData = this.state.formData;
    return (
      <div className="login__container">
        <fieldset className="login__fieldset">
            <span id="surveyTitle">Survey page.</span>
            <form onSubmit={this._handleSubmitForm} className="form-horizontal">
                <Validation ref='validation' onValidate={this.handleValidate}>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Survey title :</label>
                        <div className="col-sm-10">
                          <Validator rules={[{required: true, min: 5}, {validator: this._userExists}]}>
                            <input name='surveytitle' className="form-control"  value={formData.surveytitle}/>
                          </Validator>
                              {status.surveytitle.isValidating ? <span style={{color: 'green'}}> isValidating </span> : null}
                              {status.surveytitle.errors ? <span style={errorStyle}> {status.surveytitle.errors.join(', ')}</span> : null}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                          <button type="submit" className="btn btn-default">submit</button>
                        &nbsp;&nbsp;&nbsp;
                          <a href='#' className="btn btn-default" onClick={this._handleReset}>reset</a>
                        </div>
                    </div>
                </Validation>
            </form>
        </fieldset>
      </div>
    );
    
  }
}

