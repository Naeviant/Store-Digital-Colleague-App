import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { showBanner } from '../../actions/bannerActions';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
});

class LocationAssignmentsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			assignments: [],
			loading: true
		};
	}

	componentDidMount() {
		axios.get('/assignment/location/' + this.props.apiUser.site.code +  '/' + this.props.match.params.aisle +  '/' + this.props.match.params.bay +  '/' + this.props.match.params.type, { headers: { Authorization: this.props.apiToken } }).then((assignments) => {
			this.setState({ ...this.state, assignments: assignments.data.data, loading: false });
		}, (error) => {
			this.props.showBanner('Cannot Get Assignments: Something Went Wrong', 'error');
		});
	}
	
	render() {
		const { classes } = this.props;
		if (this.state.loading) {
			return (
				<Backdrop className={classes.backdrop} open={this.state.loading}>
        			<CircularProgress color="inherit" />
				</Backdrop>
			);
		}
		return (
			<>
				<Box m={1}>
					<Card>
						<CardContent>
							<List component='nav'>
								<Divider />
								{
									this.state.assignments.map(assignment => (
										<>
											<ListItem>
												<ListItemText primary={assignment.product.name} secondary={assignment.product.ean} />
											</ListItem>
											<Divider />
										</>
									))
								}
							</List>	
						</CardContent>
					</Card>
				</Box>
			</>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withRouter(withStyles(useStyles)(LocationAssignmentsList)));