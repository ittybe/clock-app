import react from "react";
import "./InfoTab.css";

export class InfoTab extends react.Component {


    render() {
        return (
            <div className="info-tab info-tab-light dark:info-tab-dark p-7 py-3">
                <div class="info gray-text dark:white-text">
                    <div>CURRENT TIMEZONE</div>
                    <div>{this.props.timezone}</div>
                </div>
                <div class="info gray-text dark:white-text">
                    <div>DAY OF THE YEAR</div>
                    <div>{this.props.dayOfYear}</div>
                </div>
                <div class="info gray-text dark:white-text">
                    <div>DAY OF THE WEEK</div>
                    <div>{this.props.dayOfWeek}</div>
                </div>
                <div class="info gray-text dark:white-text">
                    <div>WEEK NUMBER</div>
                    <div>{this.props.weekNumber}</div>
                </div>
            </div>)
    }

}

export default InfoTab;