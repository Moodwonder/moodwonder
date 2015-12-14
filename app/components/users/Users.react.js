import React from 'react';
import { Link } from 'react-router';
import RequireAuth from 'utils/requireAuth';
import AdminUserActions from 'actions/AdminUserActions';
import AdminUserStore from 'stores/AdminUserStore';

export default RequireAuth(class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = AdminUserStore.getState();
        this.state.rows = [];
        this.state.currentPage = 0;
        this.state.totalPages = [];
        this.state.modal = false;
        this.state.userTeams = false;

        this.hasData = false;
        this.rows = false;
        this.header = [];
        this.pagination = [];
    }

    componentDidMount(){
        AdminUserActions.getAllUsers({ page: 1 });
        AdminUserStore.listen(this._onChange);
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

    _onChange = (state) => {
        this.pagination = state.usersTable.pagination;

        state.rows = state.usersTable.rows;
        this.setState(state);
    }
    // Example Pagination
    // http://carlosrocha.github.io/react-data-components/
    onChangePage = (page) => {
        if(page){
            AdminUserActions.getAllUsers({ page: page });
        }
    }


    render() {

        let rows;
        let pagination;

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
                rows = this.state.rows.map((row, key) => {
                    // console.log(row);

                    let usertype = row.usertype;
                    if( row.usertype === 'manager'){
                        usertype = ( <a data-tag={row._id} onClick={this._onPopClick} className="navigation__item">{row.usertype}</a> );
                    }

                    this.hasData = true;
                    return (
                        <tr key={row._id}>
                            <td><Link to={ `/admin/userdetails/${row._id}` } className="navigation__item">{row.name}</Link></td>
                            <td>{row.email}</td>
                            <td>{usertype}</td>
                            <td>{(row.verifylink) ? 'Verified': 'Not verified'}</td>
                            <td>{row.country}</td>
                            <td>{row.companyname}</td>
                            <td>{row.companysize}</td>
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

        let modal;
        if(this.state.modal){
            modal = (
            <div className="ui dimmer modals page transition visible active">
                <div className="ui active modal" id="myModal" role="dialog">
                    <i className="close icon" onClick={this._onPopClose} ></i>
                    <div className="header">Teams</div>
                    <div className="content">
                        {teamUserList}
                    </div>
                </div>
            </div>
            );
        }


        return (
            <div className="ui container">
                <h2>Company Admin</h2>
                <div>
                    <table className="ui celled table">
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Type</td>
                            <td>Verify Status</td>
                            <td>Country</td>
                            <td>Company name</td>
                            <td>Company size</td>
                        </tr>
                        {rows}
                    </table>
                    {pagination}
                </div>
                {modal}
            </div>
        );
    }
});
