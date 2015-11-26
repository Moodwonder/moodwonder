import React from 'react';
import Header from 'components/staticpages/Header.react';


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
                    <Header />
                    <div className="ui text container">
                        <div className="banner-content">
                            <h2>ABT_BNNR_TITLE</h2>
                            <div className="ui huge primary button">ABT_BNNR_STARTED <i className="right arrow icon"></i></div>
                        </div>
                    </div>
                </div>
                <div className="ui vertical stripe segment">
                    <div className="ui middle aligned stackable grid container">
                        <div className="sixteen wide column">
                            <div className="ui segment">
                                <h3>ABT_ABOUTUS</h3>
                            </div>
                            <p>ABT_ABTUS_PARA1</p>
                            <p>ABT_ABTUS_PARA2</p>
                            <p>ABT_ABTUS_PARA3</p>
                            <p>ABT_ABTUS_PARA4</p>
                            <p>ABT_ABTUS_PARA5</p>
                        </div>
                    </div>
                </div>
                <div className="ui vertical stripe segment" style={{"background":"#ECEFF1"}}>
                    <div className="ui middle aligned stackable grid container">
                        <div className="row">
                            <div className="sixteen wide column">
                                <h3 className="ui header">ABT_PEOPLE_BEHIND</h3>
                                <p>ABT_PPL_BHD_DES</p>
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


