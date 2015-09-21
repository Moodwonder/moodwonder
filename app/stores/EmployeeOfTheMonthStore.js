import EmployeeOfTheMonthActions from 'actions/EmployeeOfTheMonthActions';
import alt from 'altInstance';
import CommonWebAPIUtils from 'utils/CommonWebAPIUtils';

class EmployeeOfTheMonthStore {

  constructor () {

      // All employees
      this.employees = {};
      this.hasEmployees = false;
      // record of a single employee
      this.employee = {};
      this.hasEmployee = false;
      this.hasError = false;
      this.modal = false;
      this.emp_id = 0;
      this.isNotValid = true;
      this.voteStatus = false;
      this.message = '';

      this.bindListeners({
      handleGetEmployees: EmployeeOfTheMonthActions.GETEMPLOYEES,
      handleSetEOTM: EmployeeOfTheMonthActions.SETEMPLOYEEOFTHEMONTH,
      handleGetEMPView: EmployeeOfTheMonthActions.GETEMPVIEW,
      handleSaveVote: EmployeeOfTheMonthActions.SAVEVOTESUCCESS
    });
  }

  handleGetEmployees (data) {
      this.employees = data;
      this.hasEmployees = true;
      this.emitChange();
  }

  handleSaveVote (response) {
      console.log('handleSaveVote..');
      this.message = response.message;
      this.hasError = !response.status;
      this.modal = false;
      this.modalBox = false;
      this.voteStatus = true;

      CommonWebAPIUtils.getAllEmployees()
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.employees = response;
                this.hasEmployees = true;
                this.emitChange();
            }
        }, () => {
        });
  }

  handleSetEOTM (data) {
      this.message = data.message;
      this.hasEmployees = true;
      this.modalBox = false;
      this.emitChange();
  }

  handleGetEMPView (data) {
      this.employee = data;
      this.modalBox = true;
      this.hasEmployee = true;
      this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(EmployeeOfTheMonthStore, 'EmployeeOfTheMonthStore');
