import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import { MyOwnInput, MyOwnSelect } from 'components/Formsy-components';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import Submenu from 'components/Submenu.react';

export default class MyCompanyInfo extends React.Component {

  constructor (props) {
      super(props);
      mixins(Navigation, this);
      this.state = UserStore.getState();
      this.state.canSubmit = false;
      this.state.countries = [];
      this.state.states = [];
      this.state.cities = [];
      this.validationErrors = {};
  }

  componentDidMount () {
      UserActions.getcompanyinfo();
      UserStore.listen(this._onChange);
  }

  componentWillUpdate () {

      if(this.state.countries.length <= 0 && this.state.userDetails.continent!==''){
          this.onChangeContinent(this.state.userDetails.continent);
      }
      if(this.state.states.length <= 0 && this.state.userDetails.country!==''){
          this.onChangeCountries(this.state.userDetails.country);
      }
      if(this.state.cities.length <= 0 && this.state.userDetails.state!==''){
          this.onChangeStates(this.state.userDetails.state);
      }
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

  getContinent = () => {
      let continents = [];
      this.state.places.map((value, key) => {
          continents[key] = value.continent;
      });
      return continents;
  }

  onChangeContinent = (continent) => {

      let countries = ['Other'];
      this.state.places.map((contObj, contkey) => {
          if(contObj.continent === continent){
              if(typeof contObj.countries !== 'undefined'){
                  contObj.countries.map((countryObj, key) => {
                      countries[key] = countryObj.country;
                  });
              }
          }
      });
      this.setState( { countries: countries, states: [], cities: [] } );
  }

  onChangeCountries = (country) => {

      let states = ['Other'];
      this.state.places.map((contObj, contkey) => {
          if(typeof contObj.countries !== 'undefined'){
              contObj.countries.map((countryObj, countrykey) => {
                  if(countryObj.country === country){
                      if(typeof countryObj.states !== 'undefined'){
                          countryObj.states.map((statesObj, stateskey) => {
                              states[stateskey] = statesObj.state;
                          });
                      }
                  }
              });
          }
      });
      this.setState( { states: states, cities: [] } );
  }

  onChangeStates = (state) => {

      let cities = ['Other'];
      this.state.places.map((contObj, contkey) => {
          if(typeof contObj.countries !== 'undefined'){
              contObj.countries.map((countryObj, countrykey) => {
                  if(typeof countryObj.states !== 'undefined'){
                      countryObj.states.map((statesObj, stateskey) => {
                          if(statesObj.state === state){
                              console.log(statesObj.state);
                              if(typeof statesObj.city !== 'undefined'){
                                  cities = statesObj.city;
                              }
                          }
                      });
                  }
              });
          }
      });
      this.setState( { cities: cities } );
  }

  _onChange = (state) => {
      this.setState(state);
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
          <Submenu />
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
               options={this.getContinent()}
               onChange={this.onChangeContinent}
               />

               <MyOwnSelect
               name="country"
               className="form-control"
               value={userInfo.country}
               placeholder="Country"
               options={this.state.countries}
               onChange={this.onChangeCountries}
               />

               <MyOwnSelect
               name="state"
               className="form-control"
               value={userInfo.state}
               placeholder="State"
               options={this.state.states}
               onChange={this.onChangeStates}
               />

               <MyOwnSelect
               name="city"
               className="form-control"
               value={userInfo.city}
               placeholder="city"
               options={this.state.cities}
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
