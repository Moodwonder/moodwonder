import React from 'react';
import { Link } from 'react-router';
import RequireAuth from 'utils/requireAuth';
import AdminUserActions from 'actions/AdminUserActions';
import AdminUserStore from 'stores/AdminUserStore';
import Pagination from 'components/Pagination';

export default RequireAuth(class Dashboard extends React.Component {
  constructor(props) {
      super(props);
      this.state = AdminUserStore.getState();
  }

  componentDidMount(){
      AdminUserActions.getAllUsers();
      AdminUserStore.listen(this._onChange);
  }

  _onChange = (state) => {
      this.setState(state);
  }

  render() {

      return (
      <div className="ui container">
        <h2>Users</h2>
        <DataTable data={this.state.usersTable}/>
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
            AdminUserActions.getUsersTeams({ _id: e.target.dataset.tag });
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

    _onSearch = (e) => {
        let text = e.target.value.trim();
        if(text !== ''){
            if(this.hasData){
                this.filtered = [];
                let i =0;
                this.props.data.rows.map((data, key) => {
                    if((data[1].column.toLowerCase()).indexOf(text.toLowerCase()) === 0){
                        this.filtered[i] = data;
                        i++;
                    }
                });
                this.hasData = true;
                this.rows = this.filtered;
                this.setTable(0);
            }
        }else{
            this.rows = this.props.data.rows;
            this.setTable(0);
        }
    }

    render() {

        let header;
        let rows;
        let tableClass = this.props.data.class;

        let teamUserList;
        if(this.state.userTeams){
            teamUserList = this.state.userTeams.map((data, key) => {

                let members;
                members = data.members.map((mem, key) => {
                    return (
                    <div className="row">
                      <div className="col-sm-6">{mem.member_email}</div>
                      <div className="col-sm-4">{mem.member_name}</div>
                    </div>
                    );
                });
                return [
                  <li className="list-group-item">
                   {data.name}
                  </li>,
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-sm-4"><h4>SUBORDINATES</h4></div>
                    </div>
                    {members}
                  </li>
                ];
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
                            let content;
                            if( column.column === true ){
                                content = ( <span className="true">Yes</span> );
                            }else if( column.column === false ){
                                content = ( <span className="true">No</span> );
                            }else if( this.props.data.header[key] === 'Name' ){
                                content = ( <Link to={ `/admin/userdetails/${row[0].column}` } className="navigation__item">{column.column}</Link> );
                            }else if( this.props.data.header[key] === 'Type' && column.column === 'manager' ){
                                content = ( <a data-tag={row[0].column} onClick={this._onPopClick}  className="navigation__item">{column.column}</a> );
                            }else{
                                content = column.column;
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
                            <div className="modal-footer"></div>
                        </div>
                    </div>
                </div>
            );
        }
        

        return (
            <div className="ui container">
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form className="ui form">
                            <input type="text" ref="search" placeholder="Search a name" onChange={this._onSearch} />
                        </form>
                    </div>
                    <div className="column"></div>
                    <div className="column"></div>
                </div>
                <table className={tableClass + " ui celled table"}>
                    <tr>
                        {header}
                    </tr>
                    {rows}
                </table>
                <Pagination className="ui right floated pagination menu" currentPage={this.state.currentPage} totalPages={this.state.totalPages} onChangePage={this.onChangePage} />
                {modal}
            </div>
        );
    }
}
