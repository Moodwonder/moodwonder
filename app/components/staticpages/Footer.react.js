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
                            <a href="/about">About </a> |
                            <a href="/anonymity"> Anonymity </a> |
                            <a href="/terms"> Terms</a> |
                            <a href="/policy"> Policy</a> |
                            <a href="/#7thPage"> Contact </a>
                        </div>
                        <a href="#"> © Moodwonder 2015 </a>
                    </div>
                </div>
            </footer>
      );
  }

}


