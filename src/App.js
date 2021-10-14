import Quotes from "./Quotes";
import Clock from "./Clock";
import InfoTab from "./InfoTab";

import './App.css';
import React from "react";
import axios from "axios";
import moment from "moment"

async function getGeo() {
  const res = await axios.get('https://geolocation-db.com/json/')
  console.log("geo: ", res.data);
  if (res.data.IPv4) {
    return {
      ip: res.data.IPv4,
      countryCode: res.data.country_code,
      city: res.data.city
    };
  }
  else {
    return null;
  }
}

async function getTimeByIp(ip) {
  if (ip) {
    const res = await axios.get(`https://worldtimeapi.org/api/ip/${ip}`);

    // convert datetime into string with only hours and minutes
    console.log("time by ip", res)

    return {
      timezone: res.data.timezone,
      abbreviation: res.data.abbreviation,
      dayOfWeek: res.data.day_of_week,
      dayOfYear: res.data.day_of_year,
      weekNumber: res.data.week_number,
      unixtime: res.data.unixtime,
    }
  }
}

export class App extends React.Component {
  constructor(props) {
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
      ],
      isMorning: true,
      timeInfo: {},
      unixtime: null,
      isTabHidden: true
    }
  }

  switchIsTabHidden() {
    const isTabHidden = !this.state.isTabHidden;
    this.setState({ isTabHidden: isTabHidden })
  }

  componentDidMount() {
    console.log("component did mount")
    this.initialize().then(() => {
      this.isMorningNow(this.state.unixtime);
      setInterval(() => {
        this.setState({ unixtime: this.state.unixtime + 1 })
        console.log("set interval")
        const difference = this.state.unixtime - this.state.timeInfo.unixtime;
        if (difference > 180) {
          this.updateTime()
        }
      }, 1000)
    }, () => { })
  }

  async initialize() {
    const timeInfo = await this.getTimeInfo();
    this.setState({ timeInfo: timeInfo, unixtime: timeInfo.unixtime })
    console.log(`unixtime init: `, timeInfo.unixtime)
  }

  isMorningNow(unixtime) {
    // will change morning value if it s not 
    // A compared to B 
    const datetime = new Date(unixtime * 1000)
    const now = moment(datetime);
    const startOfDay = moment(datetime).startOf("day");
    const hoursAgoMassage = startOfDay.from(now)
    console.log(`isMorningNow message ${hoursAgoMassage} now ${now} startOfday ${startOfDay} unixtime ${unixtime}`)

    if (/\d+ hour.? ago/g.test(hoursAgoMassage)) {
      const arr = hoursAgoMassage.split(" ");
      const hours = parseInt(arr[0]);
      if (hours >= 16) {
        const isMorning = false;
        this.setState({ isMorning: isMorning })
      }
      else {
        const isMorning = true;
        this.setState({ isMorning: isMorning })
      }
    }
  }

  async updateTime() {
    const timeInfo = await this.getTimeInfo();
    this.setState({ timeInfo: timeInfo, unixtime: timeInfo.unixtime })
    console.log(`update time : `, timeInfo.unixtime)
    console.log(`${moment(timeInfo.unixtime).startOf()}`)
    this.isMorningNow(timeInfo.unixtime)
  }

  async getTimeInfo() {
    const geo = await getGeo();
    const time = await getTimeByIp(geo.ip);

    return {
      ip: geo.ip,
      countryCode: geo.countryCode,
      city: geo.city,
      timezone: time.timezone,
      abbreviation: time.abbreviation,
      dayOfWeek: time.dayOfWeek,
      dayOfYear: time.dayOfYear,
      weekNumber: time.weekNumber,
      unixtime: time.unixtime,
    }
  }


  render() {
    return (
      <div className={`w-full h-full ${this.state.isMorning ? "" : "dark"}`}>
        <div className="main-bg bg-m-light-main dark:bg-m-dark-main md:bg-t-light-main md:dark:bg-t-dark-main lg:bg-d-light-main lg:dark:bg-d-dark-main">
          <div className="app-wrapper">
            <div className="app">
              <div className="top flex flex-col h-full m-7 md:m-16 ">
                <div className={`text-m-button-f-s md:text-t-button-f-s mb-20 ${this.state.isTabHidden ? "block" : "hidden"}`}>
                  <Quotes quotes={this.state.quotes} />
                </div>
                <div className="mt-auto lg:flex lg:flex-row lg:items-end">
                  <Clock
                    abbreviation={this.state.timeInfo.abbreviation}
                    unixtime={this.state.unixtime}
                    city={this.state.timeInfo.city}
                    countryCode={this.state.timeInfo.countryCode}
                    isMorning={this.state.isMorning} />
                  <button onClick={() => this.switchIsTabHidden()}
                    className="
                moreless-button
                flex-none flex flex-row 
                items-center
                rounded-full py-1 px-1 pl-6 md:py-2 md:px-2 md:pl-4
                bg-white
                w-min
                mt-16
                ">
                    <span className="button-text text-m-button-f-s md:text-t-button-f-s">{this.state.isTabHidden ? "MORE" : "LESS"}</span>
                    <div className={`arrow-up bg-arrow-up ${this.state.isTabHidden ? "" : "flip-arrow"}`}></div>
                  </button>
                </div>
              </div>
              <div className={`bottom ${this.state.isTabHidden ? "hidden" : "block"}`}>
                <InfoTab
                  timezone={this.state.timeInfo.timezone}
                  dayOfYear={this.state.timeInfo.dayOfYear}
                  dayOfWeek={this.state.timeInfo.dayOfWeek}
                  weekNumber={this.state.timeInfo.weekNumber}
                  isMorning={this.state.isMorning} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
