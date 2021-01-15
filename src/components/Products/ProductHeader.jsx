import React from 'react';
import CardWrapper from '../common/CardWrapper';
import ProductStatus from './ProductStatus';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';

class ProductHeader extends React.Component {
	render() {
		return (
			<CardWrapper>
				<Box pl={1} pr={1} pt={2} pb={2}>
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
							<Typography align="right" color='textSecondary'><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></Typography>
						</Grid>
					</Grid>
				</Box>
			</CardWrapper>
		);
	}
}

export default ProductHeader;