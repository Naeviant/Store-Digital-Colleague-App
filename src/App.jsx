import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Login from './components/Login';

import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			apiToken: '',
			apiUser: ''
		};
	}

	storeApiData = (token, user) => {
		this.setState({ ...this.state, apiToken: token, apiUser: user });
	}

	deleteApiData = () => {
		this.setState({ ...this.state, apiToken: '', apiUser: '' });
	}

    render() {
        return (
        	<Router>
	            <div className="App">
	                <Sidebar token={this.state.apiToken} logout={this.deleteApiData} />
	                <main>
                		<Switch>
                			<Route path="/login">
                				<Login store={this.storeApiData} />
                			</Route>
                		</Switch>
	                </main>
	            </div>
            </Router>
        )
    }
}

export default App;
