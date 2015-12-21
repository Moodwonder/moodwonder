import React from 'react';
import RequireAuth from 'utils/requireAuth';
import PlacesActions from 'actions/PlacesActions';
import PlacesStore from 'stores/PlacesStore';
import { Link } from 'react-router';

export default RequireAuth(class Continents extends React.Component {
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
        PlacesActions.getPlaces({ placeType: 'continent', page: 1 });
        PlacesStore.listen(this._onChange);
    }

    componentDidUpdate(){
        $('.menu .item').tab();
    }

    _onChange = (state) => {

        console.log(state);
        this.pagination = state.PlacesList.pagination;
        state.rows = state.PlacesList.rows;
        if(this.state.ServerResponse){
            if(this.state.ServerResponse.message !== ''){
                state.message = this.state.ServerResponse.message;
            }
        }
        this.setState(state);
        this.messageAutoClose(state);
    }

    // Example Pagination
    // http://carlosrocha.github.io/react-data-components/
    onChangePage = (page) => {
        this.page = page;
        if(page){
            PlacesActions.getPlaces({ placeType: 'continent',page: page });
        }
    }

    _onUpdateContinents = (model) => {
        try{
            model.callback = model.teamid;
            model._id = model.teamid;
            model.place = model.teamname;
            model.placeType = 'continent';
            model.type = 'updatecontinent';
            PlacesActions.updatePlaces(model);
            PlacesStore.listen(this._onChange);
        }catch(e){
            console.log('Error in _onUpdateContinents');
        }
    }

    _onRemoveClick = (e) => {
        if(confirm('Are you sure ?')){
            PlacesActions.deletePlaces({ _id: e.target.dataset.tag, placeType: 'continent', type: 'deletecontinent' });
            PlacesActions.getPlaces({ placeType: 'continent', page: this.page });
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
        if (
            this.state.ServerResponse &&
            this.state.message !== '' &&
            (this.state.ServerResponse.type === 'updatecontinent'|| this.state.ServerResponse.type === 'deletecontinent')
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
                        <tr key={row._id}>
                            <td><Editable onSave={this._onUpdateContinents} teamid={row._id} value={row.name} /></td>
                            <td><Link to={ `/admin/countries/${row._id}/${row.name}` } className="navigation__item">View countries</Link></td>
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
            }
        }
        catch(err)
        {
            console.log(err);
        }

        return (
            <div className="ui container">
                <h1>All Countries</h1>
                <div className="ui top attached tabular menu">
                    <a className="item active" data-tab="first">Add Country</a>
                    <a className="item" data-tab="second">List Countries</a>
                </div>
                <div className="ui bottom attached tab segment active" data-tab="first">
                    <AddContinents />
                </div>
                <div className="ui bottom attached tab segment" data-tab="second">
                    <div>
                    {message}
                        <table className="ui celled table">
                            <tr>
                                <td>Name</td>
                                <td>Countries</td>
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

class AddContinents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.canSubmit = false;
    }

    _onChange = (state) => {
        //console.log(state);
        this.setState(state);
        this.messageAutoClose(state);
    }

    _onChangeText = (e) => {
        if(e.target.value && e.target.value.trim() !== ''){
            this.setState({ canSubmit: true });
        }
    }

    _onAddContinents = (model) => {
        let continent = React.findDOMNode(this.refs.continent).value.trim();
        PlacesActions.addPlaces({ place: continent, placeType: 'continent', type: 'addcontinent' });
        PlacesStore.listen(this._onChange);
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
        if (this.state.ServerResponse && this.state.message !== '' && this.state.ServerResponse.type === 'addcontinent') {
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
                        <form className="ui form">
                            <div className="field">
                                <label>Continent name</label>
                                <input type="text" className="form-control"  onChange={this._onChangeText} ref="continent" />
                            </div>
                            <div className="field">
                                <button type="button" className="ui blue button" onClick={this._onAddContinents} disabled={!this.state.canSubmit}>Submit</button>
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
