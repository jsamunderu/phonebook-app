import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import InputDialog from './InputDialog';
import ListEntries from './ListEntries';

class PhoneBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true
        };
    }

    getInitialState() {
        return { showModal: false };
    }

    close = () => {
        this.setState({ showModal: false });
    }

    open = () => {
        console.log("open $$$$$$$$$$$$$$$$$$$$");
        this.setState({ showModal: true });
    }

    initalise = () => {
        console.log("initialise $$$$$$$$$$$$$$$$$$$$");
        this.setState({ showModal: true });
    }

    render() {
        return (
            <Router>
                <>
                    <Switch>
                        <Route path="/" exact component={ListEntries} />
                          <Route
                            path="/entry" exact
                            render={(props) => <InputDialog {...props} init={this.initalise} show={this.state.showModal} onHide={this.close} />}
                            />
                          <Route
                            path="/entry/:phoneNumber"
                            render={(props) => <InputDialog {...props} init={this.initalise} show={this.state.showModal} onHide={this.close} />}
                            />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default PhoneBook
