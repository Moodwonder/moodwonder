import React from 'react';


export default class SidebarMenu extends React.Component {

  constructor (props) {
      super(props);
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }


  render () {

      return (
            <div className="ui vertical inverted sidebar menu">
                    <a href="#" className="slide-side"></a>
                    <a className="active item">
                        <i className="smile icon"></i>
                        My Mood
                    </a>
                    <a className="item">
                        <i className="setting icon"></i>
                        My Account
                    </a>
                    <a className="item">
                        <i className="building icon"></i>
                        My Company
                    </a>
            </div>
      );
  }

}


