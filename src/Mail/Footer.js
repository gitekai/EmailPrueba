import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';



const headerStyles = {
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexflow: 'row wrap',
    background: '#f2f2f2',
  },
 
}
class Footer extends React.Component {
  render() {
    const { classes } = this.props;

    return (
        <BottomNavigation className={classes.toolbar} position="static">
          <Toolbar >
            <Button size='small' variant='outlined' >SEND</Button>
          </Toolbar>
        </BottomNavigation>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(headerStyles)(Footer);