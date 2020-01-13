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
        this.setState({ showModal: true });
    }

    render() {
        return (
            <Router>
                <>
                    <h1>Phone Book</h1>
                    <Switch>
                        <Route path="/" exact component={ListEntries} />
                        <Route path="/entries" exact component={ListEntries} />
			<Route
                            path='/entries/-1'
                            render={(props) => <InputDialog {...props} show={this.state.showModal} onHide={this.close} />}
			/>
                    </Switch>
                </>
            </Router>
        )
    }
}

export default PhoneBook
