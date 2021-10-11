import react from "react";

export class InfoTab extends react.Component {
    render() {
        return (
            <div className="">
                <div class="info">
                    <div>CURRENT TIMEZONE</div>
                    <div>{this.props.timezone}</div>
                </div>
                <div class="info">
                    <div>DAY OF THE YEAR</div>
                    <div>{this.props.dayOfYear}</div>
                </div>
                <div class="info">
                    <div>DAY OF THE WEEK</div>
                    <div>{this.props.dayOfWeek}</div>
                </div>
                <div class="info">
                    <div>WEEK NUMBER</div>
                    <div>{this.props.weekNumber}</div>
                </div>
            </div>)
    }

}