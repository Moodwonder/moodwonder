import React from 'react';
import MyProfile from 'components/MyProfile.react';


export default class Tabs extends React.Component {

  constructor(props) {
      super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  tabHandler = (event) => {
      console.log(event);
  }

  render() {

      let activeClass = "tab-pane fade in active";

      return (
          <div className="container">
              <h2>Dynamic Tabs</h2>
              <ul className="nav nav-tabs">
                  <li className="active"><a data-toggle="tab" onClick={this.tabHandler} >Home</a></li>
                  <li><a data-toggle="tab" onClick={this.tabHandler("menu1")} >Menu 1</a></li>
                  <li><a data-toggle="tab" onClick={this.tabHandler("menu2")} >Menu 2</a></li>
                  <li><a data-toggle="tab" onClick={this.tabHandler("menu2")} >Menu 3</a></li>
              </ul>

            <div className="tab-content">
              <div id="home" className={activeClass}>
                <h3>HOME</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div id="menu1" className="tab-pane fade">
                <h3>Menu 1</h3>
                <MyProfile />
              </div>
              <div id="menu2" className="tab-pane fade">
                <h3>Menu 2</h3>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
              </div>
              <div id="menu3" className="tab-pane fade">
                <h3>Menu 3</h3>
                <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              </div>
            </div>
        </div>
        );
  }
}
