import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({

});

class ProductQuantity extends React.Component {
	render() {
		return (
			<Box p={1}>
				<Paper>
					<Box p={3}>
						<Typography variant="body1">Available Quantity: {this.props.quantity}</Typography>
					</Box>
				</Paper>
			</Box>
		);
	}
}

export default withStyles(useStyles)(ProductQuantity);