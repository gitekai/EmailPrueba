import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Input from '@material-ui/core/Input';



const styles = {
  appBar: {
    position: 'relative',
  },
  foodBar: {
    position: 'relative',
    background: '#cfcfcf',
  },
  mailBody: {
    height: '100%'
  },
  inputLines: {
    padding: '10px',
    marginBottom: '5px',
  },
  content: {
    flex: 1,
  }
};



function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {


  handleSubjectChange = (e) => {
    this.props.handleSubjectChange(e.target.value);
  }

  handleSendMessage = () => {
   this.props.handleSendMessage();
  }

  handleRecipientChange = (e) => {
   this.props.handleRecepientChange(e.target.value);
  }

  handleTextChange = (e) => {
    this.props.handleTextChange(e.target.value);
  }

  handleOpenDialog =() => {
    this.props.handleClickOpen();
  }



  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button style={{background:'red'}} onClick={this.handleOpenDialog}>Open Email dialog</Button>
        <Dialog
          fullScreen
          open={this.props.isOpen}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {this.props.mailTitle}
              </Typography>
            </Toolbar>handleTextChange
          </AppBar>

              <div className={classes.content}>
              <Input fullWidth={true} onChange={this.handleRecipientChange} placeholder="To" className={classes.inputLines} />
              <Input fullWidth={true} onChange={this.handleSubjectChange} placeholder="Subject" className={classes.inputLines} />

              <Input fullWidth={true} style={{ background: 'red' }} onChange={this.handleTextChange} multiline
                classes={{ multiline: classes.mailBody}}
              />
              </div>


          <AppBar className={classes.foodBar}>
            <Toolbar>
            <Button color="inherit" onClick={this.handleSendMessage}>
                Send
              </Button>
            </Toolbar>
          </AppBar>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
