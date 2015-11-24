import React from 'react';
// import Immutable from 'immutable';

export default class List extends React.Component {

  constructor(props) {
      super(props);
      this.state = {

      };
  }

  componentDidMount() {

  }

  render() {

      return (
            <div className="error-page">
                <div className="ui container">
                    <div className="mesg" style={{ "width": "30%", "margin": "0px auto"}}>
                        <div className="column">
                            <h2 className="ui  image header"> <img src="assets/images/logo.png" className="image"/> </h2>
                            <div className="ui large form">
                                <div className="ui stacked segment">
                                    <div className="field">
                                        <div className="ui left icon input">
                                            <h1>404</h1>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui left icon input">
                                            <h3>PAGE NOT FOUND.</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui error message segment"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      );

  }
}

