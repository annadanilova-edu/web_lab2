import React, {lazy, Suspense} from 'react';

const WeatherShort = lazy(() => import('./WeatherShort'), 'default');

const API_KEY = "bf17aa753eec52f73cdb8d53e0609031";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?";

export default class Favorites extends React.Component {
    getWeather(){
        let link = API_URL
            + "q="
            +
            + "&units=metric"
            + "&appid=" + API_KEY;

        fetch(link)
            .then(res => res.json())
            .then((result) => {
                    console.log(result);
                    this.setState({
                        forecast: {
                            city: result.name,
                            temp: result.main.temp,
                            humidity: result.main.humidity,
                            windSpeed: result.wind.speed,
                            windDirection: this.windToTextualDescription(result.wind.deg),
                            pressure: result.main.pressure,
                            clouds: result.weather[0].description,
                            icon: result.weather[0].icon,
                            lon: result.coord.lon,
                            lat: result.coord.lat,
                        }
                    });
                    console.log(this.state.forecast);
                },
                (error) => {
                    this.setState({error: error});
                }
            );
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Избранное</h3>
                    </div>
                    <div className="col" style={{textAlign: 'end'}}>
                        <input placeholder="Добавить новый город" style={{padding: '3px'}} />
                        <button className="roundButton" onClick={this.getWeather}>
                            <img src="https://img.icons8.com/android/16/000000/plus.png"/>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Suspense fallback={<div>Loading...</div>}>
                            <WeatherShort/>
                        </Suspense>
                    </div>
                    <div className="col">
                        <Suspense fallback={<div>Loading...</div>}>
                            <WeatherShort/>
                        </Suspense>
                    </div>
                </div>
            </div>
        )
    }
}