import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = theme => ({

});

class ProductButtons extends React.Component {
	render() {
		return (
			<Box p={1}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={4}>
			        	<Button variant="contained" color="primary" fullWidth size="large">Search Other Sites</Button>
			        </Grid>
			        <Grid item xs={12} sm={6} md={4}>
			        	<Button variant="contained" color="primary" fullWidth size="large" disabled>Upcoming Deliveries</Button>
			        </Grid>
			        <Grid item xs={12} sm={6} md={4}>
			        	<Button variant="contained" color="primary" fullWidth size="large" disabled>View Related Modules</Button>
			        </Grid>
		        </Grid>
			</Box>
		);
	}
}

export default withStyles(useStyles)(ProductButtons);