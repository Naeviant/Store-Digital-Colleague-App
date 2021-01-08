import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
		const { classes } = this.props;
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
				    <Card>
						<CardContent>
							<Grid item>
								<Typography align="center" variant="h3" paragraph>Welcome</Typography>
								<Typography align="center" variant="body1" paragraph>Please enter your credentials.</Typography>
							</Grid>
							<Grid item justify="center">
								<TextField id="username" placeholder="Username" variant="outlined" type="text" onChange={this.onText} className={classes.loginInput} />
							</Grid>
							<Grid item justify="center">
								<TextField id="password" placeholder="Password" variant="outlined" type="password" onChange={this.onText} className={classes.loginInput} />
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

export default withStyles(useStyles)(Login);
