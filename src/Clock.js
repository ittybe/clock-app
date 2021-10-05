import React from "react";
import axios from "axios";
import moment from "moment";

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
            const formatedTime = moment(d).format("hh:mm")
            
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
                time: ""
            }
        }
        
        
    }
}


export class Clock extends React.Component {
    constructor(props) {
        super(props)
        const t = new Time()
        this.state = {
            timeInfo: t.getTimeByIp().then((result) => {
                console.log(`promise then, ${JSON.stringify(result)}`)
                return result
            } ) 
        }
    }

    render() {
        return (
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}

export default Clock;