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

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

const useStyles = theme => ({

});

class LocationBaysList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bays: []
		};
	}

	componentDidMount() {
		axios.get('/bay/' + this.props.apiUser.site.code +  '/' + this.props.match.params.aisle, { headers: { Authorization: this.props.apiToken } }).then((bays) => {
			console.log(bays)
			this.setState({ ...this.state, bays: bays.data.data });
		}, (error) => {
			this.props.showBanner('Cannot Get Bays: Something Went Wrong', 'error');
		});
	}
	
	render() {
		return (
			<>
				<Box m={1}>
					<Card>
						<CardContent>
							<List component="nav">
							<Divider />
								{
									this.state.bays.map(bay => (
										<>
											<ListItemLink>
												<ListItemText primary={bay.bay} />
											</ListItemLink>
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

export default connect(mapStateToProps, { showBanner })(withRouter(withStyles(useStyles)(LocationBaysList)));