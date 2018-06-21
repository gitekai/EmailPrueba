import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';


const styles = {
  input: {
    width: '100%',
    padding: '1em 1.5em',
    borderStyle: 'none',
    '&:focus': {
      outline: 'none',
    }
  },
};

class Subject extends React.PureComponent {
  onSubjectChange = (e) => {
    this.props.subjectChange(e.target.value);
  }

  render() {
    const { classes, subject } = this.props;

    return (
      <div>
        <input className={classes.input}
          placeholder="Subject:"
          type="text"
          value={subject}
          onChange={this.onSubjectChange}
        />
        <Divider />
      </div>
    );
  }
}

Subject.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Subject);