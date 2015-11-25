import React from 'react';


export default class MobileInvite extends React.Component {

  constructor (props) {
      super(props);
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }


  render () {

      return (
            <div className="invite-people mobile">
                <h2>Invite people anonymously</h2>
                <p>Invite everyone anonymously in your network, friends, colleagues, your boss, ex-colleagues ...</p>
                <div className="ui input">
                    <input placeholder="Enter e-mail " type="text" />
                  </div>
                <button className="ui orange button">Invite</button>
            </div>
      );
  }

}


