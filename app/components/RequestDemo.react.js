import React from 'react';
import HomePageActions from 'actions/HomePageActions';
import HomePageStore from 'stores/HomePageStore';

export default class RequestDemo extends React.Component {

  constructor(props) {
      super(props);
      this.state = HomePageStore.getState();
  }

  componentDidMount() {
      HomePageStore.listen(this._onChange);
  }

  componentWillUnmount() {
      HomePageStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
      this.setState(state);
  }

  formSubmit = (e) => { e.preventDefault(); }


  isValidEmailAddress = (emailAddress) => {
      let pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
  }

  _demoFormSubmit = () => {

      let errorMsg = [];
      let name   = React.findDOMNode(this.refs.name).value.trim();
      let email  = React.findDOMNode(this.refs.email).value.trim();
      let mobile = React.findDOMNode(this.refs.mobile).value.trim();
      let text   = React.findDOMNode(this.refs.text).value.trim();

      if(name === ''){
          //errorMsg.push('Name is required');
          errorMsg[0] = 'Name is required';
      }
      if(errorMsg[0] != '' || !this.isValidEmailAddress(email)){
          //errorMsg.push('Invalid email id');
          errorMsg[0] = 'Invalid email id';
      }
      if(errorMsg[0] != '' || text === ''){
          errorMsg[0] = 'Please enter your requirements';
      }
      if(errorMsg.length === 0){
          HomePageActions.requestDemo({
                name: name,
                email: email,
                mobile: mobile,
                text: text
          });
      }else{
          this.setState({
            messages: errorMsg,
            hasErrorMessage: true
          });
      }
  }

  render() {
      // console.log(this.state);
      let multimessages;

      if (this.state.hasErrorMessage && this.state.messages) {
          multimessages = this.state.messages.map((mes, key) => {
              return [<li>{mes}</li>];
          });
          multimessages = (
            <div className="ui error message segment">
                <ul className="list">
                    {multimessages}
                </ul>
            </div>
          );
      }

      if (this.state.responseStatus) {
          multimessages = this.state.messages.map((mes, key) => {
              return [<li>{mes}</li>];
          });
          multimessages = (
            <div className="ui success message segment">
                <ul className="list">
                    {multimessages}
                </ul>
            </div>
          );
      }

      return (
        <div className="eight wide column fade-in one">
			<div className="ui segment">
				<div className="row">
					<div className=" ui small form">
						<div className="field">
							<label>HOM_7_NAME</label>
							<input ref="name" placeholder="Name" type="text" />
						</div>
						<div className="field">
							<label>HOM_7_EMAIL</label>
							<input ref="email" placeholder="Email" type="email" />
						</div>
						<div className="field">
							<label>HOM_7_MOBILE</label>
							<input ref="mobile" placeholder="Mobile" type="text" />
						</div>
						<div className="field">
							<label> HOM_7_LOOKING_FOR </label>
							<textarea ref="text"></textarea>
						</div>
						<button className="ui orange button"  onClick={this._demoFormSubmit} > <span className="pulse"> HOM_7_SUBMIT </span></button>
					</div>
				</div>
				
			</div>
			{multimessages}
        </div>
      );
  }
}

RequestDemo.propTypes = { user: {} };
