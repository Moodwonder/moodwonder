import React from 'react';

/*
 * Component for Editable UI
 *
 */
export default class Editable extends React.Component {

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

  componentWillUnmount() {
  }

  changeValue = (event) => {
      this.setState({value:event.target.value});
  }

  onEditClick = () => {
      this.setState({Edit: true});
  }

  onSaveClick = (teamname,teamid) => {
      this.props.onSave({teamname:teamname,teamid:teamid});
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
        <div className="row">
          <div className="col-sm-8">
           {inputORLable}
          </div>
          <div className="col-sm-4">
           {actionButton}
          </div>
        </div>
      );
  }
}
