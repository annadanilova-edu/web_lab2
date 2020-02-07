import React, { lazy, Suspense } from 'react';
import {connect} from "react-redux";
import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from "../redux/store";

import { windToTextualDescription } from '../utils'

const WeatherInfo = lazy(() => import('./WeatherInfo'), 'default');

class WeatherFull extends React.Component {
    state = {
        infoLoaded: false,

        forecast: [],
        message: "Пока здесь ничего нет",
        errorMessage: "",
    };

    constructor(props) {
        super(props);

        this.refreshGeoPosition = this.refreshGeoPosition.bind(this);
    }

    refreshGeoPosition(){
        let current = this;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                    let link = current.props.API_URL
                        + "lat=" + (position.coords.latitude).toFixed(1)
                        + "&lon=" + (position.coords.longitude).toFixed(1)
                        + "&units=metric"
                        + "&appid=" + current.props.API_KEY;

                    current.setState({message: "Идет загрузка данных"})

                    fetch(link)
                    .then(async res => {
                          if (res.ok) {
                            return await res.json();
                          } else return {cod: "404"}
                          })
                                .then((result) => {
                                    if (result.cod == "200") {
                                current.setState({
                                    forecast: {
                                        city: result.name,
                                        temp: result.main.temp,
                                        humidity: result.main.humidity,
                                        windSpeed: result.wind.speed,
                                        windDirection: windToTextualDescription(result.wind.deg),
                                        pressure: result.main.pressure,
                                        clouds: result.weather[0].description,
                                        icon: result.weather[0].icon,
                                        lon: result.coord.lon,
                                        lat: result.coord.lat,
                                    },
                                    errorMessage: "",
                                    infoLoaded: true }
                                    );
                                }
                                else current.setState({errorMessage: "Невозможно получить данные о погоде"});
                            },
                        );
                },
                function (err) {
                    if (err.code === 1) {
                    let link = current.props.API_URL
                               + "q=saint%20petersburg"
                               + "&units=metric"
                               + "&appid=" + current.props.API_KEY;

                    current.setState({message: "Идет загрузка данных"})
                    fetch(link)
                                        .then(async res => {
                                              if (res.ok) {
                                                return await res.json();
                                              } else return {cod: "404"}
                                              })
                                                    .then((result) => {
                                                        if (result.cod == "200") {
                                                    current.setState({
                                                        forecast: {
                                                            city: result.name,
                                                            temp: result.main.temp,
                                                            humidity: result.main.humidity,
                                                            windSpeed: result.wind.speed,
                                                            windDirection: windToTextualDescription(result.wind.deg),
                                                            pressure: result.main.pressure,
                                                            clouds: result.weather[0].description,
                                                            icon: result.weather[0].icon,
                                                            lon: result.coord.lon,
                                                            lat: result.coord.lat,
                                                        },
                                                        errorMessage: "",
                                                        infoLoaded: true }
                                                        );
                                                    }
                                                    else current.setState({errorMessage: "Невозможно получить данные о погоде"});
                                                },
                                            );
                        current.setState({errorMessage: "Досуп запрещен", infoLoaded: false});
                    } else if (err.code === 2) {
                        current.setState({errorMessage: "Невозможно определить геолокацию", infoLoaded: false});
                    }
                });
        }
    }

    componentDidMount() {
        this.refreshGeoPosition();
    }

    render() {
        return (
            `<div className="container">
                <div className="row">
                    <div className="col-5">
                        <h3>Погода здесь</h3>
                    </div>
                    <div className="col">
                        <button onClick={this.refreshGeoPosition}>Обновить геолокацию</button>
                        <div className="error">{this.state.errorMessage}</div>
                    </div>
                </div>
                { this.state.infoLoaded ? (
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
                )
                : (
                   <div>
                       <h1>{this.state.message}</h1>
                   </div>
                )}

                <hr/>
            </div>`
        )
    }
}

const mapStateToProps = (state) => ({
    API_KEY: state.API_KEY,
    API_URL: state.API_URL
});

export default connect(mapStateToProps)(WeatherFull);
