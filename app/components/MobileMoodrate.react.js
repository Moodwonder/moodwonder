import React from 'react';


export default class MobileMoodrate extends React.Component {

  constructor (props) {
      super(props);
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }


  render () {

      return (
            <div className="ui segment padding-none width-header rate header-middle-container">
                <div className="">
                    <h2>RATE YOUR MOOD</h2>
                    <p>How are you feeling at work today?</p>
                </div>
                <div className="ui slider range ">
                    <input type="range" />
                </div>
                <div  className="">
                    <button className="ui yellow button" style={{"margin": "0 auto !important"}}>Submit</button>
                </div>
                <div  className="">
                    <button className="ui yellow button answer positive" style={{"margin": "0 auto !important", "marginTop" : "12px !important"}}>Answer all statements</button>
                </div>
            </div>
      );
  }

}


