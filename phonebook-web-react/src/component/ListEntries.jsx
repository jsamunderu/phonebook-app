import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import EntryDataService from '../service/EntryDataService';
import './pageStyle.css';

class ListEntries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: [],
            message: null
        }

        this.deleteEntryClicked = this.deleteEntryClicked.bind(this)
        this.updateEntryClicked = this.updateEntryClicked.bind(this)
        this.addEntryClicked = this.addEntryClicked.bind(this)
        this.refreshEntries = this.refreshEntries.bind(this)
    }

    componentDidMount() {
        this.refreshEntries();
    }

    onSubmit = (values) => {
        let data = {
            name: values.name,
        }

        Promise.resolve(EntryDataService.searchEntry(data)).then(() => this.props.history.push('/'));

        console.log(values);
    }

    onSubmitSearch = (values) => {
        console.log("############ Searching: " + values.searchText);
        EntryDataService.searchEntry({ name: values.searchText })
            .then(
                response => {
                    this.setState({ entries: response.data })
                }
            )
    }

    refreshEntries() {
        EntryDataService.retrieveAllEntries()
            .then(
                response => {
                    //console.log(response);
                    this.setState({ entries: response.data })
                }
            )
    }

    deleteEntryClicked(phoneNumber) {
        let data = [{
            name: "-",
            phoneNumber: phoneNumber
        }]

        Promise.resolve(EntryDataService.deleteEntry(data))
            .then(
                response => {
                    this.setState({ message: `Delete of entry ${phoneNumber} Successful` })
                    this.refreshEntries()
                }
            )
    }

    addEntryClicked() {
        this.props.history.push(`/entry`)
    }

    updateEntryClicked(phoneNumber) {
        this.props.history.push(`/entry/${phoneNumber}`)

        console.log(phoneNumber);
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <div className="headingText">
                    <h3>Phone Book Entries</h3>
                </div>
                <div className="searchBox">
                    <Formik
                      initialValues={{ searchText: ''}}
                      onSubmit={this.onSubmitSearch}
                      validateOnChange={false}
                      validateOnBlur={false}
                      enableReinitialize={false}
                      >
                      {formik => (
                          <form class="form-inline active-cyan-4" onSubmit={formik.handleSubmit}>
                              <input id="searchText" {...formik.getFieldProps('searchText')} type="submit" class="form-control form-control-sm mr-3 w-75"
                                  type="text" placeholder="Search" aria-label="Search" />
                              <i class="fas fa-search" aria-hidden="true"></i>
                              {formik.touched.searchText && formik.errors.searchText ? (
                                  <div>{formik.errors.searchText}</div>
                              ) : null}
                          </form>
                      )}
                    </Formik>
                </div>

		            <div className="mainHeader">
                    <div className="headerEntry">
                        <button className="btn btn-success" onClick={this.addEntryClicked}>Add</button>
                    </div>
		            </div>

                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="entriesTable">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>Phone Number</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.entries.map(
                                    entries =>
                                        <tr key={entries.name}>
                                            <td>{entries.name}</td>
                                            <td>{entries.phoneNumber}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateEntryClicked(entries.phoneNumber)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteEntryClicked(entries.phoneNumber)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListEntries
