import React from 'react';
import { Link } from 'react-router-dom';
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

class SettingsSidebar extends React.Component {
	render() {
		return (
			<SubMenu {...this.props}>
				<ListItemLink component={Link} to="/settings/user" href="#" onClick={this.props.close}>
					<ListItemText primary="User Information" />
				</ListItemLink>
			</SubMenu>
		)
	}
}

export default withStyles(useStyles)(SettingsSidebar);