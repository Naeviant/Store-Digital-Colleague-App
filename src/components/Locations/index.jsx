import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LocationSearch from './LocationSearch';
import LocationNavigation from './LocationNavigation';
import LocationAislesList from './LocationAislesList';
import LocationBaysList from './LocationBaysList';
import LocationTypesList from './LocationTypesList';
import LocationAssignmentsList from './LocationAssignmentsList';
import LocationModulesList from './LocationModulesList';

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
				{
					this.props.show === "modules" && <LocationModulesList />
				}
			</>
		)
	}
}

export default withStyles(useStyles)(Locations);