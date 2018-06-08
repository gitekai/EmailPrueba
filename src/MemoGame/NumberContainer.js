import React from 'react';

const gameConfig = {
  numberLength: 2,
  sequenceLength: 30,
  gameTimeLimit: 600,
}

class RandomNumber extends React.Component {

  render() {
    return (
      <div className="digit">
        {Math.floor(Math.random() * Math.floor(10))}
      </div>
    );
  }
}


export class Number extends React.Component {
  render() {
    const numberLength = this.props.numberLength;
    let digits = [];
    for (let i = 0; i < numberLength; i++) {
      digits.push(<RandomNumber key={i} />);
    }

    return (
      <div className="Number">
        {digits}
      </div>
    );
  }
}


export class NumberSequence extends React.Component {

  render() {
    const numberLength = this.props.numberLength;
    const sequenceLength = this.props.sequenceLength;

    let numberSequence = [];
    for (let i = 0; i< Math.floor(sequenceLength/numberLength); i++) {
      numberSequence.push(<Number key={i} numberLength={numberLength}/>);
    }
    const rest = sequenceLength%numberLength;
    if(rest !== 0 ){
      numberSequence.push(<Number key={numberSequence.length} numberLength={rest}/>);
    }

    return (
      <div className="numberSequence">
        {numberSequence}
      </div>
    );
      
  }
}

 


//hierarchy . 
/*
  GameConfig: contains necesary gameConfiguration
    NumberGenerator: generates all Numbers with its coresponding length
      PageContainer: Contains all pages
        Page: Visualizes currentPageSite
        Kennort: Visualizes Kennort 
          Number: Visualizes Number 
          MajorName: Visualizes the MajorName for a number 




*/

