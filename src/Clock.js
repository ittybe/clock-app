import React from "react";
import axios from "axios";
import moment from "moment";
import "./Clock.css" 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Time {
    async getIp() {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data);
        if (res.data.IPv4){
            return res.data.IPv4;
        }
        else {
            return null;
        }
    }
    
    async getTimeByIp() {
        try {
            const ip = await this.getIp();
            if (ip){
                const res = await axios.get(`http://worldtimeapi.org/api/ip/${ip}`);
            
                // convert datetime into string with only hours and minutes
                const d = Date.parse(res.data.datetime);
                
                const formatedTime = moment(d).format("HH:mm")

                console.log("time by ip", res)
                return {
                    timezone: res.data.timezone,
                    abbreviation: res.data.abbreviation,
                    dayOfWeek: res.data.day_of_week,
                    dayOfYear: res.data.day_of_year,
                    weekNumber: res.data.week_number,
                    datetime: res.data.datetime,
                    formatedTime: formatedTime
                }
            }
        } catch (error) {
            return {
                timezone: "",
                abbreviation: "",
                dayOfWeek: "",
                dayOfYear: "",
                datetime: "",
                formatedTime: "error"
            }
        }
    }
}


export class Clock extends React.Component {
    constructor(props) {
        super(props)        
        this.state = {
            timeInfo: {},
            isMorning: true
        }
        this.time = new Time();
        this.intervalId = null;
    }

    componentDidMount() {
        this.initialize();
        this.updateClock = this.updateClock.bind(this);
    }

    async initialize() {
        const timeInfo =  await this.time.getTimeByIp();
        timeInfo.timezone = timeInfo.timezone.replace(/[/]/g, ", ").toUpperCase();
        console.log(`init ${JSON.stringify(timeInfo)}`);
        this.setState({timeInfo: timeInfo});
        
        const timestamp = (Date.parse(timeInfo.datetime));
        const d = new Date(timestamp);
        const seconds = d.getSeconds();
        const deltaSeconds = 60 - seconds; 
        console.log(`delta seconds=${deltaSeconds}, seconds = ${seconds}`);
        sleep(deltaSeconds * 1000);
        this.intervalId = setInterval(this.updateClock, 60000);
    } 
    
    async asyncUpdateClock() {
        console.log("updating")
        const timeInfo =  await this.time.getTimeByIp()
        timeInfo.timezone = timeInfo.timezone.replace(/[/]/g, ", ").toUpperCase();
        if (timeInfo.time !== this.state.timeInfo.formatedTime){
            console.log(`updated time=${timeInfo.formatedTime}`);
            this.setState({timeInfo: timeInfo});
        }
        else {
            console.log(`not updated time=${timeInfo.formatedTime}`)
        }
    }

    updateClock() {
        this.asyncUpdateClock()
    }
    
    getGreeting() {
        return this.state.isMorning ? "GOOD MORNING" : "GOOD EVENING";
    }

    render() {
        return (
            <div className="flex-auto flex flex-col justify-end">
                <div className="
                    flex flex-row
                    text-m-greeting-f-s 
                    font-light
                    tracking-widest
                ">
                    <div className="greeting-icon bg-icon-sun dark:bg-icon-moon"></div>{this.getGreeting()}
                </div>
                <div className="
                    text-m-time-f-s 
                    font-bold 
                ">
                    {this.state.timeInfo.formatedTime}
                    <span className="text-m-abbr-f-s font-light">{this.state.timeInfo.abbreviation}</span>
                </div>
                <div className="
                    text-m-greeting-f-s
                    font-bold
                    tracking-widest
                ">
                    IN {this.state.timeInfo.timezone}
                </div>
            </div>
        )
    }
}

export default Clock;