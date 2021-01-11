import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ProductStatus from './ProductStatus';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({

});

class ProductHeader extends React.Component {
	render() {
		return (
			<Box p={1}>
				<Paper>
					<Box p={3}>
						<Grid container spacing={3}>
							<Grid item xs={8}>
								<Typography variant="h4">
									{this.props.product.name} 
									<ProductStatus status={this.props.product.status} />
								</Typography>
								<Typography variant="subtitle1">{this.props.product.ean}</Typography>
							</Grid>
							<Grid item xs={4}>
								<Typography variant="h5" align="right">£{this.props.product.price.toFixed(2)}</Typography>
								<Typography align="right"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></Typography>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</Box>
		);
	}
}

export default withStyles(useStyles)(ProductHeader);