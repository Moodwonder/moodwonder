import React from 'react';

/*
 * Component for Editable Form UI
 *
 */
export default class EditableForm extends React.Component {

  constructor(props) {
      super(props);
      this.state =
          {
            Edit: false,
            value:props.value
          };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(e) {
      // to set default
      this.setState({Edit: false, value: this.props.value });
  }

  changeValue = (event) => {
      this.setState({value:event.target.value});
  }

  onEditClick = () => {
      this.setState({Edit: true, value: this.props.value });
  }

  onSaveClick = (teamname,teamid) => {
      if(this.props.value !== this.state.value && teamname.trim() !== ''){
          this.props.onSave({teamname:teamname,teamid:teamid});
      }
  }

  render() {

      let buttonlabel = 'Edit';

      let inputORLable = (
        <label htmlFor="email">{this.props.value}</label>
      );

      let actionButton = (
        <button type="button" className="btn btn-default" onClick={this.onEditClick} >{buttonlabel}</button>
      );

      if(this.state.Edit){
          buttonlabel  = 'Save';
          inputORLable = (
            <input type="text" className="form-control" ref="email"  onChange={this.changeValue} value={this.state.value} />
          );

          actionButton = (
            <button type="button" className="btn btn-default" onClick={this.onSaveClick.bind(this,this.state.value,this.props.teamid)} >{buttonlabel}</button>
          );
      }

      return (
		<div>
			<h3 className="ui dividing header">
				<i className="file text outline icon"></i> {title}
				<a className="action"><i className="write icon"></i></a>
			</h3>
			<div className="field">
				<label>{title}</label>
				<textarea></textarea>
			</div>
			<div className="ui submit  button cancel">Cancel</div>
			<div className="ui submit button submitt">Submit</div>
		</div>
      );
  }
}
