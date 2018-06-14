import React, { Fragment } from 'react';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';


import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const styles = {
  inputGroup: {
    margin: '10px',
    display: 'flex',
  },
  toField: {
    flexGrow: '10',
  },
  actionButton: {
    flexGrow: '0'
  },
  inputField: {
    margin: '10px',
  },
  inputAdornment: {
    background: 'lightBlue',
    padding: '5px',
    margin: '5px',
  }

};

function MyInput(props) {
  const {adornmentText, value, classes } = props;

  return (
    <Fragment>
      <Input
        className={classes.inputField}
        startAdornment={
          <InputAdornment className={classes.inputAdornment}>
            {adornmentText}
      </InputAdornment>
        }
        disableUnderline={true}
        value={value}
      />
      <Divider />
    </Fragment>
  );
}

class Recepients extends React.Component {

  render() {
    const { classes } = this.props;
    const { to, cc, bcc } = this.props.recepients;

    let ccButton = <Button className={classes.actionButton}>Cc</Button>;
    let ccInput;
    if (cc.length > 0) {
      ccButton = null
      ccInput = <MyInput adornmentText={"Cc:"} value={cc.join(' ')} classes={classes} />;
    }

    let bccButton = <Button className={classes.actionButton}>Bcc</Button>;
    let bccInput;
    if (bcc.length > 0) {
      bccButton = null;
      bccInput = <MyInput classes={classes} adornmentText={"Bcc:"} value={bcc.join(' ')} />;
    }

    return (
      <Fragment>
        <div className={classes.inputGroup}>
          <Input
            className={classes.toField}
            startAdornment={
              <InputAdornment className={classes.inputAdornment}>
                To:
              </InputAdornment>
            }
            disableUnderline={true}
            value={to.join(' ')}
          />
          {ccButton}
          {bccButton}
        </div>
        <Divider />
        {ccInput}
        {bccInput}
      </Fragment>
    );
  }
}

Recepients.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Recepients)