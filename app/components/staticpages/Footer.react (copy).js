import React from 'react';


export default class Footer extends React.Component {

  constructor (props) {
      super(props);
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  render () {

      return (
            <footer>
                <div className="ui  vertical footer segment">
                    <div className="ui container">
                        <div className="footer-left">
                            <a href="about.html">About </a> |
                            <a href="anonymity.html"> Anonymity </a> |
                            <a href="terms.html"> Terms</a> |
                            <a href="privacy.html"> Policy</a> |
                            <a href="contact.html"> Contact </a>
                        </div>
                        <a href="#"> © Moodwonder 2015 </a> 
                    </div>
                </div>
            </footer>
      );
  }

}


