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

  _onVoteSubmit = (e) => {
      if(parseInt(this.mytotalvotes) < 2){
          let comment = React.findDOMNode(this.refs.comment).value.trim();
          EOTMActions.saveVote({ emp_id: this.state.emp_id, comment: comment });
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
      if(!(this.props.votes)){
          this.props.click(this.props._id);
      }
  }

  render() {

      let classname = "btn btn-info";
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
