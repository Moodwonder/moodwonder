import React from 'react';
import RequireAuth from 'utils/requireAuth';
import AdminCompanyActions from 'actions/AdminCompanyActions';
import AdminCompanyStore from 'stores/AdminCompanyStore';

import AdminTeamActions from 'actions/AdminTeamActions';
import AdminTeamsStore from 'stores/AdminTeamsStore';

import AdminUserActions from 'actions/AdminUserActions';
import AdminUserStore from 'stores/AdminUserStore';

import Pagination from 'components/Pagination';

export default RequireAuth(class AllTeams extends React.Component {
    constructor(props) {
        super(props);
        this.state = AdminCompanyStore.getState();
    }

    componentDidMount(){
        AdminCompanyActions.getAllCompanies({});
        AdminCompanyStore.listen(this._onChange);
    }

    _onChange = (state) => {
        this.setState(state);
        console.log(state);
    }

    _onCompanyChange = (e) => {
        // console.log(e.target.value);
        if(e.target.value !== ''){
            AdminTeamActions.getAllTeams({ companyname: e.target.value });
            AdminTeamsStore.listen(this._onChange);
        }
    }

    onTabClick = (Tab) => {
        this.setState({ Tab: Tab });
    }

    _onTeamSearch = () => {
        let teamSearchText = React.findDOMNode(this.refs.teamsearch).value.trim();
        AdminTeamActions.searchTeam({ teamname: teamSearchText });
        AdminTeamsStore.listen(this._onChange);
    }

    render() {

        let dataTable;
        let companylist;
        if(this.state.companyList){
            companylist = this.state.companyList.map((data, key) => {
                return [<option>{data.name}</option>];
            });
        }

        if(this.state.TeamList !== undefined && this.state.TeamList){
            dataTable = [<DataTable data={this.state.TeamList}/>];
        }

        let activeTab = [];
        activeTab[0] = 'tab-pane fade';
        activeTab[1] = 'tab-pane fade';

        if( this.state.Tab !== undefined ){
            activeTab[this.state.Tab] += ' in active';
        }else{
            activeTab[0] += ' in active';
        }

        let teamSearchResult;
        if(this.state.SearchTeamList){
            teamSearchResult = [<DataTable data={this.state.SearchTeamList}/>];
        }else if(this.state.hasError){
            teamSearchResult = (<div className="alert alert-info">{this.state.message}</div>);
        }

        return (
        <div className="container">
        <h1>All Teams</h1>
        <ul className="nav nav-tabs">
            <li><a onClick={this.onTabClick.bind(this,0)} >Teams</a></li>
            <li><a onClick={this.onTabClick.bind(this,1)} >Search Teams</a></li>
        </ul>
        <div className="tab-content">
          <div id="home" className={activeTab[0]}>
                <select className="form-control" onChange={this._onCompanyChange} >
                  <option value="">--select a company --</option>
                  {companylist}
                </select>
                {dataTable}
          </div>
          <div id="menu1" className={activeTab[1]}>
            <div>
                <input type="text" ref="teamsearch" placeholder="Search a team" />
                <button onClick={this._onTeamSearch} >Search</button>
                {teamSearchResult}
            </div>
          </div>
        </div>

        </div>
        );
    }
});

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

    componentDidMount(){
        AdminUserStore.listen(this._onChange);
    }

    _onChange = (state) => {
        // console.log(state);
        this.setState({ userTeams: state.userTeams });
    }

    componentWillReceiveProps() {
        if(this.props.data){
            this.rows = this.props.data.rows;
            this.setTable(this.state.currentPage);
        }
    }

    _onPopClick = (e) => {
        if(e.target.dataset.tag !== ''){
            AdminUserActions.getTeamsMembers({ _id: e.target.dataset.tag });
        }
        this.setState({
            modal:true
        });
    }

    _onPopClose = (emp_id) => {
        this.setState({
            modal:false
        });
    }

    setTable = (page) => {

        if(this.props.data){

            let totalPages = 0;
            // Data for the current page
            let rows = this.rows;

            if( this.props.data && this.rows !== undefined ){

                // find total rows
                let totalRows = this.rows.length;
                let rowsPerPage = 3;
                rowsPerPage--;

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
                for( let i = 0, dataIndex = start; dataIndex <= end; dataIndex++, i++ ){
                    if(this.rows[dataIndex] !== undefined ){
                        rows[i] = this.rows[dataIndex];
                    }
                }
            }

            this.setState({
                rows: rows,
                totalPages: (totalPages-1),
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

        let teamUserList;
        if(this.state.userTeams){
            teamUserList = this.state.userTeams.map((data, key) => {

                let members = [<div className="alert alert-info">{this.state.message}</div>];
                if(data.members.length>0){
                    members = data.members.map((mem, key) => {
                        return (
                        <div className="row">
                          <div className="col-sm-6">{mem.member_email}</div>
                          <div className="col-sm-4">{mem.member_name}</div>
                        </div>
                        );
                    });
                }
                return members;
            });
        }

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
                        if(column.display !== false){
                            let content = column.column;
                            if(column.popup === true){
                                content = ( <a data-tag={row[0].column} onClick={this._onPopClick}  className="navigation__item">{column.column}</a> );
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

        let modal;
        if(this.state.modal){
            modal = (
                <div className="modal fade in cmodal-show" id="myModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" onClick={this._onPopClose} className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">Teams</h4>
                    </div>
                    <div className="modal-body modal-height-350">
                        {teamUserList}
                    </div>
                    <div className="modal-footer">
                    </div>
                  </div>
                </div>
                </div>
            );
        }

        return (

        <div>
        <table className={tableClass}>
         <tbody>
          <tr>
            {header}
          </tr>
          {rows}
          </tbody>
        </table>
        <Pagination className="pagination pull-right" currentPage={this.state.currentPage} totalPages={this.state.totalPages} onChangePage={this.onChangePage} />
        {modal}
        </div>
        );
    }
}
