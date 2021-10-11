import Quotes from "./Quotes";
import Clock from "./Clock";
import InfoTab from "./InfoTab";

import './App.css';
import React from "react";
import axios from "axios";

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
    const res = await axios.get(`http://worldtimeapi.org/api/ip/${ip}`);

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
      isMorning: false,
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
    this.initialize().then(() => {
      setInterval(() => {
        this.setState({ unixtime: this.state.unixtime + 1 })
        console.log("set interval")
        const difference = this.state.timeInfo.unixtime - this.state.unixtime;
        if (difference > 180) {
          this.updateTime()
        }
      }, 1000)
    }, () => { }
    )
  }

  async initialize() {
    const timeInfo = await this.getTimeInfo();
    this.setState({ timeInfo: timeInfo, unixtime: timeInfo.unixtime })
    console.log(`unixtime init: `, timeInfo.unixtime)
  }

  async updateTime () {
    const timeInfo = await this.getTimeInfo();
    this.setState({ timeInfo: timeInfo, unixtime: timeInfo.unixtime })
    console.log(`update time: `, timeInfo.unixtime)
  }

  async GetTimeInfo() {
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
        <div className="main-bg bg-m-light-main dark:bg-m-dark-main">
          <div className="app ">
            <div className="flex flex-col m-7 h-full">
              <div className={this.state.isTabHidden ? "block" : "hidden"}>
                <Quotes quotes={this.state.quotes} />
              </div>
              <div className="mt-auto">
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
                rounded-full py-1 px-1 pl-6
                bg-white
                w-min
                mt-16
                ">
                  <span className="button-text text-m-button-f-s">{this.state.isTabHidden ? "MORE" : "LESS"}</span>
                  <div className={`arrow-up bg-arrow-up ${this.state.isTabHidden ? "" : "flip-arrow"}`}></div>
                </button>
              </div>
            </div>
            <div className={this.state.isTabHidden ? "hidden" : "block"}>
              <InfoTab
                timezone={this.state.timeInfo.timezone}
                dayOfYear={this.state.timeInfo.dayOfYear}
                dayOfWeek={this.state.timeInfo.dayOfWeek}
                weekNumber={this.state.timeInfo.weekNumber} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
