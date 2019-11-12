import React from 'react';

export default class WeatherInfo extends React.Component {
    render() {
        return (
            <table>
                <tbody>
                <tr>
                    <td>Ветер</td>
                    <td style={{'textAlign': "end"}}>{this.props.windDirection}, {this.props.windSpeed} m/s</td>
                </tr>
                <tr>
                    <td>Облачность</td>
                    <td style={{'textAlign': "end"}}>{this.props.clouds}</td>
                </tr>
                <tr>
                    <td>Давление</td>
                    <td style={{'textAlign': "end"}}>{this.props.pressure} hpa</td>
                </tr>
                <tr>
                    <td>Влажность</td>
                    <td style={{'textAlign': "end"}}>{this.props.humidity} %</td>
                </tr>
                <tr>
                    <td>Координаты</td>
                    <td style={{'textAlign': "end"}}>[{this.props.lat}, {this.props.lon}]</td>
                </tr>
                </tbody>
            </table>
        )
    }
}