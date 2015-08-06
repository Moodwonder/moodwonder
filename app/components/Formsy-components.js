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
        <input type={this.props.type || 'text'} placeholder={this.props.placeholder} className={this.props.className} name={this.props.name} onChange={this.changeValue} value={this.getValue()} autoComplete={this.props.autocomplete || 'on' } />
        <span className='help-block validation-message'>{errorMessage}</span>
      </div>
    );
  }
});

var MyOwnSelect = React.createClass({

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

        var options = this.props.options.map((data, key) => {

          return (
             <option value={data} >{data}</option>
          );
        });
    return (
      <div className={elementWrapper}>
        <select className={this.props.className} name={this.props.name} onChange={this.changeValue} value={this.props.value} >
            <option value=''>{this.props.placeholder}</option>
            {options}
        </select>
        <span className='help-block validation-message'>{errorMessage}</span>
      </div>
    );
  }
});

export { MyOwnInput, MyOwnSelect };
