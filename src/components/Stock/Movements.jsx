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
import Button from '@material-ui/core/Button';
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

class Movements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ean: '',
            product: {},
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
        axios.get('/product/' + this.state.ean, { headers: { Authorization: this.props.apiToken } }).then((product) => {
            this.setState({ ...this.state, product: product.data.data, loading: false });
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
                <Box p={1}>
                    <Card>
                        <CardContent className={classes.cardContent}>
                            <Divider />
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Button variant="contained" color="primary" onClick={this.submit}>Submit</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Box>
            </>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withStyles(useStyles)(Movements));