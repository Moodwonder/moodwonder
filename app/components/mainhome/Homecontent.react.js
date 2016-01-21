import React from 'react';
import Signup from 'components/Signup.react';
import RequestDemo from 'components/RequestDemo.react';

export default class Homecontent extends React.Component {

  constructor (props) {
      super(props);
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  render () {

      return (
          <div id="fullpage">
            <div className="section " id="section0">
                <div className="intro">
                    <div className=" ui container">
                        <div className="ui middle aligned stackable grid container">
                            <div className="ten wide column">
                                <div className="ui segment">
                                    <div className="images-container"><img src="/assets/images/whiteman-tab.png" alt="pc" className="tab slideUp " id="object"/> <img src="/assets/images/white-man.png" alt="pc" className="man hatch " id="object"  /> </div>
                                </div>
                            </div>
                            <Signup />
                        </div>
                    </div>
                </div>
            </div>
            <div className="section" id="section1">
                <div className="intro">
                    <div className=" ui container">
                        <div className="ui middle aligned stackable grid container">
                            <div className="eight wide column">
                                <div className="ui segment">
                                    <h2 >HOM_2_TITLE_1</h2>
                                    <div className="images-container">
                                        <img src="/assets/images/1.png" alt="pc" className="img-boy" />
                                        <img src="/assets/images/2.png" alt="pc" className="img-boy-2 "/> </div>
                                </div>
                            </div>
                            <div className="eight wide column">
                                <div className="ui segment slideRight ">
                                    <h3> HOM_2_TITLE_2 </h3>
                                    <div className="ui divided items palm-container">
                                        <div className="item">
                                            <div className="ui tiny image" style={{"height":"auto !important"}}> <i className="pointing right icon"></i></div>
                                            <div className="middle aligned content">HOM_2_ITEM_1</div>
                                        </div>
                                        <div className="item">
                                            <div className="ui tiny image" style={{"height":"auto !important"}}> <i className="pointing right icon"></i></div>
                                            <div className="middle aligned content">HOM_2_ITEM_2</div>
                                        </div>
                                        <div className="item">
                                            <div className="ui tiny image" style={{"height":"auto !important"}}> <i className="pointing right icon"></i></div>
                                            <div className="middle aligned content">HOM_2_ITEM_3</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section" id="section2">
                <div className="intro">
                    <div className=" ui container">
                        <div className="ui stackable two column grid container">
                            <div className="eight wide column">
                                <div className="ui segment">
                                    <h2> HOM_3_TITLE_1 </h2>
                                    <div className="images-container"> </div>
                                </div>
                            </div>
                        </div>
                        <div className="ui stackable four column grid container">
                            <div id="object" className="column fade-in one  ">
                                <div className="image" id="diamond"> <i className="location arrow icon"></i> </div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            <h3> HOM_3_BOX_1_TITLE_1 </h3>
                                        </div>
                                        <p> HOM_3_BOX_1_CONTENT </p>
                                    </div>
                                </div>
                            </div>
                            <div id="object" className="column fade-in two ">
                                <div className="image" id="diamond"> <i className="bar chart icon"></i> </div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            <h3>HOM_3_BOX_2_TITLE_1</h3>
                                        </div>
                                        <p> HOM_3_BOX_2_CONTENT </p>
                                    </div>
                                </div>
                            </div>
                            <div id="object" className="column fade-in three">
                                <div className="image" id="diamond"> <i className="star icon"></i> </div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            <h3> HOM_3_BOX_3_TITLE_1 </h3>
                                        </div>
                                        <p> HOM_3_BOX_3_CONTENT </p>
                                    </div>
                                </div>
                            </div>
                            <div id="object" className="column fade-in four">
                                <div className="image" id="diamond"> <i className="share alternate icon"></i> </div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            <h3> HOM_3_BOX_4_TITLE_1 </h3>
                                        </div>
                                        <p> HOM_3_BOX_4_CONTENT </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section" id="section5">
                <div className="intro">
                    <div className=" ui container">
                        <div className="ui stackable two column grid container">
                            <div className="eight wide column">
                                <div className="ui segment">
                                    <h2 >HOM_4_TITLE_1</h2>
                                    <div className="images-container"> </div>
                                </div>
                            </div>
                        </div>
                        <div className="ui stackable four column grid container">
                            <div id="object" className="column fade-in one  ">
                                <div className="image" id="diamond"> <i className="comments outline icon"></i> </div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            <h3> HOM_4_BOX_1_TITLE_1 </h3>
                                        </div>
                                        <p> HOM_4_BOX_1_CONTENT </p>
                                    </div>
                                </div>
                            </div>
                            <div id="object" className="column fade-in two ">
                                <div className="image" id="diamond">
                                    <i className="smile icon"></i> </div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            <h3> HOM_4_BOX_2_TITLE_1 </h3>
                                        </div>
                                        <p> HOM_4_BOX_2_CONTENT </p>
                                    </div>
                                </div>
                            </div>
                            <div id="object" className="column fade-in three">
                                <div className="image" id="diamond"> <i className="area chart icon"></i></div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            <h3> HOM_4_BOX_3_TITLE_1 </h3>
                                        </div>
                                        <p> HOM_4_BOX_3_CONTENT </p>
                                    </div>
                                </div>
                            </div>
                            <div id="object" className="column fade-in four">
                                <div className="image" id="diamond"> <i className="pie chart icon"></i></div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            <h3> HOM_4_BOX_4_TITLE_1 </h3>
                                        </div>
                                        <p> HOM_4_BOX_4_CONTENT </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section" id="section3">
                <div className="intro">
                    <div className="ui container">
                        <div className="ui stackable two column grid  container items ">
                            <div className="eight wide column">
                                <div className="ui segment">
                                    <h2> HOM_5_TITLE_1 </h2>
                                    <div className="images-container"> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ui container transition visible">
                        <div className="ui stackable two column  grid container ">
                            <div className="row">
                                <div className="column fade-in one">
                                    <div className="image" id="diamond"> <i className="wizard icon"></i></div>
                                    <span>
                                        <h3> HOM_5_BOX_1_TITLE_1 </h3>
                                    </span> <span>
                                        <p> HOM_5_BOX_1_CONTENT </p>
                                    </span> </div>
                                <div className="column fade-in two">
                                    <div className="image" id="diamond"><i className="line chart icon"></i> </div>
                                    <span>
                                        <h3> HOM_5_BOX_2_TITLE_1 </h3>
                                    </span> <span>
                                        <p> HOM_5_BOX_2_CONTENT </p>
                                    </span> </div>
                            </div>
                            <div className="row">
                                <div className="column fade-in three">
                                    <div className="image" id="diamond"> <i className="student icon"></i> </div>
                                    <span>
                                        <h3> HOM_5_BOX_3_TITLE_1 </h3>
                                    </span> <span>
                                        <p> HOM_5_BOX_3_CONTENT </p>
                                    </span> </div>
                                <div className="column fade-in four">
                                    <div className="image" id="diamond"> <i className="trophy icon"></i> </div>
                                    <span>
                                        <h3> HOM_5_BOX_4_TITLE_1 </h3>
                                    </span> <span>
                                        <p> HOM_5_BOX_4_CONTENT </p>
                                    </span> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section" id="section4">
                <div className="intro">
                    <div className="ui container">
                        <div className="ui stackable two column grid  container items ">
                            <div className="eight wide column">
                                <div className="ui segment">
                                    <h2> HOM_6_TITLE_1 </h2>
                                    <div className="images-container"> </div>

                                </div>
                            </div>
                        </div>
                        <div className="ui four column stackable grid container ">
                            <div className="column expandOpen one fadeIn"> <img className="ui medium circular image" src="/assets/images/sneak-peak-1.png" /></div>
                            <div className="column expandOpen two fadeIn"><img className="ui medium circular image" src="/assets/images/sneak-peak-2.png" /></div>
                            <div className="column expandOpen three fadeIn"> <img className="ui medium circular image" src="/assets/images/sneak-peak-3.png" /></div>
                            <div className="column expandOpen four fadeIn"><img className="ui medium circular image" src="/assets/images/sneak-peak-4.png" /></div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="section" id="section6">
                <div className="intro">
                    <div className="ui container transition visible">
                        <div className="ui stackable two column grid  container items ">
                            <div className="eight wide column">
                                <div className="ui segment">
                                    <h2> HOM_7_TITLE </h2>
                                    <div className="images-container"> </div>
                                </div>
                            </div>
                        </div>
                        <div className="ui stackable three column grid  container items ">
                            <div className="four wide column"></div>
                            <RequestDemo />
                            <div className="four wide column"></div>
                        </div>
                        <div className="ui two column stackable grid container ">

                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
  }

}


