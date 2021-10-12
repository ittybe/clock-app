import React from "react";
import moment from "moment";
import "./Clock.css"
// TODO error handling in Time class

export class Clock extends React.Component {
    getFormatedTime() {
        const milliseconds = this.props.unixtime * 1000;
        const d = new Date(milliseconds);

        const formatedTime = moment(d).format("HH:mm");

        return formatedTime;
    }

    getLocation() {
        return `IN ${this.props.city}, ${this.props.countryCode}`.toUpperCase();
    }

    getGreeting() {
        return this.props.isMorning ? "GOOD MORNING" : "GOOD EVENING";
    }

    render() {
        return (
            <div className="flex-auto flex flex-col ">
                <div className="
                    flex flex-row
                    text-m-greeting-f-s 
                    font-light
                    tracking-widest
                    md:text-t-greeting-f-s
                    xl:text-d-greeting-f-s
                ">
                    <div className="greeting-icon bg-icon-sun dark:bg-icon-moon"></div>{this.getGreeting()}
                </div>
                <div className="
                    text-m-time-f-s 
                    font-bold 
                    md:text-t-time-f-s 
                    xl:text-d-time-f-s 

                ">
                    {this.getFormatedTime()}
                    <span className="text-m-abbr-f-s font-light">{this.props.abbreviation}</span>
                </div>
                <div className="
                    text-m-greeting-f-s
                    font-bold
                    tracking-widest
                    md:text-t-greeting-f-s
                    xl:text-d-greeting-f-s
                ">
                    {this.getLocation()}
                </div>
            </div>
        )
    }
}

export default Clock;