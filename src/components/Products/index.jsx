import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import ProductSearch from './ProductSearch';
import ProductHeader from './ProductHeader';
import ProductQuantity from './ProductQuantity';
import ProductLocations from './ProductLocations';
import ProductInfo from './ProductInfo';
import ProductButtons from './ProductButtons';

const useStyles = theme => ({

});

class Products extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ean: '',
			product: {},
			sellingAssignments: [],
			nonSellingAssignments: [],
			tab: 0
		};
	}

	onChange = (e) => {
		this.setState({ ...this.state, ean: e.target.value });
	}

	onKeypress = (e) => {
		if (e.key === 'Enter') {
			this.search();
		}
	}

	search = () => {
		axios.get('/product/quantity/' + this.props.apiUser.site.code + '/' + this.state.ean, { headers: { Authorization: this.props.apiToken } }).then((product) => {
			axios.get('/assignment/product/' + this.props.apiUser.site.code + '/' + this.state.ean, { headers: { Authorization: this.props.apiToken } }).then((assignments) => {
				const sellingAssignments = assignments.data.data.filter((x) => { return ['Multi-Location', 'Clearance', 'Display'].indexOf(x.type) > -1 });
				const nonSellingAssignments = assignments.data.data.filter((x) => { return ['Overstock', 'Topstock', 'Stockroom'].indexOf(x.type) > -1 });
				this.setState({ ...this.state, product: product.data.data, sellingAssignments: sellingAssignments, nonSellingAssignments: nonSellingAssignments });
			}, (error) => {
				console.log('Error')
			});
		}, (error) => {
			console.log('Error')
		});
	}

	render() {
		return (
			<>
				<ProductSearch onChange={this.onChange} onKeypress={this.onKeypress} search={this.search} />
				{
					this.state.product.product &&
					<>
						<ProductHeader product={this.state.product.product} />
						<ProductQuantity quantity={this.state.product.quantity} />
						<ProductLocations sellingAssignments={this.state.sellingAssignments} nonSellingAssignments={this.state.nonSellingAssignments} />
						<ProductInfo />
						<ProductButtons />
					</>
				}
			</>
		)
	}
}

export default withStyles(useStyles)(Products);