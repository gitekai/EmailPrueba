import React, { Fragment } from 'react';
import MailInput from './MailInput';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  recepient: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },

  toRecepientRow: {
    //referente a column 
    flexBasis: '30%',
    //referent a row 
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  toRecepientInput: {
    display: 'flex',
    marginRigth: '1%',
    flex: '1 0 auto',
  },
  ButtonElement: {
  },
  extraRecepients: {
    flexBasis: '30%',
  }
};
class Recepients2 extends React.PureComponent {
  render() {
    const { classes } = this.props;
    const { to, cc, bcc } = this.props.recepients;

    return (
      <div className={classes.recepient}>
        <div className={classes.toRecepientInput}>
          <MailInput className={classes.toRecepientInput} name='toRecepient'  adornmentText="To:" inputValue={to} valueChange={this.props.recepientChange}/>
          { typeof(cc) === 'undefined'
            && <Button className={classes.ButtonElement} onClick={this.props.addCCRecepientClick}>Cc:</Button>
          }
          { typeof(bcc)  === 'undefined'
            && <Button className={classes.ButtonElement} onClick={this.props.addBCCRecepientClick} >Bcc:</Button>
          }

        </div>
        <Divider />

        { typeof(cc) !== 'undefined'
          && <Fragment>
            <MailInput name='ccRecepient' className={classes.extraRecepients} adornmentText="Cc:" inputValue={cc} valueChange={this.props.recepientChange}/>
            <Divider />
            </Fragment>

        }
        { typeof(bcc) !== 'undefined'
          && <Fragment>
            <MailInput name='bccRecepient' className={classes.extraRecepients} adornmentText="Bcc:" inputValue={bcc} valueChange={this.props.recepientChange}/>
            <Divider />
            </Fragment>
        }
      </div>
    );

  }

}

export default withStyles(styles)(Recepients2); 