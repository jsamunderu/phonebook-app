import React, { Component } from 'react'
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import EntryDataService from '../service/EntryDataService';

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

    refreshEntries() {
        EntryDataService.retrieveAllEntries()
            .then(
                response => {
                    //console.log(response);
                    this.setState({ courses: response.data })
                }
            )
    }

    deleteEntryClicked(phoneNumber) {
        EntryDataService.deleteEntry(phoneNumber)
            .then(
                response => {
                    this.setState({ message: `Delete of entry ${phoneNumber} Successful` })
                    this.refreshEntries()
                }
            )

    }

    addEntryClicked() {
        this.props.history.push(`/entries/-1`)
    }

    updateEntryClicked(phoneNumber) {
        console.log('update ' + phoneNumber)
        this.props.history.push(`/entries/${phoneNumber}`)
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <h3>All Phone Book Entries</h3>

                <form class="form-inline active-cyan-4">
                    <input class="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
                        aria-label="Search" />
                    <i class="fas fa-search" aria-hidden="true"></i>
                </form>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
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
                                            <td><button className="btn btn-success" onClick={() => this.updateEntryClicked(entries.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteEntryClicked(entries.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addEntryClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListEntries
