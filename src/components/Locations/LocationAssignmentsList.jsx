import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { showBanner } from '../../actions/bannerActions';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({

});

class LocationAssignmentsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			assignments: []
		};
	}

	componentDidMount() {
		axios.get('/assignment/location/' + this.props.apiUser.site.code +  '/' + this.props.match.params.aisle +  '/' + this.props.match.params.bay +  '/' + this.props.match.params.type, { headers: { Authorization: this.props.apiToken } }).then((assignments) => {
			this.setState({ ...this.state, assignments: assignments.data.data });
		}, (error) => {
			this.props.showBanner('Cannot Get Assignments: Something Went Wrong', 'error');
		});
	}
	
	render() {
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