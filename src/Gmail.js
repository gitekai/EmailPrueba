import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Base64} from 'js-base64';
import Header from './Mail/Header';
import Recepients from './Mail/Recepients2';
import Footer from './Mail/Footer';
import Subject from './Mail/Subject';
import Body from './Mail/Body';
import { Value } from 'slate';
import Html from 'slate-html-serializer';


const styles = {
  column: {
    width:'100%',
    height:'100%',
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  body: {
    background: 'black',
  }
 
};

const CLIENT_ID = '898209058048-csn3rt6mvrnqbej877imcgj646bvuons.apps.googleusercontent.com';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
const SCOPES = 'https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.compose https://mail.google.com/';

function initClient() {
  window.gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
   // sendEmail(); called if the libraries lo
  }else{
    console.log("not logged in");
    window.gapi.auth2.getAuthInstance().signIn();
  }
}

function send(maildata){
  const toRecepient =`To:${maildata.toRecepient}`;
  const subject = `Subject:${maildata.subject}`;

  const contentType = 'Content-Type:text/html; charset="UTF-8"'; 
  const transferEncoding= 'Content-Transfer-Encoding: quoted-printable';
  const contentArray = [toRecepient,subject,contentType,transferEncoding]; 
  if( maildata.cc ){
    contentArray.push(`Cc:${maildata.cc}`);
  }
  if(maildata.bcc){
    contentArray.push(`Bcc:${maildata.bcc}`);
  }

  const header = contentArray.join(`\r\f`);
  const rawMessage = `${header}\n\n${maildata.messageBody}`;

  console.log("sending Message");
  const rawB64=Base64.encodeURI(rawMessage);
  const request = window.gapi.client.gmail.users.messages.send({
    'userId': 'me',
    'resource': {
      'raw': rawB64,
    }
  });
  request.execute();
}

// body methods
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
});

const BLOCK_TAGS = {
  p: 'paragraph',
  blockquote: 'quote',
  ol: 'numbered-list',
  li: 'list-item',
  h1: 'heading-one',
  h3: 'heading-three',
  pre: 'code',
  ul: 'list'
}

const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underlined',
  del: 'strikethrough'
}

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'block',
          type: type,
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'code':
            return (
              <pre>
                <code>{children}</code>
              </pre>
            )
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>
          case 'quote':
            return <blockquote>{children}</blockquote>
          case 'heading-one':
            return <h1>{children}</h1>
          case 'heading-three': 
            return <h3>{children}</h3>
          case 'bulleted-list': 
            return <ul>{children}</ul>
          case 'numbered-list':
            return <ol>{children}</ol>
            case 'list-item':
            return <li>{children}</li>

          default: 
            return
        }
      }
    },
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>
          case 'italic':
            return <em>{children}</em>
          case 'underlined':
            return <u>{children}</u>
            case 'strikethrough':
            return <del>{children}</del>
          default: 
            return
        }
      }
    },
  },
];


const html = new Html({ rules });























class Gmail extends React.Component {
constructor(props){
  super(props);

  this.state = {
    subject: '',
    toRecepient: '',
    ccRecepient: undefined,
    bccRecepient: undefined ,
    mailTitle: 'New Mail',
    body: initialValue,
  };
}

 clickOpen = async () => {
  if(!window.gapi.auth2.getAuthInstance().isSignedIn.get()){
    await window.gapi.auth2.getAuthInstance().signIn();
  }
  const GoogleUser =window.gapi.auth2.getAuthInstance().currentUser.get();
  console.log(`hosted domain = ${GoogleUser.getHostedDomain()}`);
  const userProfile = GoogleUser.getBasicProfile();
  console.log(`
  name = ${userProfile.getName()}
  Image = ${userProfile.getImageUrl()}
  emial = ${userProfile.getEmail()}
  `);   // sendEmail(); called if the libraries lo
 }


  componentDidMount = () => {
    window.gapi.load('client:auth2', initClient);
  }

  subjectChange = (subject) => {
    const mailTitle = subject.length === 0 ? 'New Mail' : subject;
    this.setState({ subject, mailTitle });
  }

  recepientChange= (name,recepient) => {
    this.setState({[name]:recepient});
  } 

  addCCRecepientClick = (e) => {
    this.setState({ccRecepient:''});
  }
  addBCCRecepientClick = (e) => {
    this.setState({bccRecepient:''});
  }

  bodyTextChange = (body) => {
    this.setState({body});  
  }

  clickBodyFontHandler = () => {
    this.state.body.change().toggleMark('bold');
  }

  sendEmail = () => {
    send({
      toRecepient: this.state.toRecepient,
      cc: this.state.ccRecepient,
      bcc:this.state.bccRecepient,
      subject: this.state.subject,
      messageBody: html.serialize(this.state.body),
    })
  }
 
 render(){
    const classes = this.props.classes;
    const {mailTitle, subject, toRecepient, ccRecepient, bccRecepient } = this.state;
   
    const recepients = {to: toRecepient, cc: ccRecepient, bcc: bccRecepient };


    return(
      <div className={classes.column}>
        <Header  title={mailTitle}/>
        <Subject className={classes.subject} subject={subject} subjectChange={this.subjectChange}/>
        <Recepients 
          class={classes.body} 
          recepients={recepients}
          recepientChange={this.recepientChange}
          addBCCRecepientClick={this.addBCCRecepientClick}
          addCCRecepientClick={this.addCCRecepientClick}
        />
        <Body className={classes.body} clickHandler={this.clickBodyFontHandler} onTextChange={this.bodyTextChange} value={this.state.body} />
        <Footer onSend={this.sendEmail}/>
      </div>
    );
  }
}


export default withStyles(styles)(Gmail); 