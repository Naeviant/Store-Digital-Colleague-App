import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { showBanner } from '../../actions/bannerActions';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ModuleList from '../Modules/ModuleList';

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
			modules: [],
			loading: true
		};
	}

	componentDidMount() {
		axios.get('/module/site/' + this.props.apiUser.site.code +  '/' + this.props.match.params.aisle +  '/' + this.props.match.params.bay, { headers: { Authorization: this.props.apiToken } }).then((modules) => {
			this.setState({ ...this.state, modules: modules.data.data, loading: false });
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
			<ModuleList modules={this.state.modules} />
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withRouter(withStyles(useStyles)(LocationAssignmentsList)));