import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({

});

class Products extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ean: '',
			product: {} 
		};
	}

	onChange = (e) => {
		console.log(e.target)
		this.setState({ ...this.state, ean: e.target.value });
	}

	search = () => {
		axios.get('/product/' + this.state.ean, { headers: { Authorization: this.props.apiToken } }).then((product) => {
			this.setState({ ...this.state, product: product.data.data });
			console.log(this.state)
		}, (error) => {
			console.log('Error')
		});
	}

	render() {
		return (
			<>
				<Box p={1}>
					<Paper>
						<Box pl={2}>
						  	<InputBase
						        placeholder="Enter EAN"
						        style={{ width: 'calc(100% - 56px)' }}
						        onChange={this.onChange}
						    />
						    <IconButton 
						    	color="primary"
						    	onClick={this.search}
						    >
						        <SearchIcon />
						    </IconButton>
					    </Box>
				    </Paper>
				</Box>
				{
					this.state.product.ean &&
					<Box p={1}>
						<Paper>
							<Box p={3}>
								<Typography variant="h3">{this.state.product.name}</Typography>
								<Typography variant="body1">{this.state.product.ean}</Typography>
							</Box>
						</Paper>
					</Box>
				}
			</>
		)
	}
}

export default withStyles(useStyles)(Products);