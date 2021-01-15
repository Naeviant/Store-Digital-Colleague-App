import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SubMenu from './SubMenu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

const useStyles = theme => ({
	listLink: {
		color: 'white',
	},
});

class CollectionsSidebar extends React.Component {
	render() {
		return (
			<SubMenu {...this.props}>
				<ListItemLink href="#">
					<ListItemText primary="Pick Collection" />
				</ListItemLink>
				<ListItemLink href="#">
					<ListItemText primary="Process Collection" />
				</ListItemLink>
			</SubMenu>
		)
	}
}

export default withStyles(useStyles)(CollectionsSidebar);