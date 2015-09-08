import EmployeeOfTheMonthActions from 'actions/EmployeeOfTheMonthActions';
import alt from 'altInstance';
import CommonWebAPIUtils from 'utils/CommonWebAPIUtils';

class EmployeeOfTheMonthStore {

  constructor () {

      this.employees = {};
      this.hasEmployees = false;
      this.hasError = false;
      this.modal = false;
      this.emp_id = 0;
      this.isNotValid = true;
      this.voteStatus = false;
      this.message = '';

      this.bindListeners({
      handleGetEmployees: EmployeeOfTheMonthActions.GETEMPLOYEES,
      handleSaveVote: EmployeeOfTheMonthActions.SAVEVOTESUCCESS
    });
  }

  handleGetEmployees (data) {
      this.employees = data;
      this.hasEmployees = true;
      this.emitChange();
  }

  handleSaveVote (response) {
	this.message = response.message;
	this.hasError = !response.status;
	this.modal = false;
	this.voteStatus = true;

	CommonWebAPIUtils.getAllEmployees()
	.then((response, textStatus) => {
	  if (textStatus === 'success') {
		this.employees = response;
		this.hasEmployees = true;
		this.emitChange();
	  }
	}, () => {
	// Dispatch another event for a bad request
	});
  }

}

// Export our newly created Store
export default alt.createStore(EmployeeOfTheMonthStore, 'EmployeeOfTheMonthStore');
