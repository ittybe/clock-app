import React from "react";
import refresh from "./assets/desktop/icon-refresh.svg";
import "./Quotes.css";

export class Quotes extends React.Component {
    constructor(props) {
        super(props);

        let firstQuote = null
        if (this.props.quotes.length > 0){
            firstQuote = this.props.quotes[0];
        }
        else {
            console.log("no quotes in props")
        }
        
        this.state = {
            currentQuote: {
                text: firstQuote.text,
                author: firstQuote.author,
                index: 0
            }
        }
    }

    updateQuote() {
        if (this.props.quotes.length === this.state.currentQuote.index + 1) {
            const firstQuote = this.props.quotes[0];
            const currentQuote = {
                text: firstQuote.text,
                author: firstQuote.author,
                index: 0
            }

            this.setState({currentQuote: currentQuote})
        }
        else {
            const index = this.state.currentQuote.index + 1;
            const nextQuote = this.props.quotes[index];
            const currentQuote = {
                text: nextQuote.text,
                author: nextQuote.author,
                index: index
            }

            this.setState({currentQuote: currentQuote})
        }
    }

    render() {
        return (
            <div className="flex flex-row leading-relaxed">
                <div>
                    <div className="">"{this.state.currentQuote.text}"</div>
                    <div className="mt-2 font-bold ">{this.state.currentQuote.author}</div>
                </div>
                <button className="refresh-icon " onClick={() => this.updateQuote()}>
                    <img src={refresh} alt="refresh"/>
                </button>
            </div>
        ) 
    }
}

export default Quotes;