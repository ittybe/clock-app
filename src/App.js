import Quotes from "./Quotes";
import './App.css';
import React from "react";


export class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      quotes: [
        {
          text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
          author: "James Cameron"
        },
        {
          text: "If life were predictable it would cease to be life, and be without flavor.",
          author: "Eleanor Roosevelt"
        },
        {
          text: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
          author: "Steve Jobs"
        },
      ]
    }
  }
  render() {
    return (
      <div className="main-bg bg-m-light-main">
        <div className="app ">
          <div className="m-7 ">
            <Quotes quotes={this.state.quotes} />
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
