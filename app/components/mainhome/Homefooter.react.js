import React from 'react';


export default class Homefooter extends React.Component {

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
            <div className="footer-left">
                <a href="/about"> HOM_FOOTER_ABOUT </a> |
                <a href="/anonymity"> HOM_FOOTER_ANONYMITY </a> |
                <a href="/terms"> HOM_FOOTER_TERMS </a> |
                <a href="/policy"> HOM_FOOTER_POLICY </a> |
                <a href="/#7thPage"> HOM_FOOTER_CONTACT </a>
            </div>
            <a href="#"> © Moodwonder 2015 </a>
        </footer>
      );
  }

}


