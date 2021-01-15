import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { showBanner } from '../../actions/bannerActions';
import Loading from '../common/Loading';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

const useStyles = theme => ({
	cardContent: {
        "&:last-child": {
            paddingTop: 8,
            paddingBottom: 8
        }
    },
});

class LocationBaysList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bays: [],
			loading: true
		};
	}

	componentDidMount() {
		axios.get('/bay/' + this.props.apiUser.site.code +  '/' + this.props.match.params.aisle, { headers: { Authorization: this.props.apiToken } }).then((bays) => {
			this.setState({ ...this.state, bays: bays.data.data, loading: false });
		}, (error) => {
			this.setState({ ...this.state, loading: false });
			this.props.showBanner('Cannot Get Bays: Something Went Wrong', 'error');
		});
	}
	
	render() {
		const { classes } = this.props;
		if (this.state.loading) return ( <Loading /> );
		return (
			<Box m={1}>
				<Card>
					<CardContent className={classes.cardContent}>
						<List component="nav">
							{
								this.state.bays.length === 0
								?
								<ListItemText primary='No Bays Found' />
								:
								<Divider />
							}
							{
								this.state.bays.map(bay => (
									<React.Fragment key={bay.bay}>
										<ListItemLink component={Link} to={'/locations/' + bay.aisle.aisle + '/' + bay.bay}>
											<ListItemText primary={"Bay " + bay.bay} />
										</ListItemLink>
										<Divider />
									</React.Fragment>
								))
							}
						</List>	
					</CardContent>
				</Card>
			</Box>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withRouter(withStyles(useStyles)(LocationBaysList)));