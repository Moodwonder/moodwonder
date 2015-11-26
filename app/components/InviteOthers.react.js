import React from 'react';
import InviteActions from 'actions/InviteActions';
import InviteStore from 'stores/InviteStore';

/*
 * Component for Invite Others Widget
 *
 */
export default class InviteOthers extends React.Component {

	// Do same feature changes in MobileInvite component
    constructor(props) {
        super(props);
        this.state = InviteStore.getState();
        this.state.canSubmit = false;
        this.validationErrors = {};
    }

    componentDidMount() {
        InviteStore.listen(this._onChange);
    }

    componentWillUnmount() {
    }

    _onChange = (state) => {
        this.setState(state);
    }

    isValidEmailAddress = (emailAddress) => {
        let pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    }

    _onSaveSubmit = (model) => {

        let email = React.findDOMNode(this.refs.email).value.trim();
        if (this.isValidEmailAddress(email)) {
            let obj = {
                invitetype: 'Signup',
                email: email
            };
            InviteActions.invitePeople(obj);
        }else{
            this.setState({ message: 'Invalid email address', hasError: true });
        }
    }

    render() {
        let message;

        if (this.state.message !== '' ) {
            console.log(this.state.message);
            message = (
                <div className={ (this.state.hasError) ? 'ui red message' : 'ui info message' }>
                {this.state.message}
                </div>
            );
        }
        return (
        <div className="invite-people">
            <h2> L_INVITE_PEOPLE_TITLE </h2>
            <p> L_INVITE_PEOPLE_DES </p>
            <div className="ui input">
                <input placeholder=" L_INVITE_INPUT_PLCHOLDER " ref="email" type="text" />
            </div>
            <button className="ui orange button" onClick={this._onSaveSubmit} > L_INVITE_BTN </button>
            {message}
        </div>
        );
    }
}
