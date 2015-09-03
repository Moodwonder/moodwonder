import React from 'react';
// import _ from 'underscore';
import Cookie from 'utils/Cookie';
import LanguageContants from 'constants/LanguageConstants';

export default class Test1 extends React.Component {

  constructor(props) {
      super(props);
  }

  componentDidMount() {
      if(!Cookie.getCookie('lang')) {
          Cookie.setCookie('lang', LanguageContants.EN, 30);
      }
  }

  componentWillUnmount() {

  }

  render() {

      return (
       <div className="container">
            <h2>HOME_TITLE</h2>
                <form id="adminLogin">
                  <div className="form-group">
                    <label>LBL_USERNAME</label>
                    <input type="text" className="form-control" name="username" placeholder="PH_USERNAME"/>
                  </div>
                  <div className="form-group">
                    <label>LBL_PASSWORD</label>
                    <input type="password" className="form-control" name="password" placeholder="PH_PASSWORD"/>
                  </div>
                  <br/>
                  <div className="form-group">
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </form>
          </div>
    );
  }
}

