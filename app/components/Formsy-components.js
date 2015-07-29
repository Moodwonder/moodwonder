import React from 'react';
import Formsy from 'formsy-react';

var MyOwnInput = React.createClass({

  mixins: [Formsy.Mixin],

  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function () {

        var errorMessage = this.getErrorMessage();

        var classNames = {
            formGroup: ['form-group'],
            elementWrapper: []
        };

        if (errorMessage) {
            classNames.formGroup.push('has-error');
            classNames.formGroup.push('has-feedback');
        }

        var elementWrapper = classNames.formGroup.join(' ');

    return (
      <div className={elementWrapper}>
        <input type={this.props.type || 'text'} placeholder={this.props.placeholder} className={this.props.className} name={this.props.name} onChange={this.changeValue} value={this.getValue()}/>
        <span className='help-block validation-message'>{errorMessage}</span>
      </div>
    );
  }
});

export default MyOwnInput;
