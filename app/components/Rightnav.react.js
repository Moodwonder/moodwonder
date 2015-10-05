import React from 'react';


export default class Rightnav extends React.Component {

  constructor (props) {
      super(props);
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }


  render () {

      return (
        <div className="rightbar">
             <div className="ui right fixed vertical menu ryt right-menu">
        <div className="ui segment ryt brdr-none">
            <div className="item ryt">
            <div className="ui segment ryt brdr-none">
                <h4 className="ui header ryt">Quick statistics</h4>
                <div className="ui segment padding-10"> Number of employees <span className="employees">8</span></div>
                <div className="ui segment padding-20 "> Employees at risk<span className="risk">6</span></div>
                <div className="ui segment padding-30 "> Destiny Higgins <span className="last-month">3</span></div>
              </div>
          </div>
            <div className="item ryt">
            <h4 className="ui header ryt">Time since last response</h4>
            <div className="ui two column stackable grid  ">
                <div className="three column row padding-top  ">
                <div className="column padding-ryt">
                    <div className="ui segment red-time">
                    <p>2Days</p>
                  </div>
                  </div>
                <div className="column padding-ryt">
                    <div className="ui segment red-time">
                    <p>5Hrs</p>
                  </div>
                  </div>
                <div className="column padding-ryt">
                    <div className="ui segment red-time">
                    <p>32Mins</p>
                  </div>
                  </div>
              </div>
              </div>
          </div>
            <div className="item ryt">
            <h4 className="ui header ryt">Response comparison</h4>
            <p><img src="images/mood-graph.png" alt="" className="wide"/></p>
          </div>
          </div>
      </div>
	</div>
      );
  }

}


