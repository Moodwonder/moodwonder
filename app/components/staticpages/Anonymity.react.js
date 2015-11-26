import React from 'react';
import Header from 'components/staticpages/Header.react';


export default class Anonymity extends React.Component {

  constructor (props) {
      super(props);
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  render () {

      return (
            <div className="pusher">
                <div className="ui inverted vertical masthead center aligned segment" style={{"backgroundColor": "#4db6ac"}}>
                    <Header />
                    <div className="ui text container">
                        <div className="banner-content">
                            <h2>Commitment to Anonymity</h2>
                        </div>
                    </div>
                </div>
                <div className="ui vertical stripe segment" style={{"background":"#ECEFF1"}}>
                    <div className="ui middle aligned stackable grid container">
                        <div className="sixteen wide column">
                            <div className="ui segment">
                                <h3>Anonymity</h3>
                            </div>
                            <p>We strongly believe that being anonymous helps provide honest and correct feedback. Managers who encourage their team members to provide continuos feedback, more so anonymously, build an honest and open atmosphere in the team which works wonders.</p>
                            <p>At Moodwonder, we commit ourselves to protect your anonymity and follow the below steps to ensure that it remains so:</p>
                            <ul>
                                <li>Your responses are always anonymous. The managers or your company HR administrator(s) can never see who gave which rating.</li>
                                <li> The additional comments you enter are always private, unless you want it to be shared. Even then the author of the comment remains anonymous.</li>
                                <li>The manager/ HR administrator(s) can't see who did and who did not rate his/her mood or answer the whole survey at Moodwonder. All they see is the aggregate user response, like 6 out of 10 team members rated their mood and engagement level.</li>
                            </ul>
                            <p>In addition to above, our privacy policy keeps it all confidential.</p>
                            <p>We do take anonymity very seriously and appreciate suggestions from both employers and employees to further enhance our commitment. If you have any questions, comments, or suggestions about how Moodwonder protects anonymity, please contact us directly at admin@moodwonder.com. Thanks!</p>
                        </div>
                    </div>
                </div>
            </div>
      );
  }

}


