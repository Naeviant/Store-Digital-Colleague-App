import React from 'react';
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
		color: 'white',
		fontWeight: 'bold',
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
				    	<ListItemLink href="#">
				        	<ListItemText primary="Location Management" />
				        </ListItemLink>
				        <ListItemLink href="#">
				        	<ListItemText primary="Product Modules" />
				        </ListItemLink>
				      </List>
				</Drawer>
			</div>
		)
	}
}

export default withStyles(useStyles)(LocationsSidebar);