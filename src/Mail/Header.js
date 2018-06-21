import React from 'react';
// ControlHeader 

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';



const headerStyles = {
  toolbar: {
    padding: '1.5em',
    background: 'grey',
    display: 'flex',
    alignItems: 'center',
  },
 
}
class ControlHeader extends React.PureComponent {
  render() {
    const { classes } = this.props;
    const title=this.props.title;

    return (
        <div className={classes.toolbar}>
            <div >
              {title}
            </div>
        </div>
    );
  }
}

ControlHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(headerStyles)(ControlHeader);