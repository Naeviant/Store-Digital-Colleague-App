import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ModuleHeader from './ModuleHeader';
import ModuleProducts from './ModuleProducts';

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

class ModuleInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			module: {}
		}
	}

	componentDidMount() {
		axios.get('/module/site/' + this.props.apiUser.site.code + '/' + this.props.match.params.discriminator, { headers: { Authorization: this.props.apiToken } }).then((module) => {
			this.setState({ ...this.state, module: module.data.data })
		});
	}

	render() {
		const { classes } = this.props;
		if (!this.state.module.module) {
			return (
				<Backdrop className={classes.backdrop} open={!this.state.module.module}>
        			<CircularProgress color="inherit" />
				</Backdrop>
			);
		}
		return (
			<>
				<ModuleHeader module={this.state.module.module} />
				<ModuleProducts products={this.state.module.module.products} />
			</>
		);
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser,
});

export default connect(mapStateToProps, null)(withRouter(withStyles(useStyles)(ModuleInfo)));