import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

const useStyles = theme => ({
	loginInput: {
		minWidth: 400,
		marginBottom: 10
	},
});

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			redirect: '',
			invalidCredentials: false,
			serverError: false
		};
	}

	onText = (e) => {
		this.setState({ ...this.state, [e.target.id]: e.target.value })
	}

	onKeypress = (e) => {
		if (e.key === 'Enter') {
			this.onSubmit();
		}
	}

	onSubmit = () => {
		axios.post('/authenticate', this.state).then(async (token) => {
			const user = await axios.get('/user/' + this.state.username, { headers: { Authorization: token.data.data } });
			this.props.store(token.data.data, user.data.data);
			this.setState({ ...this.state, redirect: '/' });
		}, (error) => {
			if (error.response.status === 401) {
				this.setState({ ...this.state, invalidCredentials: true })
				setTimeout(() => {
					this.setState({ ...this.state, invalidCredentials: false })
				}, 3000);
			} else {
				this.setState({ ...this.state, serverError: true })
				setTimeout(() => {
					this.setState({ ...this.state, serverError: false })
				}, 3000);
			}
		});
	}

	render() {
		const { classes } = this.props;
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		}
		else {
			return (
				<Grid
				  container
				  spacing={0}
				  direction="column"
				  alignItems="center"
				  justify="center"
				  style={{ minHeight: '100vh' }}
				>
				  	<Grid item>
					  	<Collapse in={this.state.invalidCredentials}>
					  		<Alert severity="warning">Invalid Credentials Provided</Alert>
					  	</Collapse>
					  	<Collapse in={this.state.serverError}>
					  		<Alert severity="error">Something Went Wrong</Alert>
					  	</Collapse>
					    <Card>
							<CardContent>
								<Grid item>
									<Typography align="center" variant="h3" paragraph>Welcome</Typography>
									<Typography align="center" variant="body1" paragraph>Please enter your credentials.</Typography>
								</Grid>
								<Grid item justify="center">
									<TextField 
										id="username" 
										placeholder="Username" 
										variant="outlined" 
										type="text" 
										onChange={this.onText} 
										inputProps={{ onKeyDown: this.onKeypress }}
										className={classes.loginInput}
									/>
								</Grid>
								<Grid item justify="center">
									<TextField 
										id="password" 
										placeholder="Password" 
										variant="outlined" 
										type="password" 
										onChange={this.onText} 
										inputProps={{ onKeyDown: this.onKeypress }}
										className={classes.loginInput} 
									/>
								</Grid>
								<Grid item justify="center">
									<Button variant="contained" size="large" color="primary" onClick={this.onSubmit} className={classes.loginInput}>Login</Button>
								</Grid>
							</CardContent>
						</Card>
				  	</Grid>   
				</Grid>
			)
		}
	}
}

export default withStyles(useStyles)(Login);
