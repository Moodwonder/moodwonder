import React from 'react';


export default class Followingmenu extends React.Component {

  constructor (props) {
      super(props);
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  render () {

      return (
                <div className="ui container">
                    <a className="item" href="/"><img src="assets/images/logo-mw.png" alt=""/></a>
                    <div className="right menu">
                        <div className="item padding-row">
                            <div className="ui icon top  pointing dropdown  "> <span>Language</span>
                                <div className="menu">
                                    <div className="item">EN</div>
                                    <div className="item">FI</div>
                                </div>
                            </div>
                        </div>
                        <div className="item ">
                            <div className="ui icon top right pointing dropdown  "> <span><i className="sidebar icon"></i></span>
                                <div className="menu">
                                    <a href="/login" className="item">Sign in </a>
                                    <a href="/" className="item">Register</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
      );
  }

}


