import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import StarIcon from '@material-ui/icons/Star';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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
	noSellingLocations: {
		backgroundColor: '#fff59d',
		height: '100%',
		display: 'flex',
		flexDirection: "column",
	    justifyContent: "center"
	},
	noNonSellingLocations: {
		backgroundColor: '#a5d6a7',
		height: '100%',
		display: 'flex',
		flexDirection: "column",
	    justifyContent: "center"
	},
	liveProduct: {
		backgroundColor: '#a5d6a7',
		marginLeft: 10,
	},
	ordersBlockedProduct: {
		backgroundColor: '#fff59d',
		marginLeft: 10,
	},
	discontinuedProduct: {
		backgroundColor: '#ef9a9a',
		marginLeft: 10,
	},
});

class Products extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ean: '',
			product: {},
			sellingAssignments: [],
			nonSellingAssignments: [],
			tab: 0
		};
	}

	onChange = (e) => {
		this.setState({ ...this.state, ean: e.target.value });
	}

	onKeypress = (e) => {
		if (e.key === 'Enter') {
			this.search();
		}
	}

	search = () => {
		axios.get('/product/quantity/' + this.props.apiUser.site.code + '/' + this.state.ean, { headers: { Authorization: this.props.apiToken } }).then((product) => {
			axios.get('/assignment/product/' + this.props.apiUser.site.code + '/' + this.state.ean, { headers: { Authorization: this.props.apiToken } }).then((assignments) => {
				const sellingAssignments = assignments.data.data.filter((x) => { return ['Multi-Location', 'Clearance', 'Display'].indexOf(x.type) > -1 });
				const nonSellingAssignments = assignments.data.data.filter((x) => { return ['Overstock', 'Topstock', 'Stockroom'].indexOf(x.type) > -1 });
				this.setState({ ...this.state, product: product.data.data, sellingAssignments: sellingAssignments, nonSellingAssignments: nonSellingAssignments });
			}, (error) => {
				console.log('Error')
			});
		}, (error) => {
			console.log('Error')
		});
	}

	tab = (e, newValue) => {
		this.setState({ ...this.state, tab: newValue });
	}

	render() {
		const { classes } = this.props;
		return (
			<>
				<Box p={1}>
					<Paper>
						<Box pl={2}>
						  	<InputBase
						        placeholder="Enter EAN"
						        style={{ width: 'calc(100% - 56px)' }}
						        onChange={this.onChange}
						        inputProps={{ onKeyDown: this.onKeypress }}
						    />
						    <IconButton 
						    	color="primary"
						    	onClick={this.search}
						    >
						        <SearchIcon />
						    </IconButton>
					    </Box>
				    </Paper>
				</Box>
				{
					this.state.product.product &&
					<>
						<Box p={1}>
							<Paper>
								<Box p={3}>
									<Grid container spacing={3}>
										<Grid item xs={8}>
											<Typography variant="h4">{this.state.product.product.name} 
												{
													this.state.product.product.status === "Live" &&
													<Chip className={classes.liveProduct} label={this.state.product.product.status} />
												}
												{
													this.state.product.product.status === "Orders Blocked" &&
													<Chip className={classes.ordersBlockedProduct} label={this.state.product.product.status} />
												}
												{
													this.state.product.product.status === "Discontinued" &&
													<Chip className={classes.discontinuedProduct} label={this.state.product.product.status} />
												}
											</Typography>
											<Typography variant="subtitle1">{this.state.product.product.ean}</Typography>
										</Grid>
										<Grid item xs={4}>
											<Typography variant="h5" align="right">£{this.state.product.product.price.toFixed(2)}</Typography>
											<Typography align="right"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></Typography>
										</Grid>
									</Grid>
								</Box>
							</Paper>
						</Box>
						<Box p={1}>
							<Paper>
								<Box p={3}>
									<Typography variant="body1">Available Quantity: {this.state.product.quantity}</Typography>
								</Box>
							</Paper>
						</Box>
						<Box p={1}>
							<Grid container spacing={3}>
								<Grid item md={7} xs={12}>
									{
										this.state.sellingAssignments.length === 0
										?
										<Paper className={classes.noSellingLocations}>
											<Box p={3}>
												<Typography variant="body1" align="center">No Selling Locations Found</Typography>
											</Box>
										</Paper>
										:
										<TableContainer component={Paper}>
											<Table>
												<TableHead>
													<TableRow>
														<TableCell>Aisle</TableCell>
														<TableCell>Bay</TableCell>
														<TableCell>Type</TableCell>
														<TableCell>Sequence</TableCell>
														<TableCell>Facings</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{
														this.state.sellingAssignments.map((row) => (
															<TableRow>
																<TableCell>{row.bay.aisle.aisle}</TableCell>
																<TableCell>{row.bay.bay}</TableCell>
																<TableCell>{row.type}</TableCell>
																<TableCell>-</TableCell>
																<TableCell>-</TableCell>
															</TableRow>
														))
													}
												</TableBody>
											</Table>
										</TableContainer>
									}
								</Grid>
								<Grid item md={5} xs={12}>
									{
										this.state.nonSellingAssignments.length === 0
										?
										<Paper className={classes.noNonSellingLocations}>
											<Box p={3}>
												<Typography variant="body1" align="center">No Non-Selling Locations Found</Typography>
											</Box>
										</Paper>
										:
										<TableContainer component={Paper}>
											<Table>
												<TableHead>
													<TableRow>
														<TableCell>Aisle</TableCell>
														<TableCell>Bay</TableCell>
														<TableCell>Type</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{
														this.state.nonSellingAssignments.map((row) => (
															<TableRow>
																<TableCell>{row.bay.aisle.aisle}</TableCell>
																<TableCell>{row.bay.bay}</TableCell>
																<TableCell>{row.type}</TableCell>
															</TableRow>
														))
													}
												</TableBody>
											</Table>
										</TableContainer>
									}
								</Grid>
							</Grid>
						</Box>
						<Box p={1}>
							<AppBar position="static" color="default">
						        <Tabs
						        	value={this.state.tab}
						          	onChange={this.tab}
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
						<Box p={1}>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={12} md={4}>
						        	<Button variant="contained" color="primary" fullWidth size="large">Search Other Sites</Button>
						        </Grid>
						        <Grid item xs={12} sm={6} md={4}>
						        	<Button variant="contained" color="primary" fullWidth size="large">Upcoming Deliveries</Button>
						        </Grid>
						        <Grid item xs={12} sm={6} md={4}>
						        	<Button variant="contained" color="primary" fullWidth size="large" disabled>View Related Modules</Button>
						        </Grid>
					        </Grid>
						</Box>
					</>
				}
			</>
		)
	}
}

export default withStyles(useStyles)(Products);