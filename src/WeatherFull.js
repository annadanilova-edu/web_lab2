import React, { lazy, Suspense } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherInfo = lazy(() => import('./WeatherInfo'), 'default');

const API_KEY = "bf17aa753eec52f73cdb8d53e0609031";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?";

export default class WeatherFull extends React.Component {
    state = {
        forecast: [],
        error: null
    };

    constructor(props) {
        super(props);

        this.refreshGeoPosition = this.refreshGeoPosition.bind(this);
    }

    windToTextualDescription(degree){
        if (degree>337.5) return 'Northerly';
        if (degree>292.5) return 'North Westerly';
        if (degree>247.5) return 'Westerly';
        if (degree>202.5) return 'South Westerly';
        if (degree>157.5) return 'Southerly';
        if (degree>122.5) return 'South Easterly';
        if (degree>67.5) return 'Easterly';
        if (degree>22.5){return 'North Easterly';}
        return 'Northerly';
    }

    refreshGeoPosition(){
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
                                        windDirection: current.windToTextualDescription(result.wind.deg),
                                        pressure: result.main.pressure,
                                        clouds: result.weather[0].description,
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

    componentDidMount() {
        this.refreshGeoPosition();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <h3>Погода здесь</h3>
                    </div>
                    <div className="col">
                        <button onClick={this.refreshGeoPosition}>Обновить геолокацию</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <h1>{this.state.forecast.city}</h1>
                        </div>
                        <div className="row">
                            <div className="col">
                                <img alt="Icon" src={"http://openweathermap.org/img/wn/" + this.state.forecast.icon + "@2x.png"} />
                            </div>
                            <div className="col">
                                <span style={{'fontSize': '60px'}}>{(Number(this.state.forecast.temp)).toFixed()}  °C</span>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <Suspense fallback={<div>Loading...</div>}>
                            <WeatherInfo
                                windSpeed={this.state.forecast.windSpeed}
                                windDirection={this.state.forecast.windDirection}
                                clouds={this.state.forecast.clouds}
                                pressure={this.state.forecast.pressure}
                                humidity={this.state.forecast.humidity}
                                lat={this.state.forecast.lat}
                                lon={this.state.forecast.lon}
                            />
                        </Suspense>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }
}
