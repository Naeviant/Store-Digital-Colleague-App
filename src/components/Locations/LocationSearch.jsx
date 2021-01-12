import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = theme => ({

});

class LocationSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: '',
			redirect: ''
		}
	}

	onChange = (e) => {
		const re = /^[0-9-]+$/;
		const value = e.target.value;
		if (value === '' || re.test(value)) this.setState({ ...this.state, location: e.target.value });
	}

	onKeypress = (e) => {
		if (e.key === 'Enter') {
			this.onClick();
		}
	}

	onClick = () => {
		const parts = this.state.location.split('-');
		if (parts[0] && parts[1]) {
			this.setState({ ...this.state, redirect: '/locations/' + parts[0] + '/' + parts[1] });
		} else if (parts[0]) {
			this.setState({ ...this.state, redirect: '/locations/' + parts[0] });
		}
	}

	render() {
		if (this.state.redirect) {
			this.props.history.push(this.state.redirect);
			this.setState({ ...this.state, redirect: '' });
		}
		return (
			<Box p={1}>
				<Paper>
					<Box pl={2}>
					  	<InputBase
					        placeholder="Enter Location"
							style={{ width: 'calc(100% - 56px)' }}
							onChange={this.onChange}
							inputProps={{ onKeyDown: this.onKeypress }}
							value={this.state.location}
					    />
					    <IconButton 
							color="primary"
							onClick={this.onClick}
					    >
					        <SearchIcon />
					    </IconButton>
				    </Box>
			    </Paper>
			</Box>
		)
	}
}

export default withRouter(withStyles(useStyles)(LocationSearch));