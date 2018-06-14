import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';


const styles = {
 subject: {
   width: '90%',
   margin: '10px',
 }
};
class Subject extends React.Component {
  render() {
    const { classes } = this.props;
    const subject=this.props.subject;

    return (
      <Fragment>
      <Input className={classes.subject}  disableUnderline={true}  placeholder="Subject:" margin="normal" value={subject}/>
      <Divider />
    </Fragment>
    );
  }
}

Subject.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Subject);