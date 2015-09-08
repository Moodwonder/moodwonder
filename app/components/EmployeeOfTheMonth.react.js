import React from 'react';
import Submenu from 'components/Submenu.react';
import EOTMActions from 'actions/EmployeeOfTheMonthActions';
import EOTMStore from 'stores/EmployeeOfTheMonthStore';

export default class EmployeeOfTheMonth extends React.Component {

  constructor(props) {
      super(props);
      this.state = EOTMStore.getState();
  }

  componentDidMount() {
      EOTMActions.getallemployees();
      EOTMStore.listen(this._onChange);
  }

  componentWillUnmount() {
      EOTMStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
      this.setState(state);
  }

	_onPopClick = (emp_id) => {
		this.setState({
		   modal:true,
		   emp_id:emp_id
		});
	}

	_onPopClose = (emp_id) => {
		this.setState({
		   modal:false
		});
	}

  _onChangeComment = (e) => {
      if(e.target.value.trim() !== ''){
		this.setState({
		   isNotValid: false 
		});
	  }
  }

  _onVoteSubmit = (e) => {
      var comment = React.findDOMNode(this.refs.comment).value.trim();
      EOTMActions.saveVote({ emp_id: this.state.emp_id, comment: comment });
  }

  render() {

		let employees = '';
		if(this.state.hasEmployees){
		  employees = this.state.employees.data.map((data, key) => {
			  return [<VoteWidget _id={data._id} photo={data.photo} name={data.name} votes={data.votes} active={data.myvote} click={this._onPopClick} />];
		  });
		}

		let modal;
		if(this.state.modal){
			modal = (
				<div className="modal fade in cmodal-show" id="myModal" role="dialog">
				<div className="modal-dialog">
				  <div className="modal-content">
					<div className="modal-header">
					  <button type="button" onClick={this._onPopClose} className="close" data-dismiss="modal">&times;</button>
					  <h4 className="modal-title">Vote</h4>
					</div>
					<div className="modal-body">
						<form role="form">
						  <div className="form-group">
							<label>Comment</label>
							<textarea className="form-control" rows="5" ref="comment" onChange={this._onChangeComment} ></textarea>
						  </div>
						<button type="button" disabled={this.state.isNotValid} onClick={this._onVoteSubmit}  className="btn btn-default" >Vote</button>
						<button type="button" onClick={this._onPopClose} className="btn btn-default" data-dismiss="modal">Close</button>
						</form>
					</div>
					<div className="modal-footer">
					</div>
				  </div>
				</div>
				</div>
			);
		}

		return (
		<div className="container Survey-list">
		<Submenu />
		  <div className="row">
		   {employees}
		  </div>
		  {modal}
		</div>
		);
  }

}

class VoteWidget extends React.Component {

  constructor(props) {
      super(props);
  }

  _onModalClick = (state) => {
		if(!(this.props.votes)){
			this.props.click(this.props._id);
		}
  }

  render() {

	let classname = "btn btn-info";
	let votes = this.props.votes;
	if(this.props.active){
		classname = "btn btn-success";
	}

	return (
	 <div className="col-sm-4">
		<img src={this.props.photo} alt="Profile Photo"/>
		<div>{this.props.name}</div>
		<div>{this.props.votes} votes</div>
		<button type="button" onClick={this._onModalClick} className={classname} >vote</button>
	 </div>
	);
  }

}
