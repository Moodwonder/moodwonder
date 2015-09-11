import React from 'react';

export default class SliderRow extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
          moodrate: ''
      };
  }

  onChangeMood = (e) => {
      e.preventDefault();
      let moodrate = e.target.value;
      this.setState({moodrate: moodrate});
  }

  render () {
      let mood = this.props.mood;
      let description = this.props.description;
      let slno = this.props.slno;
      let moodrate = (this.state.moodrate) ? this.state.moodrate : ((this.props.lastrated) ? this.props.lastrated : 3.7 );
      let lastrated = this.props.lastrated;
      let lastratedvalue;

      if(lastrated) {
          lastratedvalue = (<span>{'Last rated - ' + lastrated}</span>);
      }


      return (
        <div className="row">
            <div className="col-sm-6" >{slno}. {mood} : {description}</div>
            <div className="col-sm-6" >
              <label>{moodrate}</label>
              <br/>
              <input type="range" name={mood} max="5" min="1" value={moodrate} step="0.1" onChange={this.onChangeMood} />
              <br/>
              {lastratedvalue}
            </div>
        </div>
    );
  }
}
