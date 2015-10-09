import React from 'react';


export default class FullStar extends React.Component {

  constructor (props) {
      super(props);
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  render () {
      let star = this.props.star;

      return (
          <i className={"icon active  "+ star}></i>
      );
  }

}


