import React from 'react';


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
                            <div className="six wide column">
                                <div className="ui segment slideExpandUp ">
                                    <div className="ui input">
                                        <input placeholder="REGISTER HERE ITS FREE " type="text" />
                                    </div>
                                    <button className="ui orange button "> <span className="pulse">GET STARTED</span></button>
                                </div>
                            </div>
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
                                    <h2 >ENGAGING EMPLOYEES</h2>
                                    <div className="images-container">
                                        <img src="/assets/images/1.png" alt="pc" className="img-boy" />
                                        <img src="/assets/images/2.png" alt="pc" className="img-boy-2 "/> </div>
                                </div>
                            </div>
                            <div className="eight wide column">
                                <div className="ui segment slideRight ">
                                    <h3>Curabitur eu nulla eget ligula laoreet auctor. Integer eu ultricies justo. Integer tortor nunc, tempor rutrum elementum vel, porttitor ac leo. </h3>
                                    <div className="ui divided items">
                                        <div className="item">
                                            <div className="ui tiny image"> <i className="pointing right icon"></i> </div>
                                            <div className="middle aligned content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. </div>
                                        </div>
                                        <div className="item">
                                            <div className="ui tiny image"> <i className="pointing right icon"></i> </div>
                                            <div className="middle aligned content"> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div>
                                        </div>
                                        <div className="item">
                                            <div className="ui tiny image"> <i className="pointing right icon"></i> </div>
                                            <div className="middle aligned content"> Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>
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
                                    <h2 >GET STARTED</h2>
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
                                            <h3>Start a survey</h3>
                                        </div>
                                        <p>Provide your work email, fill the other details and you are ready! No installations!</p>
                                    </div>
                                </div>
                            </div>
                            <div id="object" className="column fade-in two ">
                                <div className="image" id="diamond"> <i className="bar chart icon"></i> </div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            <h3>View statistics</h3>
                                        </div>
                                        <p>See your company’s and team’s employee engagement statistics.</p>
                                    </div>
                                </div>
                            </div>
                            <div id="object" className="column fade-in three">
                                <div className="image" id="diamond"> <i className="star icon"></i> </div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            <h3>Compare the rankings</h3>
                                        </div>
                                        <p>See your company’s employee engagement ranking based on location, size and industry.</p>
                                    </div>
                                </div>
                            </div>
                            <div id="object" className="column fade-in four">
                                <div className="image" id="diamond"> <i className="share alternate icon"></i> </div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            <h3>Invite colleagues & friends</h3>
                                        </div>
                                        <p>Set up your manager, invite your team and your colleagues to get more detailed statistics for your company.</p>
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
                                    <h2 >Features</h2>
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
                                            <h3>Employee engagement</h3>
                                        </div>
                                        <p>Provide your work email, fill the other details and you are ready! No installations!</p>
                                    </div>
                                </div>
                            </div>
                            <div id="object" className="column fade-in two ">
                                <div className="image" id="diamond">
                                    <i className="smile icon"></i> </div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            <h3>Mood Rating</h3>
                                        </div>
                                        <p>See your company’s and team’s employee engagement statistics.</p>
                                    </div>
                                </div>
                            </div>
                            <div id="object" className="column fade-in three">
                                <div className="image" id="diamond"> <i className="area chart icon"></i></div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            <h3>Custom Survey</h3>
                                        </div>
                                        <p>See your company’s employee engagement ranking based on location, size and industry.</p>
                                    </div>
                                </div>
                            </div>
                            <div id="object" className="column fade-in four">
                                <div className="image" id="diamond"> <i className="pie chart icon"></i></div>
                                <div className="ui fluid card">
                                    <div className="content">
                                        <div className="header">
                                            <h3>Company Stats</h3>
                                        </div>
                                        <p>Set up your manager, invite your team and your colleagues to get more detailed statistics for your company.</p>
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
                                    <h2 >Why Moodwonder?</h2>
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
                                        <h3>Measure</h3>
                                    </span> <span>
                                        <p>Moodwonder invests time where it counts the most. Employee assessments performed once or twice a year don’t provide an accurate account of your staff’s attitude or what they need to improve. If anything, it sets up false results. Our state-of-the-art system monitors your workforce on a continual basis, collecting the data you really need to lead them to greatness.</p>
                                    </span> </div>
                                <div className="column fade-in two">
                                    <div className="image" id="diamond"><i className="line chart icon"></i> </div>
                                    <span>
                                        <h3>Improve</h3>
                                    </span> <span>
                                        <p>Moodwonder can help you by giving you the data you need – when it’s needed the most. Improve your team performance, on a group and individual level, by ferreting out the details supporting your success. Discover the keys to culture enhancement for your unique operation, and stop wasting resources on traditional assessments than no longer suit today’s marketplace.</p>
                                    </span> </div>
                            </div>
                            <div className="row">
                                <div className="column fade-in three">
                                    <div className="image" id="diamond"> <i className="student icon"></i> </div>
                                    <span>
                                        <h3> Learn</h3>
                                    </span> <span>
                                        <p>Computers aren’t swayed by long days, pressing deadlines or personality conflicts, and they have a way of noticing those issues that human radar can miss. Let us break down the stats behind your company culture, and analyze them for chances to grow. Our day-by-day tracking provides you with the opportunity for continuous improvement.</p>
                                    </span> </div>
                                <div className="column fade-in four">
                                    <div className="image" id="diamond"> <i className="trophy icon"></i> </div>
                                    <span>
                                        <h3>Create loyalty</h3>
                                    </span> <span>
                                        <p>Middle AligneIn the past, companies hired for life, and it wasn’t rare for someone to work 30 or more years for the same business. That kind of relationship created a close bond between staff and management that is rarely seen today. Managers can’t rely on a paycheck to create loyalty. Their relationships with staff members are the number one motivator behind engagement – and in disengagement as well. </p>
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
                                    <h2>Sneak Peek</h2>
                                    <div className="images-container"> </div>

                                </div>
                            </div>
                        </div>
                        <div className="ui four column stackable grid container ">
                            <div className="column expandOpen one fadeIn"> <img className="ui medium circular image" src="/assets/images/dashboard-1.png" /></div>
                            <div className="column expandOpen two fadeIn"><img className="ui medium circular image" src="/assets/images/dashboard-2.png" /></div>
                            <div className="column expandOpen three fadeIn"> <img className="ui medium circular image" src="/assets/images/dashboard-1.png" /></div>
                            <div className="column expandOpen four fadeIn"><img className="ui medium circular image" src="/assets/images/dashboard-2.png" /></div>
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
                                    <h2>Request a Demo</h2>
                                    <div className="images-container"> </div>
                                </div>
                            </div>
                        </div>
                        <div className="ui stackable three column grid  container items ">
                            <div className="four wide column"></div>
                            <div className="eight wide column fade-in one">
                                <div className="ui segment">


                                    <div className="row"><div className=" ui small form">
                                            <div className="field">
                                                <label>Name</label>
                                                <input placeholder="Name" type="text" />
                                            </div>
                                            <div className="field">
                                                <label>Email</label>
                                                <input placeholder="Email" type="email" />
                                            </div>

                                            <div className="field">
                                                <label>Mobile</label>
                                                <input placeholder="Mobile" type="text" />
                                            </div>

                                            <div className="field">
                                                <label>What exactly are you looking for?</label>
                                                <textarea></textarea>
                                            </div>

                                            <button className="ui orange button "> <span className="pulse">Submit</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

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


