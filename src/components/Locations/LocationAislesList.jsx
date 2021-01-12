import React from 'react';
import { Link } from 'react-router-dom';
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

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

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
			this.props.showBanner('Cannot Get Aisles: Something Went Wrong', 'error');
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
						<CardContent className={classes.cardContent}>
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
										<>
											<ListItemLink key={aisle.aisle} component={Link} to={"/locations/" + aisle.aisle}>
												<ListItemText primary={aisle.aisle + " - " + aisle.name} />
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

export default connect(mapStateToProps, { showBanner })(withStyles(useStyles)(LocationAislesList));