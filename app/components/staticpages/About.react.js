import React from 'react';


export default class About extends React.Component {

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
                <div className="ui inverted vertical masthead center aligned segment" style={{"backgroundColor":"#4db6ac"}}>
                    <header className="entry-header ui menu">
                        <div style={{"display":"flex!important"}} className="">
                            <div className="ui container"> <a className="item " href="main-home.html"><img src="assets/images/logo-mw.png" alt=""/></a>
                                <div className="right menu">
                                    <div className="item padding-row">
                                        <div className="ui icon top  pointing dropdown  "> <span>Language</span>
                                            <div className="menu">
                                                <div className="item">EN</div>
                                                <div className="item">FI</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item ">
                                        <div className="ui icon top right pointing dropdown  "> <span><i className="sidebar icon"></i></span>
                                            <div className="menu">
                                                <div className="item">Sign in </div>
                                                <div className="item">Register</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="ui text container">
                        <div className="banner-content">
                            <h2>Moodwonder is a brainchild of passionate IT Professionals with global experience.</h2>
                            <div className="ui huge primary button">Get Started <i className="right arrow icon"></i></div>
                        </div>
                    </div>
                </div>
                <div className="ui vertical stripe segment">
                    <div className="ui middle aligned stackable grid container">
                        <div className="sixteen wide column">
                            <div className="ui segment">
                                <h3>About Us</h3>
                            </div>
                            <p>Having worked in various global organizations in different parts of the world, we felt that the most important missing link in personal and organization development in all these companies was - 'How are the employees and team members feeling?'. Of course, there are those annual or biannual satisfaction and/or engagement surveys, but they provide information too little and too late. And the policies based on those survey results lose their relevance or impact by the time those are rolled-out.</p>
                            <p> We at Moodwonder are trying to fill the gap between what’s happening on the ground and what needs to be done to have a happy work environment. The feedbacks from the employees should be short, accurate and instant. Our tool can be used by companies of all sizes, that are looking for feedback and suggestions to help them better understand their employees.</p>
                            <p> You can compare your organization on the scale of employee engagement with other similar companies in your industry, your city/area/country or depending on the employee strength. Again, you don’t need to wait for those annual rankings.</p>
                            <p> We also recognize the need for anonymity and privacy in this increasingly open and information rich age we live in. We have a Commitment to Anonymity to keep the survey results absolutely anonymous. We encourage everyone to participate and share their opinions in a comfortable and honest way. </p>
                            <p> Aiming to create a happy and engaging work environment and to build great leaders!!</p>
                        </div>
                    </div>
                </div>
                <div className="ui vertical stripe segment" style={{"background":"#ECEFF1"}}>
                    <div className="ui middle aligned stackable grid container">
                        <div className="row">
                            <div className="sixteen wide column">
                                <h3 className="ui header">People behind Moodwonder</h3>
                                <p>Meet the team which wants to create truly engaging and motivating work environments.</p>
                            </div>
                        </div>
                        <div className="ui four cards about  wide ">
                            <div className="ui card four wide column">
                                <div className="blurring dimmable image">
                                    <div className="ui dimmer">
                                        <div className="content">
                                            <div className="center">
                                                <div className="ui inverted button"><i className="linkedin square icon huge"></i> <i className="twitter square icon huge"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <img className="ui medium circular image" src="assets/images/kimmo.png" alt="" /> </div>
                                <div className="content">
                                    <h2><a className="header">Kimmo</a> </h2>
                                </div>
                            </div>
                            <div className="ui card four wide column">
                                <div className="blurring dimmable image">
                                    <div className="ui dimmer">
                                        <div className="content">
                                            <div className="center">
                                                <div className="ui inverted button"><i className="linkedin square icon huge"></i> <i className="twitter square icon huge"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <img className="ui medium circular image" src="assets/images/ankur.png" alt="" /> </div>
                                <div className="content">
                                    <h2><a className="header">Ankur</a> </h2>
                                </div>
                            </div>
                            <div className="ui card four wide column">
                                <div className="blurring dimmable image">
                                    <div className="ui dimmer">
                                        <div className="content">
                                            <div className="center">
                                                <div className="ui inverted button"><i className="linkedin square icon huge"></i> <i className="twitter square icon huge"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <img className="ui medium circular image" src="assets/images/ujjwal.png" alt="" /> </div>
                                <div className="content">
                                    <h2><a className="header">Ujjwal</a> </h2>
                                </div>
                            </div>
                            <div className="ui card four wide column">
                                <div className="blurring dimmable image">
                                    <div className="ui dimmer">
                                        <div className="content">
                                            <div className="center">
                                                <div className="ui inverted button"><i className="linkedin square icon huge"></i> <i className="twitter square icon huge"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <img className="ui medium circular image" src="assets/images/vasanth.png" alt="" /> </div>
                                <div className="content">
                                    <h2><a className="header">Vasanth</a></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      );
  }

}


