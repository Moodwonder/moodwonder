import React from 'react';

export default class NavSlider extends React.Component {

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
      let moodrate = (this.state.moodrate) ? this.state.moodrate : ((this.props.lastrated) ? this.props.lastrated : 3.7 );
      let lastrated = this.props.lastrated;
      let lastratedvalue = '';

      if(lastrated) {
          lastratedvalue = 'Last rated : ' + lastrated;
      }


      return (
              <input type="range" name="moodrate" max="5" min="1" value={moodrate} step="0.1" title={lastratedvalue} onChange={this.onChangeMood} />
      );
  }
}
