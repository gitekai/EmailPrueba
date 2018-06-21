import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';



const headerStyles = {
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexflow: 'row wrap',
    background: '#f2f2f2',
    marginTop: '1em',
  },
  tools:{
    padding: '0.5em'
  }
 
}
class Footer extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.toolbar}>
        <div className={classes.tools}>
            <Button size='small' variant='outlined' onClick={this.props.onSend} >SEND</Button>
        </div>
      </div>

    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(headerStyles)(Footer);