import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import GradeIcon from '@material-ui/icons/Grade';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';

const drawerWidth = 120;

const useStyles = theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,

	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: theme.palette.primary.dark,
	},
	sidebarButton: {
		color: 'white',
		margin: '3px 0',
	},
	sidebarIcon: {
		width: '100%',
	},
	sidebarTop: {
		position: 'absolute',
		top: 20,
	},
	sidebarBottom: {
		position: 'absolute',
		bottom: 20,
	},
});

class Sidebar extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div className="Sidebar">
				<Drawer
					className={classes.drawer}
					variant="permanent"
					classes={{
						paper: classes.drawerPaper,
					}}
					anchor="left"
				>
					<div className={classes.toolbar}/>
					<Box className={classes.sidebarTop}>
						<Button className={classes.sidebarButton}>
							<Grid container justify="center">
							    <GradeIcon fontSize="large" className={classes.sidebarIcon} /> Products
							</Grid>
						</Button>
						<Button className={classes.sidebarButton}>
							<Grid container justify="center">
							    <LocationOnIcon fontSize="large" className={classes.sidebarIcon} /> Locations
							</Grid>
						</Button>
						<Button className={classes.sidebarButton}>
							<Grid container justify="center">
							    <AirportShuttleIcon fontSize="large" className={classes.sidebarIcon} /> Stock
							</Grid>
						</Button>
					</Box>
					<Box className={classes.sidebarBottom}>
						<Button className={classes.sidebarButton}>
							<Grid container justify="center">
							    <SettingsIcon fontSize="large" className={classes.sidebarIcon} /> Settings
							</Grid>
						</Button>
						<Button className={classes.sidebarButton}>
							<Grid container justify="center">
							    <PersonIcon fontSize="large" className={classes.sidebarIcon} /> Login   
							</Grid>
						</Button>
					</Box>
				</Drawer>
			</div>
		)
	}
}

export default withStyles(useStyles)(Sidebar);