import React from 'react';
import Homeheader from 'components/mainhome/Homeheader.react';
import Homecontent from 'components/mainhome/Homecontent.react';
import Homefooter from 'components/mainhome/Homefooter.react';


export default class Apphome extends React.Component {

  constructor (props) {
      super(props);
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }


  render() {

      let content = [
                        <Homeheader />,
                        <Homecontent />,
                        <Homefooter />
                    ];

      return (
                <span className="home">{content}</span>
      );
  }
}

Apphome.contextTypes = { router: React.PropTypes.func };
