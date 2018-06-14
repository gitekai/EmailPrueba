import React from 'react';
// ControlHeader 
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


import Header from './Header';
import Recepients from './Recepients';
import Subject from './Subject';
import Body from './Body';

/*
MailContainer
	MailHeader
  Recepients
    To
    Cc
    Bcc
	Subject
	Body
    Controlls
  MailFooter
*/

//        


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    flexGroth: 10,
  }
};

class MailContainer extends React.Component {
  
  render() {
    const {classes} = this.props;
    const {title, recepients, subject, body} = this.props.data;

    return (
      <div className={classes.root}>
        <Header  title={title}/> 
        <Recepients  recepients={recepients}/>
        <Subject subject={subject}/>
        <Body className={classes.body} body={body} />
        <ControlFooter />
      </div>
    );
  }
}
MailContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MailContainer);


class ControlFooter extends React.Component {
  render(){
    return(
      <div className="footer">
      </div>
    );
  }
}
