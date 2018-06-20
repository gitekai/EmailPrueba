import React from 'react';
// ControlHeader 
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Header from './Header';
import Recepients from './Recepients2';
import Footer from './Footer';
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
  row: {
    flexFlow: 'column nowrap',
    height: '100%',
    width: '100%',
  },
};

class MailContainer extends React.PureComponent {
  
  render() {
    const {classes} = this.props;
    const {title, recepients, subject, body} = this.props;

    return (
      <div className={classes.row}>
        <Header  title={title}/> 
        <Recepients 
          class={classes.rowItem} 
          recepients={recepients}
          toRecepientChange={this.props.toRecepientChange}
          ccClick={this.props.ccClick}
          ccRecepientChange={this.props.ccRecepientChange}
          bccClick={this.props.bccClick}
          bccRecepientChange={this.props.bccRecepientChange}
          />

        <Subject subject={subject} subjectChange={this.props.subjectChange}/>
        <Body body={body} />
        <Footer />
      </div>
    );
  }
}
MailContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MailContainer);

