import React from 'react';
import { RouteHandler } from 'react-router';
import Followingmenu from 'components/staticpages/Followingmenu.react';
import Sidebarmenu from 'components/staticpages/Siderbarmenu.react';
import Footer from 'components/staticpages/Footer.react';

export default class Appstatic extends React.Component {

  constructor (props) {
      super(props);
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }


  render() {

      //let handler = (<RouteHandler />);

      let sitecontent = [
                    <div className="ui large top fixed hidden menu">
                        <Followingmenu />
                    </div>,
                    <Sidebarmenu />,
                    <RouteHandler />,
                    <Footer/>
              ];

      return (
              <div>{sitecontent}</div>
      );
  }
}

Appstatic.contextTypes = { router: React.PropTypes.func };
