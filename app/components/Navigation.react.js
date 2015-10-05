import React from 'react';
// import { Link } from 'react-router';
import Immutable from 'immutable';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Cookie from 'utils/Cookie';
import LanguageContants from 'constants/LanguageConstants';

export default class Navigation extends React.Component {

  constructor (props) {
      super(props);
      this.state = UserStore.getState();
      this.state.lang = '';
  }

  componentDidMount () {
      UserStore.listen(this._onChange);
      let lang = Cookie.getCookie('lang');
      this.setState({lang: lang});
  }

  componentWillUnmount () {
      UserStore.unlisten(this._onChange);
  }

  onSelectLanguage = (e) => {
      //e.preventDefault();
      Cookie.setCookie('lang', e.target.value, 30);
      this.setState({lang: e.target.value});
      location.reload(true);
  }

  _onChange = () => {
      this.setState({
        user: UserStore.getState().user
      });
  }

  _onLogout = () => {
      UserActions.logout();
  }

  render () {

      let lang = this.state.lang;
      let loginOrOut;

      if (this.state.user.get('authenticated')) {
          loginOrOut = [
            <li>
                  <a href="/logout" onClick={this._onLogout} className="navigation__item">Logout</a>
            </li>
          ];
      } else {
          loginOrOut = [
              <li><a href="/login" className="navigation__item">NAV_LOGIN</a></li>,
              <li><a href="/signup" className="navigation__item">NAV_SIGNUP</a></li>
          ];
      }
      return (
        <nav role="navigation">
			<div className="ui large top fixed hidden menu">
    <div className="ui large secondary inverted pointing menu"> <a className="toc item"> <i className="sidebar icon"></i> </a>
    <div  className="header item"> <img className="logo" src="images/logo.png" alt=""/><img className="logo-mw slide-logo" src="images/logo-mw.png" alt=""/> </div>
    <div className="ui segment padding-none width-header ">
        <div className="header-middle-container ">
        <h2>RATE YOUR MOOD</h2>
        <p>How are you feeling at work today?</p>
      </div>
        <div className="ui slider range  header-middle-container ">
        <input type="range" />
      </div>
        <div  className="header-middle-container">
        <button className="ui yellow button">Submit</button>
      </div>
        <div  className="header-middle-container">
        <p className="answer">Answer all
            statements </p>
      </div>
      </div>
    <div className="right item">
        <div className="ui floating dropdown  icon "> <i className="angle down icon" style={{"float":"right","marginRight":"20"}}></i> <span className="text">Language</span>
        <select className="navigation__item" value={lang} onChange={this.onSelectLanguage}>
                                    <option value={LanguageContants.EN}>{LanguageContants.EN}</option>
                                    <option value={LanguageContants.FI}>{LanguageContants.FI}</option>
                              </select>
      </div>
        <div className="ui compact menu">
        <div className="ui floating dropdown item"> <i className="ellipsis vertical icon"></i>
            <div className="menu">
            <div className="item">My Account</div>
            <div className="item">{ loginOrOut }</div>
          </div>
          </div>
      </div>
      </div>
  </div>
  </div>
        </nav>
      );
  }

}

Navigation.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
