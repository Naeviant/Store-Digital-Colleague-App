import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

function TabPanel(props) {
  	const { children, value, index, ...other } = props;

 	return (
    	<div
    		hidden={value !== index}
    		{...other}
    	>
    		{ value === index && <Box p={3}>{children}</Box> }
    	</div>
  	);
}

const useStyles = theme => ({

});

class ProductButtons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 0
		};
	}

	onChange = (e, newValue) => {
		this.setState({ ...this.state, tab: newValue });
	}

	render() {
		return (
			<Box p={1}>
				<AppBar position="static" color="default">
			        <Tabs
			        	value={this.state.tab}
			          	onChange={this.onChange}
			          	indicatorColor="primary"
			          	textColor="primary"
			          	variant="fullWidth"
			        >
			        	<Tab label="Description" />
			        	<Tab disabled label="Statistics" />
			        	<Tab disabled label="Reviews" />
			        </Tabs>
			        <TabPanel value={this.state.tab} index={0}>
			         	<Typography variant="body1"><em>No Description Available</em></Typography>
			        </TabPanel>
			        <TabPanel value={this.state.tab} index={1}></TabPanel>
			        <TabPanel value={this.state.tab} index={2}></TabPanel>
			    </AppBar>
			</Box>
		);
	}
}

export default withStyles(useStyles)(ProductButtons);