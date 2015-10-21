import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import PlacesActions from 'actions/PlacesActions';
import PlacesStore from 'stores/PlacesStore';
import { MyOwnInput, MyOwnSelect } from 'components/Formsy-components';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import Submenu from 'components/Submenu.react';
import _ from 'underscore';

export default class MyCompanyInfo extends React.Component {

    constructor (props) {
        super(props);
        mixins(Navigation, this);
        this.state = UserStore.getState();
        this.state.canSubmit = false;
        this.state.continents = [];
        this.state.countries = [];
        this.state.countriesIntial = true;
        this.state.states = [];
        this.state.statesIntial = true;
        this.state.cities = [];
        this.state.citiesIntial = true;
        this.validationErrors = {};
    }

    componentDidMount () {

        UserActions.getcompanyinfo();
        UserStore.listen(this._onChange);
    }

    onChangeContinent = (continent) => {

        if(continent !== undefined){
            let arr = this.state.continents;
            let currentContinentObj = _.filter(arr, function(v) { return v.text === continent; });
            if(currentContinentObj.length>0){
                let currentContinent_id = currentContinentObj[0]._id;
                PlacesActions.getPlacesData({ _id: currentContinent_id, placeType: 'country' });
                PlacesStore.listen(this._onGetPlaces);
            }
        }
    }

    onChangeCountry = (country) => {

        let arr = this.state.countries;
        let currentCountryObj = _.filter(arr, function(v) { return v.text === country; });
        if(currentCountryObj.length>0){
            let currentCountryObj_id = currentCountryObj[0]._id;
            this.setState( { countriesIntial: false } );
            PlacesActions.getPlacesData({ _id: currentCountryObj_id, placeType: 'state' });
            PlacesStore.listen(this._onGetPlaces);
        }
    }

    onChangeStates = (state) => {

        let arr = this.state.states;
        let currentStateObj = _.filter(arr, function(v) { return v.text === state; });
        if(currentStateObj.length>0){
            let currentStateObj_id = currentStateObj[0]._id;
            this.setState( { statesIntial: false } );
            PlacesActions.getPlacesData({ _id: currentStateObj_id, placeType: 'city' });
            PlacesStore.listen(this._onGetPlaces);
        }
    }

    _onGetPlaces = (states) => {

        if(this.state.countriesIntial && this.state.states.length <= 0 && this.state.userDetails.country!==''){

            this.onChangeCountry(this.state.userDetails.country);
        }

        if(this.state.statesIntial && this.state.cities.length <= 0 && this.state.userDetails.state!==''){

            this.onChangeStates(this.state.userDetails.state);
        }

        if(states.PlacesData.placeType === 'country'){

            this.setState( { countries: this.state.PlacesData.places } );
        }

        if(states.PlacesData.placeType === 'state'){

            this.setState( { states: this.state.PlacesData.places } );
        }

        if(states.PlacesData.placeType === 'city'){

            this.setState( { cities: this.state.PlacesData.places } );
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

    _onChange = (state) => {
        this.setState(state);
        if(this.state.countries.length <= 0 && this.state.userDetails.continent!==''){
            this.onChangeContinent(this.state.userDetails.continent);
        }
    }

    _onSaveSubmit = (model) => {
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
               options={this.state.continents}
               onChange={this.onChangeContinent}
               />

               <MyOwnSelect
               name="country"
               className="form-control"
               value={userInfo.country}
               placeholder="Country"
               options={this.state.countries}
               onChange={this.onChangeCountry}
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
               options={[ {text: 'Small'}, { text: 'Medium'}, {text: 'Big' }]}
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
