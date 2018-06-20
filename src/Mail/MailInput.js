import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  row: {
    
    display:  'flex',
    flex: '1 0 auto',
    alignItems: 'center',

  },
  adornment:{
    marginLeft: '1em',
    minWidth: '2.5em',
    padding: '0.25em',
    backgroundColor: 'lightBlue',
    color: 'grey',
  },
  input: {
    padding: '1em 1em',
    flex: '1 0 auto',
    borderStyle: 'none',
    background: 'transparent',
    '&:focus': {
      outline: 'none',
    }
  },
}; 

class MailInput extends React.PureComponent{

  valueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.valueChange(name,value);
  }

  render(){
    const {classes, adornmentText, inputValue, name} = this.props; 

    return (
    <div className={classes.row}>
      <div className={classes.adornment}>{adornmentText}</div>
      <input name={name} className={classes.input} type="text" value={inputValue} onChange={this.valueChange}/>
    </div>
    );

  }
}

export default withStyles(styles)(MailInput); 