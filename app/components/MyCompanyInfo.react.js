import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import { MyOwnInput, MyOwnSelect } from 'components/Formsy-components';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class MyCompanyInfo extends React.Component {

  constructor (props) {
      super(props);
      mixins(Navigation, this);
      this.state = UserStore.getState();
      this.state.canSubmit = false;
      this.validationErrors = {};
  }

  componentDidMount () {
      UserActions.getcompanyinfo();
      UserStore.listen(this._onChange);
  }

  componentWillUnmount () {
      UserStore.unlisten(this._onChange);
  }

  enableButton = () => {
      this.setState({canSubmit: true});
  }

  disableButton = () => {
      this.setState({canSubmit: false});
  }

  _onChange = (state) => {
      this.setState(state);
      console.log(this.state.userDetails);
  }

  _onSaveSubmit = (model) => {
      console.log(model);
      UserActions.saveCompanyInfo(model);
  }

  render() {

      let renderedResult;

      let message;

      let userInfo = this.state.userDetails;

      if (this.state.message !== '' ) {
          message = (
              <div className={ (this.state.hasError) ? 'alert alert-warning' : 'alert alert-info' }>
                {this.state.message}
              </div>
          );
      }

      renderedResult = (
      <div className="container">
          <ul className="pagination">
            <li><a href="/survey">Survey</a></li>
            <li><a href="/myprofile">My Profile</a></li>
            <li><a href="/mycompany">My Company</a></li>
            <li><a href="/mymanager">My Manager</a></li>
            <li><a href="/myteam">My Teams</a></li>
          </ul>

        <h2>My Company Info</h2>
        {message}
            <Formsy.Form onValidSubmit={this._onSaveSubmit} onValid={this.enableButton} onInvalid={this.disableButton} >
               <MyOwnInput
               name="companyname"
               className="form-control"
               value={userInfo.companyname}
               placeholder="Company name"
               validationError="Company name is required"
               required/>

               <MyOwnInput
               name="industry"
               className="form-control"
               value={userInfo.industry}
               placeholder="Industry"
               validationError="Industry is required"
               required/>

               <MyOwnSelect
               name="continent"
               className="form-control"
               value={userInfo.continent}
               placeholder="Continent"
               options={['ASIA']}
               />

               <MyOwnSelect
               name="country"
               className="form-control"
               value={userInfo.country}
               placeholder="Country"
               options={['United states of america']}
               />

               <MyOwnSelect
               name="state"
               className="form-control"
               value={userInfo.state}
               placeholder="State"
               options={['New york']}
               />

               <MyOwnSelect
               name="city"
               className="form-control"
               value={userInfo.city}
               placeholder="city"
               options={['my city']}
               />

               <MyOwnInput
               name="address"
               className="form-control"
               value={userInfo.address}
               placeholder="Address"
               validationError="Address is required"
               required/>

               <MyOwnInput
               name="website"
               className="form-control"
               value={userInfo.website}
               placeholder="Website"
               validationError="Website is required"
               required/>

               <MyOwnSelect
               name="companysize"
               className="form-control"
               value={userInfo.companysize}
               placeholder="Companysize"
               options={['Small', 'Medium', 'Big']}
               />

               <button type="submit" className="btn btn-default" disabled={!this.state.canSubmit}>Submit</button>
            </Formsy.Form>
      </div>
      );


      return (
        <div className="login">
          {renderedResult}
        </div>
      );

  }
}
MyCompanyInfo.contextTypes = { router: React.PropTypes.func };
