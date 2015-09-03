import React from 'react';
import { Link } from 'react-router';
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
                  <Link
                        onClick={this._onLogout}
                        className="navigation__item"
                        to="logout">Logout
                  </Link>
            </li>
          ];
      } else {
          loginOrOut = [
              <li><a href="/login" className="navigation__item">NAV_LOGIN</a></li>,
              <li><a href="/signup" className="navigation__item">NAV_SIGNUP</a></li>
          ];
      }
      return (
        <nav className="navbar navbar-default" role="navigation">
            <div className="container-fluid">
                  <div className="navbar-header">
                        <ul className="nav navbar-nav  navbar-left">
                            <li><a href="/" className="navbar-brand navigation__item">NAV_TITLE</a></li>
                        </ul>
                  </div>
                  <div>
                        <ul className="nav navbar-nav  navbar-right">
                          { loginOrOut }
                          <li>
                              <a className="navigation__item">
                              <form id="languageForm" name="languageForm" method="post">
                              <select className="navigation__item" value={lang} onChange={this.onSelectLanguage}>
                                    <option value={LanguageContants.EN}>{LanguageContants.EN}</option>
                                    <option value={LanguageContants.FI}>{LanguageContants.FI}</option>
                              </select>
                              </form>
                              </a>
                          </li>
                        </ul>
                  </div>
            </div>
        </nav>
      );
  }

}

Navigation.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
