import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { showBanner } from '../../actions/bannerActions';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
    cardContent: {
        "&:last-child": {
            paddingBottom: 16
        }
    }
});

class LocationNavigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			aisles: []
		};
	}
	
	render() {
        const { classes } = this.props;
		return (
			<>  
                <Box m={1}>
                    <Card>
                        <CardContent className={classes.cardContent}>
                            <Breadcrumbs>
                                <Link to='/locations'>
                                    <Typography color="textPrimary">{this.props.apiUser.site.name}</Typography>
                                </Link>
                                {
                                    this.props.match.params.aisle &&
                                    <Link to={'/locations/' + this.props.match.params.aisle}>
                                        <Typography color="textPrimary">{'Aisle ' + this.props.match.params.aisle}</Typography>
                                    </Link>
                                }
                                {
                                    this.props.match.params.bay &&
                                    <Link to={'/locations/' + this.props.match.params.aisle + '/' + this.props.match.params.bay}>
                                        <Typography color="textPrimary">{'Bay ' + this.props.match.params.bay}</Typography>
                                    </Link>
                                }
                                {
                                    this.props.match.params.type &&
                                    <Link to={'#'}>
                                        <Typography color="textPrimary">{this.props.match.params.type}</Typography>
                                    </Link>
                                }
                            </Breadcrumbs>
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

export default connect(mapStateToProps, { showBanner })(withRouter(withStyles(useStyles)(LocationNavigation)));