import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Editor, EditorState, RichUtils } from 'draft-js';
import BoldIcon from '@material-ui/icons/FormatBold';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import UnderlineIcon from '@material-ui/icons/FormatUnderlined';

import Button from '@material-ui/core/Button';


const styles =
{
  editor: {
    margin: '20px',
    height: '300px',
    width: '95%',
  },
  inlineStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '90%',
  }
};

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
  }

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  onItalicClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }
  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.editor}>
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />

        </div>
        <div className={classes.inlineStyle}>
        <Button onClick={this.onBoldClick}>
          <BoldIcon />
        </Button>
        <Button onClick={this.onItalicClick}>
          <ItalicIcon />
        </Button>
        <Button onClick={this.onUnderlineClick}>
          <UnderlineIcon />
        </Button>
        </div>
      </Fragment>
    );

  }
}

Body.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Body);