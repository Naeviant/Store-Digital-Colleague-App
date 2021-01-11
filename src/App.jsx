import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Products from './components/Products';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			apiToken: '',
			apiUser: '',
			showBanner: ''
		};
	}

	storeApiData = (token, user) => {
		this.setState({ ...this.state, apiToken: token, apiUser: user }, () => {
			this.showBanner('You have been successfully logged in');
		});
	}

	deleteApiData = () => {
		this.setState({ ...this.state, apiToken: '', apiUser: '' }, () => {
			this.showBanner('You have been successfully logged out');
		});
	}

	showBanner = (text) => {
		this.setState({ ...this.state, banner: text });
		setTimeout(() => {
			this.setState({ ...this.state, banner: '' });
		}, 3000);
	}

    render() {
        return (
        	<Router>
	            <div className="App">
		            <Route exact path="/login">
		            	<main>
	        				<Login store={this.storeApiData} />
        				</main>
        			</Route>
        			<Route path="/">
        				{
        					this.state.apiToken
        					?
        					<>
	        					<Sidebar token={this.state.apiToken} logout={this.deleteApiData} />
				                <Collapse in={this.state.banner} style={{ right: 0, position: 'absolute', width: 'calc(100% - 120px)' }}>
							  		<Alert severity="success">{this.state.banner}</Alert>
							  	</Collapse>
				                <main className="withSidebar">
			                		<Switch>
			                			<Route exact path="/">
			                				<Products apiToken={this.state.apiToken} apiUser={this.state.apiUser} />
			                			</Route>
			                		</Switch>
				                </main>
			                </>
        					:
        					<Redirect to="/login" />
        				}
	                </Route>
	            </div>
            </Router>
        )
    }
}

export default App;
