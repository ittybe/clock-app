import React from "react";
import axios from "axios";
import moment from "moment";

import iconMoon from "./assets/desktop/icon-moon.svg";
import iconSun from "./assets/desktop/icon-sun.svg";

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
            const res = await axios.get(`http://worldtimeapi.org/api/ip/${ip}`);
            
            // convert datetime into string with only hours and minutes
            const d = Date.parse(res.data.datetime);
            console.log(`datetime: ${d}`)
            
            const formatedTime = moment(d).format("HH:mm")
            console.log(`formatedTime: ${formatedTime}`)
            
            console.log(res.data)
            return {
                timezone: res.data.timezone,
                abbreviation: res.data.abbreviation,
                dayOfWeek: res.data.day_of_week,
                dayOfYear: res.data.day_of_year,
                weekNumber: res.data.week_number,
                time: formatedTime
            }
        } catch (error) {
            return {
                timezone: "",
                abbreviation: "",
                dayOfWeek: "",
                dayOfYear: "",
                weekNumber: "",
                time: "error"
            }
        }
    }
}


export class Clock extends React.Component {
    constructor(props) {
        super(props)        
        this.state = {
            timeInfo: {} 
        }
        this.time = new Time();
        this.initialize();
    }

    async initialize() {
        const timeInfo =  await this.time.getTimeByIp()
        timeInfo.timezone = timeInfo.timezone.replace(/[/]/g, ", ")
        console.log(`init, ${JSON.stringify(timeInfo)}`)
        this.setState({timeInfo: timeInfo});
    } 

    render() {
        return (
            <div className="flex-auto flex flex-col justify-end">
                <div className="
                    text-m-greeting-f-s 
                ">
                    <div className="icon"></div>{}
                </div>
                <div className="
                    text-m-time-f-s 
                    text-bold 
                ">
                    {this.state.timeInfo.time}
                    <div className="text-m-abbr-f-s">{this.state.timeInfo.abbreviation}</div>
                </div>
                <div className="
                    text-m-greeting-f-s
                ">
                    in {this.state.timeInfo.timezone}
                </div>
            </div>
        )
    }
}

export default Clock;