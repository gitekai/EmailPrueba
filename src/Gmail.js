import React from 'react';
import {Base64} from 'js-base64';
import Email from './Email';

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
  }
}






class Gmail extends React.Component {
constructor(props){
  super(props);
  this.subjectChange = this.subjectChange.bind(this);
  this.recepientChange = this.recepientChange.bind(this);
  this.clickOpen = this.clickOpen.bind(this);
  this.clickClose = this.clickClose.bind(this);
  this.textChange = this.textChange.bind(this);
  this.sendEmail = this.sendEmail.bind(this);

  this.state = {
    isOpen: false,
    subject: '',
    toRecepient: '',
    mailTitle: 'New Mail',
    body: '',
  };
}

 async clickOpen () {
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
  `);

  this.setState({isOpen: true });
 }

 clickClose() {
  this.setState({isOpen: false });
 }

  componentDidMount() {
    window.gapi.load('client:auth2', initClient);
  }

  subjectChange(subject){
    const mailTitle = subject.length === 0 ? 'New Mail' : subject;
    this.setState({ subject, mailTitle });
  }

  recepientChange(recepient){
    console.log("executed gmail");
    this.setState({toRecepient:recepient});
  }

  textChange(body){
    this.setState({body});  

  }

  sendEmail(){
    const from = 'From:Romeo.hesch@gmail.com';
    const toRecepient =`To:${this.state.toRecepient}`;
    const subject = `Subject:${this.state.subject}`;
    const contentType = 'Content-Type:text/html; charset="UTF-8"'; 
  
    const header = [toRecepient,subject,contentType].join('\r\f');
    const rawMessage = header + this.state.body; 
    console.log(rawMessage);
    const rawB64=Base64.encodeURI(rawMessage);
  
    const request = window.gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': {
        'raw': rawB64,
      }
    });
    request.execute();
  }

  
  

  render(){
    return(
      <div>
        <Email 
          handleSubjectChange={this.subjectChange}
          handleRecepientChange={this.recepientChange}
          handleClickOpen={this.clickOpen}
          handleTextChange={this.textChange}
          handleSendMessage={this.sendEmail}

          mailTitle={this.state.mailTitle}
          isOpen={this.state.isOpen}
        />
      </div>
    );
  }
}


export default Gmail; 

const text = `<div dir=3D "ltr">
<div>Cambio de Font <span style=3D "font-family:georgia,serif">AQUI<br></span></div>
<div>
    <br>
</div>
<div><font size=3D "4">Grande</font></div>
<div><font size=3D "4"><br></font></div>
<div><b><font size=3D"2">Bold</font></b></div>
<div><b><font size=3D"2"><br></font></b></div>
<div><i><font size=3D"2">Iterate</font></i></div>
<div>
    <br>
</div>
<div><u>Underline</u>
    <br>
</div>
<div>
    <br>
</div>
<div><span style=3D "color:rgb(0,0,255)">Blue Text</span></div>
<div><span style=3D "color:rgb(0,0,255)"><br></span></div>
<div style=3D "text-align:center"><span style=3D "color:rgb(0,0,0)">Middle</span></div>
<div style=3D "text-align:center"><span style=3D "color:rgb(0,0,0)"><br></span></div>
<div style=3D "text-align:left">
    <ol>
        <li>listas de 3 puntos</li>
        <li>segunod
            <br>
        </li>
        <li>tercero</li>
    </ol>
    <div>
        <ul>
            <li>Bulletpoints</li>
            <li>again</li>
            <li>anotherone bites the dust</li>
        </ul>
        <div style=3D "margin-left:40px">Indented Line</div>
        <div style=3D "margin-left:40px">
            <br>
        </div>
        <br>
    </div>
    <div>
        <br>
    </div>
    <blockquote class=3D "gmail_quote" style=3D "margin:0px 0px 0px 0.8ex;border-left:1px solid rgb(204,204,204);padding-left:1ex">
        <div>Desaparece todo
            <br>
        </div>
    </blockquote>
    <div>
        <br>
    </div>
</div>
<div>
    <br>
</div>
<div><span style=3D "font-family:georgia,serif"><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span> <span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span><span style=3D ""><span style=3D"font-family:arial,helvetica,sans-serif">Linea larga</span></span>
    <br>
    </span>
</div>
<div><span style=3D "font-family:georgia,serif"><br></span></div>
<div><span style=3D "font-family:georgia,serif"><br></span></div>
</div>`;