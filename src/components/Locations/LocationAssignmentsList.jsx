import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { showBanner } from '../../actions/bannerActions';
import CreateAssignment from './CreateAssignment';
import DeleteAssignment from './DeleteAssignment';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	cardContent: {
        "&:last-child": {
            paddingTop: 8,
            paddingBottom: 8
        }
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
		this.populateList();
	}

	populateList = () => {
		axios.get('/assignment/location/' + this.props.apiUser.site.code +  '/' + this.props.match.params.aisle +  '/' + this.props.match.params.bay +  '/' + this.props.match.params.type, { headers: { Authorization: this.props.apiToken } }).then((assignments) => {
			this.setState({ ...this.state, assignments: assignments.data.data, loading: false });
		}, (error) => {
			this.setState({ ...this.state, loading: false });
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
				<CreateAssignment update={this.populateList} />
				<Box m={1}>
					<Card>
						<CardContent className={classes.cardContent}>
							<List component='nav'>
								{
									this.state.assignments.length === 0
									?
									<ListItemText primary='No Products Found' />
									:
									<Divider />
								}
								{
									this.state.assignments.map(assignment => (
										<React.Fragment key={assignment.product.ean + '-' + assignment.bay.aisle.aisle + '-' + assignment.bay.bay + '-' + assignment.type}>
											<ListItem>
												<ListItemText primary={assignment.product.name} secondary={assignment.product.ean} />
												<DeleteAssignment update={this.populateList} ean={assignment.product.ean} />
											</ListItem>
											<Divider />
										</React.Fragment>
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