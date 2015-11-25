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
                    <a className="active item" href="/mymood">
                        <i className="smile icon"></i>
                        My Mood
                    </a>
                    <a className="item" href="/myprofile">
                        <i className="setting icon"></i>
                        My Account
                    </a>
                    <a className="item" href="/mycompany">
                        <i className="building icon"></i>
                        My Company
                    </a>
                    <a className="item" href="/moodrate">
                        <i className="building icon"></i>
                        Mood Rate
                    </a>
                    <a className="item" href="/invitepeople">
                        <i className="building icon"></i>
                        Invite People
                    </a>
            </div>
      );
  }

}


