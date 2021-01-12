import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { showBanner } from '../../actions/bannerActions';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function ListItemLink(props) {
	return <ListItem button component='a' {...props} />;
}

const useStyles = theme => ({

});

class LocationBaysList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bay: {}
		};
	}

	componentDidMount() {
		axios.get('/bay/' + this.props.apiUser.site.code +  '/' + this.props.match.params.aisle +  '/' + this.props.match.params.bay, { headers: { Authorization: this.props.apiToken } }).then((bay) => {
			this.setState({ ...this.state, bay: bay.data.data });
		}, (error) => {
			this.props.showBanner('Cannot Get Bay: Bay Not Found', 'error');
		});
	}
	
	render() {
		return (
			<>
				<Box m={1}>
					{
						this.state.bay.bay &&
						<Card>
							<CardContent>
								<List component='nav'>
									<Divider />
									{
										this.state.bay.allowsMultiLocation && 
										<>
										<ListItemLink>
											<ListItemText primary={'Aisle ' + this.state.bay.aisle.aisle + ', Bay ' + this.state.bay.bay + ' - Multi-Locations'} />
										</ListItemLink>
										<Divider />
										</>
									}
									{
										this.state.bay.allowsClearance && 
										<>
										<ListItemLink>
											<ListItemText primary={'Aisle ' + this.state.bay.aisle.aisle + ', Bay ' + this.state.bay.bay + ' - Clearance'} />
										</ListItemLink>
										<Divider />
										</>
									}
									{
										this.state.bay.allowsDisplay && 
										<>
										<ListItemLink>
											<ListItemText primary={'Aisle ' + this.state.bay.aisle.aisle + ', Bay ' + this.state.bay.bay + ' - Display'} />
										</ListItemLink>
										<Divider />
										</>
									}
									{
										this.state.bay.allowsOverstock && 
										<>
										<ListItemLink>
											<ListItemText primary={'Aisle ' + this.state.bay.aisle.aisle + ', Bay ' + this.state.bay.bay + ' - Overstock'} />
										</ListItemLink>
										<Divider />
										</>
									}
									{
										this.state.bay.allowsTopstock && 
										<>
										<ListItemLink>
											<ListItemText primary={'Aisle ' + this.state.bay.aisle.aisle + ', Bay ' + this.state.bay.bay + ' - Topstock'} />
										</ListItemLink>
										<Divider />
										</>
									}
									{
										this.state.bay.allowsStockroom && 
										<>
										<ListItemLink>
											<ListItemText primary={'Aisle ' + this.state.bay.aisle.aisle + ', Bay ' + this.state.bay.bay + ' - Stockroom'} />
										</ListItemLink>
										<Divider />
										</>
									}
								</List>	
							</CardContent>
						</Card>
					}
				</Box>
			</>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withRouter(withStyles(useStyles)(LocationBaysList)));