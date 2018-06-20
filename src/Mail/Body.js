import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';


import BoldIcon from '@material-ui/icons/FormatBold';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import UnderlineIcon from '@material-ui/icons/FormatUnderlined';

import Button from '@material-ui/core/Button';

import { Editor } from 'slate-react';
import { Value } from 'slate';

function BoldMark(props) {
  return <strong>{props.children}</strong>
}
function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '',
              },
            ],
          },
        ],
      },
    ],
  },
})


class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: initialValue };
  }

  onChange = ({ value }) => {
    console.log(value);
    this.setState({ value })
  }

  onKeyDown = (event, change) => {

    if (event.key !== '&') {
      return;
    }
    event.preventDefault();

    change.toggleMark('bold');
    return true;
  }

  render() {
    const { classes, bodyText } = this.props;

    return (
      <div className={classes.body}>
        <Editor className={classes.editor}
          value={this.state.value}
          onChange={this.onChange}
          renderNode={this.renderNode}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
        />
        <Divider />
        <div className={classes.fontControlls}>
          <Button onClick={this.boldClick}>
            <BoldIcon />
          </Button>
          <Button onClick={this.props.italicClick}>
            <ItalicIcon />
          </Button>
          <Button onClick={this.props.underlineClick}>
            <UnderlineIcon />
          </Button>
        </div>
        <Divider />


      </div>
    );
  }

  renderMark = props => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />
    }
  }

  renderNode = props => {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props} />
    }
  }



}

const styles= {
  body: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1, 
  },
  editor: {
    flexGrow: '1',
    padding: '2em',
  },
};

Body.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Body);