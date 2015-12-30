import React from 'react';
import RequireAuth from 'utils/requireAuth';
import PlacesActions from 'actions/PlacesActions';
import PlacesStore from 'stores/PlacesStore';

export default RequireAuth(class States extends React.Component {
    constructor(props) {
        super(props);
        this.state = PlacesStore.getState();
        this.state.rows = [];
        this.state.currentPage = 0;
        this.state.totalPages = [];
        this.state.modal = false;
        this.state.PlacesList = false;

        this.hasData = false;
        this.rows = false;
        this.header = [];
        this.pagination = [];
        this.page = 0;
    }

    componentDidMount(){
        PlacesActions.getPlaces({ _id: this.props.params.id, placeType: 'city', page: 1 });
        PlacesStore.listen(this._onChange);
    }

    componentDidUpdate(){
        $('.menu .item').tab();
    }

    _onChange = (state) => {

        if(state.PlacesList.rows){
            this.pagination = state.PlacesList.pagination;
            state.rows = state.PlacesList.rows;
            if(this.state.ServerResponse){
                if(this.state.ServerResponse.message !== ''){
                    state.message = this.state.ServerResponse.message;
                }else{
                    state.message = '';
                }
            }
            this.setState(state);
            this.messageAutoClose(state);
        }else{
            state.rows = [];
            this.setState(state);
            this.messageAutoClose(state);
        }
    }

    // Example Pagination
    // http://carlosrocha.github.io/react-data-components/
    onChangePage = (page) => {
        this.page = page;
        if(page){
            PlacesActions.getPlaces({ placeType: 'city', _id: this.props.params.id, page: page });
        }
    }

    _onUpdatecity = (model) => {
        model._id       =  model.teamid;
        model.place     =  model.teamname;
        model.placeType =  'city';
        model.type      =  'updatecity';
        PlacesActions.updatePlaces(model,this.props.params.id); // Second parameter used to fetch the updated list of countries
        PlacesStore.listen(this._onChange);
    }

    _onRemoveClick = (e) => {
        if(confirm('Are you sure ?')){
            let params = {
                _id: e.target.dataset.tag,
                placeType: 'city',
                type: 'deletecity'
            };
            PlacesActions.deletePlaces(params,this.props.params.id); // Second parameter used to fetch the updated list of countries
            PlacesActions.getPlaces({ placeType: 'city', page: this.page });
        }
    }

    messageAutoClose = (state) => {
        if(state.message !== ''){
            setTimeout(function(){
                this.setState({ message: '' });
            }.bind(this),3000);
        }
    }

    render() {

        let rows;
        let pagination;
        let message;

        if (this.state.hasError && this.state.message !==''){
            message = (
                <div className="ui error message segment">
                    <ul className="list">
                        <li>{this.state.message}</li>
                    </ul>
                </div>
            );
        }

        if (
            this.state.ServerResponse &&
            this.state.message !== '' &&
            (this.state.ServerResponse.type === 'updatecity'|| this.state.ServerResponse.type === 'deletecity')
        ) {
            message = (
                <div className="ui error message segment">
                    <ul className="list">
                        <li>{this.state.message}</li>
                    </ul>
                </div>
            );
        }

        try
        {
            if(this.state.rows !== undefined){
                rows = this.state.rows.map((row, key) => {
                    // console.log(row);
                    this.hasData = true;
                    return (
                        <tr key={(key+1)}>
                            <td><Editable onSave={this._onUpdatecity} teamid={row._id} value={row.name} /></td>
                            <td><button type="button" data-tag={row._id} onClick={this._onRemoveClick} className="btn btn-default" >Delete</button></td>
                        </tr>
                    );
                });

                let pages = this.pagination.map((data, key) => {
                    return [<a className="item" onClick={this.onChangePage.bind(this,data.page)}>{data.text}</a>];
                });
                //console.log(this.pagination);
                pagination = (
                    <div className="ui pagination menu">
                        {pages}
                    </div>
                );
            }else{
                rows = (
                    <tr key="1">
                        <td colSpan="3" style={{'textAlign':'center'}}>No data</td>
                    </tr>
                );
            }
        }
        catch(err)
        {
            console.log(err);
        }

        return (
            <div className="ui container">
                <h1>All Cities under {this.props.params.state}</h1>
                <div className="ui top attached tabular menu">
                    <a className="item active" data-tab="first">Add City</a>
                    <a className="item" data-tab="second">List Cities</a>
                </div>
                <div className="ui bottom attached tab segment active" data-tab="first">
                    <Addcities data={ {stateID: this.props.params.id} }/>
                </div>
                <div className="ui bottom attached tab segment" data-tab="second">
                    <div>
                    {message}
                        <table className="ui celled table">
                            <tr key="0">
                                <td>Name</td>
                                <td>Actions</td>
                            </tr>
                            {rows}
                        </table>
                        {pagination}
                    </div>
                </div>
            </div>
        );
    }
});

class Editable extends React.Component {

  constructor(props) {
      super(props);
      this.state =
          {
            Edit: false,
            value:props.value,
            btnDisabled: true
          };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(e) {
      // to set default
      this.setState({Edit: false, value: this.props.value });
  }

  changeValue = (event) => {

      let btnDisabled = true;
      if(this.props.value !== event.target.value){
          btnDisabled = false;
      }
      this.setState({value:event.target.value, btnDisabled: btnDisabled});
  }

  onEditClick = () => {
      this.setState({ Edit: true, value: this.props.value });
  }

  onSaveClick = (teamname,teamid) => {

      if(this.props.value !== this.state.value && teamname.trim() !== ''){
          this.props.onSave({teamname:teamname,teamid:teamid});
      }
  }

  render() {

      let buttonlabel = 'Edit';

      let inputORLable = (
        <label htmlFor="email">{this.props.value}</label>
      );

      let actionButton = (
        <button type="button" className="btn btn-default" onClick={this.onEditClick} >{buttonlabel}</button>
      );

      if(this.state.Edit){
          buttonlabel  = 'Save';
          inputORLable = (
            <input type="text" className="form-control" ref="email"  onChange={this.changeValue} value={this.state.value} />
          );

          actionButton = (
            <button type="button" disabled={this.state.btnDisabled} className="btn btn-default" onClick={this.onSaveClick.bind(this,this.state.value,this.props.teamid)} >{buttonlabel}</button>
          );
      }

      return (
        <div className="row">
           {inputORLable}
           {actionButton}
        </div>
      );
  }
}

class Addcities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.canSubmit = false;
    }

    _onChange = (state) => {
        //console.log(state);
        this.setState(state);
        this.messageAutoClose(state);
        if(state.ServerResponse.status){
            React.findDOMNode(this.refs.city).value = '';
        }
    }

    _onChangeText = (e) => {
        if(e.target.value && e.target.value.trim() !== ''){
            this.setState({ canSubmit: true });
        }else{
            this.setState({ canSubmit: false });
        }
    }

    _onAddcity = (e) => {

        let stateID = this.props.data.stateID;
        let city    = React.findDOMNode(this.refs.city).value.trim();
        PlacesActions.addPlaces({ _id: stateID, placeType: 'city', type: 'addcity', action: 'add', place: city });
        PlacesStore.listen(this._onChange);
        e.preventDefault();
    }

    messageAutoClose = (state) => {
        if(state.message !== ''){
            setTimeout(function(){
                this.setState({ message: '' });
            }.bind(this),3000);
        }
    }

    render() {

        let message = null;
        if (this.state.ServerResponse && this.state.message !== '' && this.state.ServerResponse.type === 'addcity') {
            message = (
                <div className="ui error message segment">
                    <ul className="list">
                        <li>{this.state.message}</li>
                    </ul>
                </div>
            );
        }

        return (
            <div className="form-group">
                {message}
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form className="ui form" onSubmit={this._onAddcity}>
                            <div className="field">
                                <label>City name</label>
                                <input type="text" className="form-control"  onChange={this._onChangeText} ref="city" />
                            </div>
                            <div className="field">
                                <button type="button" className="ui blue button" onClick={this._onAddcity} disabled={!this.state.canSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="column"></div>
                    <div className="column"></div>
                </div>
            </div>
        );
    }
}
