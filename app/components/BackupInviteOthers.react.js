import React from 'react';
import { MyOwnInput } from 'components/Formsy-components';
import InviteActions from 'actions/InviteActions';
import InviteStore from 'stores/InviteStore';

/*
* Component for Invite Others Widget
*
*/
export default class InviteOthers extends React.Component {

    constructor(props) {
        super(props);
        this.state = InviteStore.getState();
        this.state.canSubmit = false;
        this.validationErrors = {};
    }

    componentDidMount() {
        InviteStore.listen(this._onChange);
    }

    enableButton = () => {
        this.setState({canSubmit: true});
    }

    disableButton = () => {
        this.setState({canSubmit: false});
    }

    _onChange = (state) => {
        this.setState(state);
    }

    _onSaveSubmit = (model) => {
        InviteActions.invitePeople(model);
    }

    render() {
        let message;

        if (this.state.message !== '' ) {
            console.log(this.state.message);
            message = (
                <div className={ (this.state.hasError) ? 'alert alert-warning' : 'alert alert-info' }>
                    {this.state.message}
                </div>
            );
        }
        return (
            <div className="row">
                <h4>Invite others</h4>
                {message}
                <Formsy.Form onValidSubmit={this._onSaveSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton} >

                    <MyOwnInput
                        name="email"
                        autocomplete="off"
                        className="form-control"
                        placeholder="Work Email"
                        validations="isEmail"
                        validationError="This is not a valid email"
                        required/>

                    <MyOwnInput
                        name="invitetype"
                        type="hidden"
                        value="Signup"
                        />

                    <button type="submit" className="btn btn-default"
                        disabled={!this.state.canSubmit}>Submit</button>
                </Formsy.Form>
            </div>
        );
    }
}
