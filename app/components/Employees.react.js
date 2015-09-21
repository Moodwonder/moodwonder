import React from 'react';
import Submenu from 'components/Submenu.react';
import EOTMActions from 'actions/EmployeeOfTheMonthActions';
import EOTMStore from 'stores/EmployeeOfTheMonthStore';

export default class EmployeeOfTheMonth extends React.Component {

  constructor(props) {
      super(props);
      this.state = EOTMStore.getState();
      this.filtered = [];
      this.mytotalvotes = 0;
      this.hasData = false;
      this.Data = {};
  }

  componentDidMount() {
      EOTMActions.getallemployees();
      EOTMStore.listen(this._onChange);
  }

  componentWillUnmount() {
      EOTMStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
      this.filtered = state.employees.data.employees;
      this.setState(state);
      this.mytotalvotes = this.state.employees.data.mytotalvotes;
      this.hasData = this.state.hasEmployees;
  }

      _onPopClick = (data) => {
          console.log('_onPopClick..');
          this.setState({
             modalBox:true
          });
          this.Data = data;
      }

    _onPopClose = (emp_id) => {
        console.log('_onPopClose..');
        this.setState({
           modalBox:false
        });
    }

  _onChangeComment = (e) => {
      if(e.target.value.trim() !== ''){
          this.setState({
             isNotValid: false
          });
      }
  }

  _onSearch = (e) => {
      let text = e.target.value.trim();
      if(text !== ''){
          if(this.hasData){
              this.filtered = [];
              let i =0;
              this.state.employees.data.employees.map((data, key) => {
                  if((data.name.toLowerCase()).indexOf(text.toLowerCase()) === 0){
                      this.filtered[i] = data;
                      i++;
                  }
              });
              this.hasData = true;
              this.setState(this.state);
          }
      }else{
          this.filtered = this.state.employees.data.employees;
          this.setState(this.state);
      }
  }

  _onChooseSubmit = (e) => {
      if(this.Data._id !== undefined && this.Data._id !== ""){
          console.log(this.Data);
          EOTMActions.chooseEOTM({ emp_id: this.Data._id });
      }
  }

  render() {

      let employees = '';
      if(this.state.hasEmployees){
          employees = this.filtered.map((data, key) => {
              return [<VoteWidget _id={data._id} photo={data.photo} name={data.name} votes={data.votes} active={data.myvote} click={this._onPopClick} />];
          });
      }

      let message;
      if (this.state.message !== '' ) {
          message = (
              <div className={ (this.state.hasError) ? 'alert alert-warning' : 'alert alert-info' }>
                {this.state.message}
              </div>
          );
      }

      let modal;
      if(this.state.modalBox){
          modal = (
                <div className="modal fade in cmodal-show" id="myModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" onClick={this._onPopClose} className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">Award employee of the month</h4>
                    </div>
                    <div className="modal-body">
                        <form role="form">
                          <div className="form-group">
                            <EmployeeMonthlyStats data={this.Data}/>
                          </div>
                        <button type="button" onClick={this._onChooseSubmit}  className="btn btn-default" >Yes, Proceed </button>
                        <button type="button" onClick={this._onPopClose} className="btn btn-default" data-dismiss="modal">Cancel</button>
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
        {message}
        <input type="text" ref="search" placeholder="Search a name" onChange={this._onSearch} />
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
      this.props.click(this.props);
  }

  render() {

      let classname = "btn btn-info";

      return (
       <div className="col-sm-4 userprofilebox">
        <img src={this.props.photo} alt="Profile Photo"/>
        <div>{this.props.name}</div>
        <div>{this.props.votes} votes</div>
        <button type="button" onClick={this._onModalClick} className={classname} >View details</button>
       </div>
      );
  }

}


class EmployeeMonthlyStats extends React.Component {

  constructor(props) {
      super(props);
      this.state = EOTMStore.getState();
      //console.log(EOTMStore.getState());
  }

  componentDidMount() {
      if(this.props.data._id !== undefined){
          EOTMActions.getempmonthreview({ emp_id: this.props.data._id });
      }
      EOTMStore.listen(this._onChange);

  }

  _onChange = (state) => {
      this.setState(state);
  }

  render() {

      let data = [<div className="ui loader">Loading comments....</div>];
      let employee = this.state.employee;
      let comments = '';
      if(this.state.hasEmployee){
          comments = employee.data.comments.map((data, key) => {
              return (
              <div>
                  <span>{data.name} : </span>
                  <span> {data.comment}</span>
              </div>
              );
          });
      }

      if(this.state.hasEmployee){
          data = (
              <div>
               {comments}
              </div>
          );
      }
      return (
       <div className="col-sm-4 userprofilebox">
            <img src={this.props.data.photo} alt="Profile Photo"/>
            <div>{this.props.data.name}</div>
            <div>{this.props.data.votes} votes</div>
            <div>Comments</div>
         {data}
       </div>
      );
  }
}
