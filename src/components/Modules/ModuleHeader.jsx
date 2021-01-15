import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CardWrapper from '../common/CardWrapper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
	
});

class ModuleHeader extends React.Component {
	render() {
		return (
			<CardWrapper>
				<Box p={2}>
					<Grid container spacing={3}>
						<Grid item xs={8}>
								<Typography variant="h4">{this.props.module.name}</Typography>
								<Typography variant="subtitle2">{this.props.module.discriminator}</Typography>
						</Grid>
						<Grid item xs={4}>
							<Grid container spacing={3} direction="column" alignItems="flex-end" justify="center" style={{ minHeight: 86 }}>
								<Grid item>
									<Typography variant="body1" align="right">{
										this.props.module.startDate.split('-')[2].split('T')[0] 
										+ '/' + this.props.module.startDate.split('-')[1]
										+ '/' + this.props.module.startDate.split('-')[0]
										+ ' - ' +
										this.props.module.endDate.split('-')[2].split('T')[0] 
										+ '/' + this.props.module.endDate.split('-')[1]
										+ '/' + this.props.module.endDate.split('-')[0]
									}</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</CardWrapper>
		);
	}
}

export default withRouter(withStyles(useStyles)(ModuleHeader));