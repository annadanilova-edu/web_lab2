import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = "bf17aa753eec52f73cdb8d53e0609031";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?";

class WeatherInfo extends React.Component {
    render() {
        return (
            <table style={{width: "100%"}}>
                <tbody>
                <tr>
                    <td>Ветер</td>
                    <td style={{'text-align': "end"}}>{this.props.windSpeed} m/s</td>
                </tr>
                <tr>
                    <td>Облачность</td>
                    <td style={{'text-align': "end"}}>{this.props.clouds}</td>
                </tr>
                <tr>
                    <td>Давление</td>
                    <td style={{'text-align': "end"}}>{this.props.pressure} hpa</td>
                </tr>
                <tr>
                    <td>Влажность</td>
                    <td style={{'text-align': "end"}}>{this.props.humidity} %</td>
                </tr>
                <tr>
                    <td>Координаты</td>
                    <td style={{'text-align': "end"}}>[{this.props.lat}, {this.props.lon}]</td>
                </tr>
                </tbody>
            </table>
        )
    }
}

class WeatherFull extends React.Component {

    state = {
        forecast: [],
        error: null
    };

    componentDidMount() {
        let current = this;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                    let link = API_URL
                        + "lat=" + (position.coords.latitude).toFixed(1)
                        + "&lon=" + (position.coords.longitude).toFixed(1)
                        + "&units=metric"
                        + "&appid=" + API_KEY;

                    fetch(link)
                        .then(res => res.json())
                        .then((result) => {
                                console.log(result);
                                current.setState({
                                    forecast: {
                                        city: result.name,
                                        temp: result.main.temp,
                                        humidity: result.main.humidity,
                                        windSpeed: result.wind.speed,
                                        pressure: result.main.pressure,
                                        clouds: result.clouds.all,
                                        icon: result.weather[0].icon,
                                        lon: result.coord.lon,
                                        lat: result.coord.lat,
                                    }
                                });
                                console.log(current.state.forecast);
                            },
                            (error) => {
                                current.setState({error: error});
                            }
                        );
                },
                function (err) {
                    if (err.code === 1) {
                        alert("Error: Access is denied!");
                    } else if (err.code === 2) {
                        alert("Error: Position is unavailable!");
                    }
                });
        }

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Погода здесь</h3>
                    </div>
                    <div className="col-9">
                        <button>Обновить геолокацию</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <h1>{this.state.forecast.city}</h1>
                        </div>
                        <div className="row">
                            <div className="col">
                                Icon
                            </div>
                            <div className="col">
                                <span style={{'font-size': '30px'}}>{this.state.forecast.temp}  °C</span>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <WeatherInfo
                            windSpeed={this.state.forecast.windSpeed}
                            clouds={this.state.forecast.clouds}
                            pressure={this.state.forecast.pressure}
                            humidity={this.state.forecast.humidity}
                            lat={this.state.forecast.lat}
                            lon={this.state.forecast.lon}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

class App extends React.Component {

    render() {
        return (
            <div>
                <WeatherFull/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);