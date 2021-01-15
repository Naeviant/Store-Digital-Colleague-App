import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { showBanner } from '../../actions/bannerActions';
import Loading from '../common/Loading';
import CardWrapper from '../common/CardWrapper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

const useStyles = theme => ({

});

class LocationAislesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			aisles: [],
			loading: true
		};
	}

	componentDidMount() {
		axios.get('/aisle/' + this.props.apiUser.site.code, { headers: { Authorization: this.props.apiToken } }).then((aisles) => {
			this.setState({ ...this.state, aisles: aisles.data.data, loading: false });
		}, (error) => {
			this.setState({ ...this.state, loading: false });
			this.props.showBanner('Cannot Get Aisles: Something Went Wrong', 'error');
		});
	}
	
	render() {
		if (this.state.loading) return ( <Loading /> );
		return (
			<CardWrapper>
				<List component="nav">
					{
						this.state.aisles.length === 0
						?
						<ListItemText primary='No Aisles Found' />
						:
						<Divider />
					}
					{
						this.state.aisles.map(aisle => (
							<React.Fragment key={aisle.aisle}>
								<ListItemLink component={Link} to={"/locations/" + aisle.aisle}>
									<ListItemText primary={aisle.aisle + " - " + aisle.name} />
								</ListItemLink>
								<Divider />
							</React.Fragment>
						))
					}
				</List>
			</CardWrapper>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withStyles(useStyles)(LocationAislesList));