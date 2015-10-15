import React from 'react';
import RequireAuth from 'utils/requireAuth';
import { MyOwnInput } from 'components/Formsy-components';
import IndustryActions from 'actions/IndustryActions';
import IndustryStore from 'stores/IndustryStore';
import Pagination from 'components/Pagination';
import Editable from 'components/Editable.react';


export default RequireAuth(class Industry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        IndustryActions.getIndustries();
        IndustryStore.listen(this._onChange);
    }

    _onChange = (state) => {
        this.setState(state);
    }

    onTabClick = (Tab) => {
        this.setState({ Tab: Tab });
    }

    render() {

        let Tab1     = [<AddIndustry />];
        let Tab2;
        if(this.state.IndustryList){
            Tab2     = [<DataTable data={this.state.IndustryList}/>];
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
            <div className="container">
                <h1>All Industry</h1>
                {message}
                <ul className="nav nav-tabs">
                    <li className={activeTab[0][1]}><a onClick={this.onTabClick.bind(this,0)} >Industries</a></li>
                    <li className={activeTab[1][1]}><a onClick={this.onTabClick.bind(this,1)} >Add Industry</a></li>
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

class AddIndustry extends React.Component {
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

    _onAddIndustry = (model) => {
        let industry = model.industry.trim();
        IndustryActions.addIndustry({ name: industry });
        IndustryStore.listen(this._onChange);
    }

    render() {

        return (
            <div>
                <Formsy.Form onValidSubmit={this._onAddIndustry} onValid={this.enableButton} onInvalid={this.disableButton} >
                   <MyOwnInput
                   name="industry"
                   className="form-control"
                   placeholder="Enter industry name"
                   required/>
                   <button type="submit" className="btn btn-default" disabled={!this.state.canSubmit}>Submit</button>
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

    _onUpdateIndustry = (model) => {
        IndustryActions.updateIndustry(model);
        IndustryStore.listen(this._onChange);
    }

    _onRemoveClick = (e) => {
        IndustryActions.deleteIndustry({ _id: e.target.dataset.tag });
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
                            if(column.edit === true){
                                content = ( <Editable onSave={this._onUpdateIndustry} teamid={row[0].column} value={column.column} /> );
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
        </div>
        );
    }
}
