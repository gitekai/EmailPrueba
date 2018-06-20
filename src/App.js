import React, { Fragment } from 'react';
import Gmail from './Gmail';
import Email from './Mail/Email2';


const data = {
  title: 'New Message',
  recepients: {
    to: ['Romeo.hesch@gmail.com','Romeo.hesch@meteologica.com'],
    cc: ['Josito.ramosus@hotmail.com'],
    bcc: [],
  },
 
  subject: 'Title of subject',
  body: `There should be a lot of text going on:
  Second Line of Text
  Third line of Text
  Fourth Line of Text 

  MFG

  Romeo Klaus, Hesch
  `
};


class App extends React.Component {
  
  render(){
  return (
      <Gmail/>
  );
}
}


export default App;
