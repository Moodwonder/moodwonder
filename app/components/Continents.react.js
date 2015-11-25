import React from 'react';
import RequireAuth from 'utils/requireAuth';
import { MyOwnInput } from 'components/Formsy-components';
import PlacesActions from 'actions/PlacesActions';
import PlacesStore from 'stores/PlacesStore';
import Pagination from 'components/Pagination';
import Editable from 'components/Editable.react';
import { Link } from 'react-router';

export default RequireAuth(class Continents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        PlacesActions.getPlaces({ placeType: 'continent' });
        PlacesStore.listen(this._onChange);
    }

    _onChange = (state) => {
        console.log(state);
        this.setState(state);
    }

    onTabClick = (Tab) => {
        this.setState({ Tab: Tab });
    }

    render() {

        let Tab1     = [<AddContinents />];
        let Tab2;
        if(this.state.PlacesList){
            Tab2     = [<DataTable data={this.state.PlacesList}/>];
        }

        let activeTab = [];
        activeTab[0] = ['tab-pane fade',''];
        activeTab[1] = ['tab-pane fade',''];

        if( this.state.Tab !== undefined ){
            activeTab[this.state.Tab][0] += ' in active';
            activeTab[this.state.Tab][1] = 'active';
        }else{
            activeTab[0][0] += ' in active';
            activeTab[0][1] = ' active';
        }

        let message;
        if (this.state.message) {
            message = (
                <div className="login__container">
                      <fieldset className="login__fieldset">
                         <div className="alert alert-info">
                                {this.state.message}
                         </div>
                      </fieldset>
                </div>
            );
        }
        return (
            <div className="ui container">
                <h2>All Continents</h2>
                {message}
                <ul className="nav nav-tabs">
                    <li className={activeTab[0][1]}><a onClick={this.onTabClick.bind(this,0)} >Add Continents</a></li>
                    <li className={activeTab[1][1]}><a onClick={this.onTabClick.bind(this,1)} >List Continents</a></li>
                </ul>

                <div className="tab-content">
                  <div id="home" className={activeTab[0][0]}>
                   {Tab1}
                  </div>
                  <div id="menu1" className={activeTab[1][0]}>
                   {Tab2}
                  </div>
                </div>
            </div>
        );
    }
});

class AddContinents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.canSubmit = false;
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

    _onAddContinents = (model) => {
        let continent = model.continent.trim();
        PlacesActions.addPlaces({ place: continent, placeType: 'continent' });
        PlacesStore.listen(this._onChange);
    }

    render() {

        return (
            <div>
                <Formsy.Form onValidSubmit={this._onAddContinents} onValid={this.enableButton} onInvalid={this.disableButton} >
                   <MyOwnInput
                   name="continent"
                   className="form-control"
                   placeholder="Enter continent name"
                   required/>
                   <button type="submit" className="ui blue button" disabled={!this.state.canSubmit}>Submit</button>
                </Formsy.Form>
            </div>
        );
    }
}

class DataTable extends React.Component {

    constructor(props) {
        super(props);
        try{
            this.state = {
                rows: props.data.rows,
                currentPage: 0,
                totalPages: 0,
                modal: false,
                userTeams: false
            };
        }catch(err){
            console.log(err);
        }
        this.hasData = false;
        this.rows = false;
    }

    _onChange = (state) => {
        this.setState({ userTeams: state.userTeams });
    }

    _onUpdateContinents = (model) => {
        let params = { _id: model.teamid, place: model.teamname, placeType: 'continent' };
        PlacesActions.updatePlaces(params);
        PlacesStore.listen(this._onChange);
    }

    _onRemoveClick = (e) => {
        if(confirm('Are you sure ?')){
            PlacesActions.deletePlaces({ _id: e.target.dataset.tag, placeType: 'continent' });
        }
    }

    componentWillReceiveProps() {
        if(this.props.data){
            this.rows = this.props.data.rows;
            this.setTable(this.state.currentPage);
        }
    }

    setTable = (page) => {

        if(this.props.data){

            let totalPages = 0;
            // Data for the current page
            let rows = this.rows;

            if( this.props.data && this.rows !== undefined ){

                // find total rows
                let totalRows = this.rows.length;
                let rowsPerPage = 4;

                // find total pages
                totalPages = parseInt(totalRows/rowsPerPage);
                if( (totalRows % rowsPerPage) !== 0 ){
                    totalPages++;
                }

                //if no page var is given, set start to 0
                // start row
                let start = 0;

                if(page){
                    // first item to display on this page
                    start = page * rowsPerPage;
                    start++;
                    // console.log(start);
                }

                // End row
                let end = start + rowsPerPage;

                rows = [];
                for( let i = 0, dataIndex = start; dataIndex < end; dataIndex++, i++ ){
                    if(this.rows[dataIndex] !== undefined ){
                        rows[i] = this.rows[dataIndex];
                    }
                }
            }

            this.setState({
                rows: rows,
                totalPages: totalPages,
                currentPage: page
            });
        }
    }
    // Example Pagination
    // http://carlosrocha.github.io/react-data-components/
    onChangePage = (page) => {
        this.setTable((page));
    }

    render() {

        let header;
        let rows;
        let tableClass = this.props.data.class;

        try
        {
            if(this.state.rows !== undefined){
                header = this.props.data.header.map((data, key) => {
                    // Skip _id from display, It will only used as a document reference
                    if(data !== 'Id'){
                        return [<th>{data}</th>];
                    }
                });

                rows = this.state.rows.map((row, key) => {

                    this.hasData = true;
                    let columns = row.map((column, key) => {
                        // Skip column from display
                        if(column.display !== false && column.hasChild !== true){
                            let content = column.column;
                            if(column.Link === true){
                                content = ( <Link to={ `/admin/countries/${row[0].column}/${row[1].column}` } className="navigation__item">View countries</Link> );
                            }
                            if(column.edit === true){
                                content = ( <Editable onSave={this._onUpdateContinents} teamid={row[0].column} value={column.column} /> );
                            }
                            if(column.remove === true){
                                content = ( <button type="button" data-tag={row[0].column} onClick={this._onRemoveClick} className="btn btn-default" >Delete</button>);
                            }
                            return [<td>{content}</td>];
                        }
                    });
                    return [<tr>{columns}</tr>];
                });
            }
        }
        catch(err)
        {
            console.log(err);
        }

        return (
        <div className="ui container">
            <table className={tableClass + " ui celled table"}>
                <tbody>
                    <tr>
                        {header}
                    </tr>
                    {rows}
                </tbody>
            </table>
            <Pagination className="ui right floated pagination menu" currentPage={this.state.currentPage} totalPages={this.state.totalPages} onChangePage={this.onChangePage} />
        </div>
        );
    }
}
