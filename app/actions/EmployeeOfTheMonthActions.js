import alt from 'altInstance';
import CommonWebAPIUtils from 'utils/CommonWebAPIUtils';

class EmployeeOfTheMonthActions {

  getallemployees() {
      this.dispatch();
      CommonWebAPIUtils.getAllEmployees()
      .then((response, textStatus) => {
          if (textStatus === 'success') {
              this.actions.getemployees(response);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  getemployees(data)
  {
      this.dispatch(data);
  }

  saveVote(data) {
      this.dispatch();
      CommonWebAPIUtils.saveVote(data)
      .then((response) => {
          if (response) {
              this.actions.savevotesuccess(response);
          }
      }, () => {
        // Dispatch another event for a bad request
      });
  }

  savevotesuccess(response)
  {
      this.dispatch(response);
  }

}

export default alt.createActions(EmployeeOfTheMonthActions);
