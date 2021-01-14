import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { showBanner } from '../../actions/bannerActions';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';

const useStyles = theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
	cardContent: {
        '&:last-child': {
            paddingTop: 8,
            paddingBottom: 8
        }
	},
	tableCell: {
		padding: 8
	},
});

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ean: '',
            assignments: [],
            counts: [],
            loading: false
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
        this.setState({ ...this.state, loading: true });
        axios.get('/assignment/product/' + this.props.apiUser.site.code + '/' + this.state.ean, { headers: { Authorization: this.props.apiToken } }).then((assignments) => {
            if (assignments.data.data.length > 0) {
                this.setState({ ...this.state, assignments: assignments.data.data, counts: new Array(assignments.data.data.length).fill(0), loading: false });
            } else {
                this.setState({ ...this.state, loading: false });
                this.props.showBanner('Product Not Located', 'warning');
            }
		}, (error) => {
			switch(error.response.data.description) {
                case 'Invalid EAN Provided':
                    this.setState({ ...this.state, loading: false });
                    this.props.showBanner('Invalid EAN Provided', 'warning');
					break;
                default:
                    this.setState({ ...this.state, loading: false });
                    this.props.showBanner('Something Went Wrong', 'error');
            }
		});
    }

    quantityUpdate = (e) => {
        const counts = this.state.counts;
        counts[e.target.dataset.index] = Number(e.target.value);
        this.setState({ ...this.state, counts: counts });
    }

	render() {
        const { classes } = this.props;
        if (this.state.loading) {
			return (
				<Backdrop className={classes.backdrop} open={this.state.loading}>
        			<CircularProgress color='inherit' />
				</Backdrop>
			);
		}
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
                                onClick={this.props.search}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Box>
                {
                    this.state.assignments.length > 0 &&
                    <Box p={1}>
                        <Card>
                            <CardContent className={classes.cardContent}>
                                <Divider />
                                <Table>
                                    <TableBody>
                                        {
                                            this.state.assignments.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className={classes.tableCell}>{ row.bay.aisle.aisle + '-' + row.bay.bay }</TableCell>
                                                    <TableCell>{row.type}</TableCell>
                                                    <TableCell>
                                                        <InputBase
                                                            inputProps={{ 'data-index': index }}
                                                            placeholder="Quantity"
                                                            style={{ width: '100%' }}
                                                            onChange={this.quantityUpdate}
                                                            value={this.state.counts[index]}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Box>
                }
            </>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withStyles(useStyles)(Stock));