import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { showBanner } from '../../actions/bannerActions';
import LocationSearch from './LocationSearch';
import LocationNavigation from './LocationNavigation';
import LocationAislesList from './LocationAislesList';
import LocationBaysList from './LocationBaysList';
import LocationTypesList from './LocationTypesList';
import LocationAssignmentsList from './LocationAssignmentsList';

const useStyles = theme => ({

});

class Locations extends React.Component {
	render() {
		return (
			<>
				<LocationSearch />
				<LocationNavigation />
				{
					this.props.show === "aisles" && <LocationAislesList />
				}
				{
					this.props.show === "bays" && <LocationBaysList />
				}
				{
					this.props.show === "types" && <LocationTypesList />
				}
				{
					this.props.show === "assignments" && <LocationAssignmentsList />
				}
			</>
		)
	}
}

export default withStyles(useStyles)(Locations);