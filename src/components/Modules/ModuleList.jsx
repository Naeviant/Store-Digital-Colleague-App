import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = theme => ({
	cardContent: {
        "&:last-child": {
            paddingTop: 8,
            paddingBottom: 8
        }
    },
});

class Modules extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<Card>
				<CardContent className={classes.cardContent}>
					<List>
						<Divider />
						{
							this.props.modules.map(module => (
								<>
									<ListItem>
										<ListItemText primary={module.module.name} secondary={module.module.discriminator} />
										<ListItemText primary={
											module.module.startDate.split('-')[2].split('T')[0] 
											+ '/' + module.module.startDate.split('-')[1]
											+ '/' + module.module.startDate.split('-')[0]
											+ ' - ' +
											module.module.endDate.split('-')[2].split('T')[0] 
											+ '/' + module.module.endDate.split('-')[1]
											+ '/' + module.module.endDate.split('-')[0]
										} secondary={
											module.module.products.length + ' Products'
										} />
									</ListItem>
									<Divider />
								</>
							))
						}
					</List>
				</CardContent>
			</Card>
		);
	}
}

export default withStyles(useStyles)(Modules);