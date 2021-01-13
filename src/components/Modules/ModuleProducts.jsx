import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = theme => ({
	cardContent: {
        "&:last-child": {
            paddingTop: 8,
            paddingBottom: 8
        }
	},
	tableCell: {
		padding: 8
	},
});

class ModuleProducts extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<Box m={1}>
				<Card>
					<CardContent className={classes.cardContent}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell className={classes.tableCell}>
										<Typography variant="h6">Product</Typography>
									</TableCell>
									<TableCell className={classes.tableCell}>
										<Typography variant="h6">Sequence</Typography>
									</TableCell>
									<TableCell className={classes.tableCell}>
										<Typography variant="h6">Facings</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									this.props.products.map((row, index) => (
										<TableRow key={index}>
											<TableCell className={classes.tableCell}>
												<ListItemText primary={row.product.name} secondary={row.product.ean} />
											</TableCell>
											<TableCell className={classes.tableCell}>{index + 1}</TableCell>
											<TableCell className={classes.tableCell}>{row.facings}</TableCell>
										</TableRow>
									))
								}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</Box>
		);
	}
}

export default withStyles(useStyles)(ModuleProducts);