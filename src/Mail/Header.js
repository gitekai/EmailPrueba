import React from 'react';
// ControlHeader 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';



const headerStyles = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
 
}
class ControlHeader extends React.Component {
  render() {
    const { classes } = this.props;
    const title=this.props.title;

    return (
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <div >{title}</div>
          </Toolbar>
        </AppBar>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(headerStyles)(ControlHeader);