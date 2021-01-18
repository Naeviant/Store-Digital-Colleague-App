import React from 'react';
import TabPanel from '../common/TabPanel';
import AppBar from "@material-ui/core/AppBar";
import Box from '@material-ui/core/Box';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";

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
				<AppBar position="static" color="white">
			        <Tabs
			        	value={this.state.tab}
			          	onChange={this.onChange}
			          	indicatorColor="primary"
			          	textColor="primary"
			          	variant="fullWidth"
			        >
			        	<Tab label="Description" />
			        	<Tab label="Info" />
			        	<Tab disabled label="Reviews" />
			        </Tabs>
			        <TabPanel value={this.state.tab} index={0}>
						<Box p={1}>
							<Typography variant="body1">
								{
									this.props.product.description ? this.props.product.description : <em>No Description Provided</em>
								}
							</Typography>
						</Box>
			        </TabPanel>
			        <TabPanel value={this.state.tab} index={1}>
						<Box p={1}>
							{
								this.props.product.info.length === 0
								?
								<em>No Information Provided</em>
								:
								<Table>
									<TableBody>
										{
											this.props.product.info.map(row => (
												<TableRow key={row.name}>
													<TableCell><strong>{row.name}</strong></TableCell>
													<TableCell>{row.value}</TableCell>
												</TableRow>
											))
										}
									</TableBody>
								</Table>
							}
						</Box>
					</TabPanel>
			        <TabPanel value={this.state.tab} index={2}></TabPanel>
			    </AppBar>
			</Box>
		);
	}
}

export default ProductButtons;