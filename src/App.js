import Quotes from "./Quotes";
import './App.css';
import React from "react";
import Clock from "./Clock";
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
      isMorning: true,
      timeInfo: {},
      unixtime: null,
      isTabHidden: true
    }
  }

  switchIsTabHidden() {
    const isTabHidden = !this.state.isTabHidden;
    this.setState({isTabHidden: isTabHidden})
  }

  componentDidMount() {
    this.initialize().then(() => {
      setInterval(() => { 
        this.setState({ unixtime: this.state.unixtime + 1 })
        console.log("set interval")
      }, 1000)}, () => { }
    )
  }

  async initialize() {
    const timeInfo = await this.getTimeInfo();
    this.setState({ timeInfo: timeInfo, unixtime: timeInfo.unixtime })
    console.log(`unixtime init: `, timeInfo.unixtime)
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
      <div className="main-bg bg-m-light-main">
        <div className="app ">
          <div className="flex flex-col m-7 h-full">
            <Quotes quotes={this.state.quotes} />
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
              rounded-full py-2 px-2 pl-6
              bg-white
              w-min
              ">
                <span className="button-text">{this.state.isTabHidden ? "MORE" : "LESS"}</span>
                <div className={`arrow-up bg-arrow-up ${this.state.isTabHidden ? "" : "flip-arrow"}`}></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
