import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = theme => ({

});

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}

	onText = (e) => {
		this.setState({ ...this.state, [e.target.id]: e.target.value })
	}

	onSubmit = () => {
		axios.post('/authenticate', this.state).then(async (token) => {
			const user = await axios.get('/user/' + this.state.username, { headers: { Authorization: token.data.data } });
			this.props.store(token.data.data, user.data.data);
		}, (error) => {
			if (error.response.status) {
				console.log('Invalid Credentials')
			} else {
				console.log('Something Went Wrong')
			}
		});
	}

	render() {
		return (
			<div className="Login">
				<TextField id="username" type="text" onChange={this.onText} />
				<TextField id="password" type="password" onChange={this.onText} />
				<Button variant="contained" onClick={this.onSubmit}>Login</Button>
			</div>
		)
	}
}

export default withStyles(useStyles)(Login);