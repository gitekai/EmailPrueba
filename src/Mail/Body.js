import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';

import BoldIcon from '@material-ui/icons/FormatBold';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import UnderlineIcon from '@material-ui/icons/FormatUnderlined';
import StrikeThroughIcon from '@material-ui/icons/FormatStrikethrough';

import NumberedListIcon from '@material-ui/icons/FormatListNumbered';
import BulledListIcon from '@material-ui/icons/FormatListBulleted';
/*
import ColorFill from '@material-ui/icons/FormatColorFill';
import ColorText from '@material-ui/icons/FormatColorText';


import QuoteIcon from '@material-ui/icons/FormatQuote';
import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRight from '@material-ui/icons/FormatAlignRight';

import FormatIndentIncrease from '@material-ui/icons/FormatIndentIncrease';
import FormatIndentDecrease from '@material-ui/icons/FormatIndentDecrease';
import { ListItemIcon } from '@material-ui/core';

*/

import Button from '@material-ui/core/Button';
import { Editor } from 'slate-react';



function BoldMark(props) {
  return <strong>{props.children}</strong>
}
function StrikeThroughMark(props) {
  return <del>{props.children}</del>
}

function ItalicMark(props) {
  return <em>{props.children}</em>
}

function UnderlinedMark(props) {
  return <u>{props.children}</u>
}

const DEFAULT_NODE = 'paragraph';
class Body extends React.Component {

  onChange = ({ value }) => {
    this.props.onTextChange(value);
  }

  hasMark = type => {
    const { value } = this.props
    return value.activeMarks.some(mark => mark.type === type)
  }

  hasBlock = type => {
    const { value } = this.props
    return value.blocks.some(node => node.type === type)
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    const { value } = this.props;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  }
 
  onClickBlock = (event, type) => {
    event.preventDefault()
    const { value } = this.props;
    const change = value.change();
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        change
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        change.setBlocks('list-item').wrapBlock(type)
      }
    }
    this.onChange(change)
  }


  renderToolbar = () => {
    return (
      <div className="fontControlls">
        {this.renderMarkButton('bold', <BoldIcon />)}
        {this.renderMarkButton('italic', <ItalicIcon />)}
        {this.renderMarkButton('strikethrough', <StrikeThroughIcon />)}
        {this.renderMarkButton('underlined', <UnderlineIcon />)}
        {this.renderBlockButton('heading-one', <b>H1</b>)}
        {this.renderBlockButton('heading-three', <b>H3</b>)}
        {this.renderBlockButton('numbered-list', <NumberedListIcon/>)}
        {this.renderBlockButton('bulleted-list', <BulledListIcon/>)}
      </div>
    )
  }

  renderMarkButton = (type, icon) => {
    const onClick = event => this.onClickMark(event, type)
    return (
      <Button size='small' onClick={onClick} className={this.props.classes[this.hasMark(type) ? 'marked' : 'notMarked']}>
        {icon}
      </Button>
    )
  }

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type)
    
    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value } = this.props;
      const parent = value.document.getParent(value.blocks.first().key)
      isActive = this.hasBlock('list-item') && parent && parent.type === type
    }
    const onClick = event => this.onClickBlock(event, type);
    return (
      // eslint-disable-next-line react/jsx-no-bind
      <Button size='small' onClick={onClick} className={this.props.classes[(isActive) ? 'marked' : 'notMarked']}>
       {icon}
      </Button>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.body}>
        <Editor className={classes.editor}
          value={this.props.value}
          onChange={this.onChange}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
        <Divider />
        <div className={classes.fontControlls}>
          {this.renderToolbar()}
        </div>
      </div>
    );
  }

  renderMark = props => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />
      case 'strikethrough':
        return <StrikeThroughMark {...props} />
      case 'italic':
        return <ItalicMark {...props} />
      case 'underlined':
        return <UnderlinedMark {...props} />
      default:
        return
    }

  }

  renderNode = props => {
    const { attributes, children, node } = props
    switch (node.type) {
      case 'blockquote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-three':
        return <h3 {...attributes}>{children}</h3>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default: 
        return
    }
  }
 



}

const styles = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  editor: {
    flexGrow: '1',
    padding: '2em',
    overflow: 'auto',
  },
  marked: {
    background: 'lightblue',
  }
};

Body.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Body);