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
      //let slno = this.props.slno;
      let moodrate = (this.state.moodrate) ? this.state.moodrate : ((this.props.lastrated) ? this.props.lastrated : 3.7 );
      //let lastrated = this.props.lastrated;
      //let lastratedvalue;

      //if(lastrated) {
      //    lastratedvalue = (<span>{'Last rated - ' + lastrated}</span>);
      //}


      return (
                <div className="ui three column doubling stackable grid container labeled button" tabIndex="0">
                    <div className="ui yellow button column">{mood}</div>
                    <div className="ui basic yellow left pointing label column"> {description} </div>
                    <div className="mood-slider column">
                        <div className="ui slider range">
                            <input type="range" name={mood} max="5" min="1" value={moodrate} step="0.1" onChange={this.onChangeMood} />
                        </div>
                    </div>
                </div>
      );
  }
}
