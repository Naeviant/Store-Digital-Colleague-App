import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = theme => ({

});

class LocationSearch extends React.Component {
	render() {
		return (
			<Box p={1}>
				<Paper>
					<Box pl={2}>
					  	<InputBase
					        placeholder="Enter Location"
					        style={{ width: 'calc(100% - 56px)' }}
					    />
					    <IconButton 
					    	color="primary"
					    >
					        <SearchIcon />
					    </IconButton>
				    </Box>
			    </Paper>
			</Box>
		)
	}
}

export default withStyles(useStyles)(LocationSearch);