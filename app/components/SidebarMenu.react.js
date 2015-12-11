import React from 'react';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';


export default class SidebarMenu extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        mwkeys: MlangStore.getState().mwkeys
      };
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }


  render () {
      let mlarray = this.state.mwkeys;


      return (
            <div className="ui vertical inverted sidebar menu">
                    <a href="#" className="slide-side"></a>
                    <a className="active item" href="/mymood">
                        <i className="smile icon"></i>
                        {GetText('L_MYMOOD_LINK', mlarray)}
                    </a>
                    <a className="item" href="/myprofile">
                        <i className="setting icon"></i>
                        {GetText('L_MYACCOUNT_LINK', mlarray)}
                    </a>
                    <a className="item" href="/mycompany">
                        <i className="building icon"></i>
                        {GetText('L_MYCOMPANY_LINK', mlarray)}
                    </a>
                    <a className="item" href="/moodrate">
                        <i className="building icon"></i>
                        {GetText('L_MOODRATE', mlarray)}
                    </a>
                    <a className="item" href="/invitepeople">
                        <i className="building icon"></i>
                        {GetText('L_INVITEPEOPLE', mlarray)}
                    </a>
            </div>
      );
  }

}


