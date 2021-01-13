import React from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

const useStyles = theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		marginLeft: 120,
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: theme.palette.primary.main,
		marginLeft: 120,
	},
	list: {
		marginTop: 20,
		fontWeight: 'bold',
	},
	listLink: {
		color: 'white',
	},
	backdrop: {
		marginLeft: 120,
	},
});

class LocationsSidebar extends React.Component {
	render(props) {
		const { classes } = this.props;
		return (
			<div className="LocationsSidebar">
				<Drawer
					className={classes.drawer}
					open={this.props.show}
					classes={{
						paper: classes.drawerPaper,
					}}
					anchor="left"
					ModalProps={{
						onBackdropClick: this.props.close
					}}
					BackdropProps={{
						classes: {
							root: classes.backdrop
						}
					}}
				>
					<List component="nav" className={classes.list}>
				    	<ListItemLink component={Link} to="/locations" onClick={this.props.close}>
				        	<ListItemText primary="Location Management" className={classes.listLink} />
				        </ListItemLink>
				        <ListItemLink component={Link} to="/modules" onClick={this.props.close}>
				        	<ListItemText primary="Product Modules" className={classes.listLink} />
				        </ListItemLink>
				      </List>
				</Drawer>
			</div>
		)
	}
}

export default withStyles(useStyles)(LocationsSidebar);