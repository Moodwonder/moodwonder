import React from 'react';
import Header from 'components/staticpages/Header.react';


export default class Policy extends React.Component {

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
                <div className="ui inverted vertical masthead center aligned segment" style={{"background-color": "#4db6ac"}}>
                    <Header />
                    <div className="ui text container">
                        <div className="banner-content">
                            <h2></h2>
                        </div>
                    </div>
                </div>
                <div className="ui vertical stripe segment" style={{"background":"#ECEFF1"}}>
                    <div className="ui middle aligned stackable grid container">
                        <div className="sixteen wide column">
                            <div className="ui segment">
                                <h3>Privacy Policy</h3>
                            </div>
                            <p> We will not attempt to identify you, unless there is indication of survey duplication or survey fraud. When we do we will usually (but not always) ask you for more information, such as your address and phone.</p>
                            <p> We will never sell, distribute or disclose your email address, and/or your related personal information to another entity, without your permission. One exception, is if another company purchases all the assets of Moodwonder, and they abide by the same or more strict of a confidentiality agreement. </p>
                            <p> In some cases where we need to identity you, and for your anonymous profile, we will keep such information under the strictest of confidence.</p>
                            <p> The information you provide to us includes your first and last name, an email address (which in turn identifies your employer), as well as the responses you submit.</p>
                            <p> We also collect computer IP addresses, cookie data, and other data from your computer and network, which is normally insufficient to personally identify you.</p>
                            <p> We will only reveal your profile and submitted information to law enforcement as required by law or to pursue real or perceived damages you have made to the company. </p>
                        </div>
                    </div>
                </div>
            </div>
      );
  }

}


