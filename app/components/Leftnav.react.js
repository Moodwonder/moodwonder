import React from 'react';


export default class Leftnav extends React.Component {

  constructor (props) {
      super(props);
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }


  render () {

      return (
        <div className="leftbar">
            <ul>
		<li>My Profile</li>
		<li>My Team</li>
		<li>My Company</li>
            </ul>
	</div>
      );
  }

}


