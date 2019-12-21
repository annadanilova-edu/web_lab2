import React, {lazy, Suspense} from 'react';
import {connect} from "react-redux";
import {addCity, setError} from "../redux/actions/index";

import {windToTextualDescription} from '../utils'

const WeatherShort = lazy(() => import('./WeatherShort'), 'default');

class Favorites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: '',
            listFavorites: [],
        };

        this.getWeather = this.getWeather.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    updateInputValue(e) {
        this.setState({current: e.target.value});
    };

    getWeather(e) {
        e.preventDefault();

        let link = this.props.API_URL
            + "q="
            + this.state.current
            + "&units=metric"
            + "&appid=" + this.props.API_KEY;

        let current = this;

        fetch(link)
            .then(async res => {
                if (res.ok) {
                    return await res.json();
                } else return {cod: "404"}
            })
            .then((result) => {
                if (result.cod == "200") {
                    if (this.props.favorites.find(item => item.city === result.name))
                        this.props.setError('Такой город уже есть в списке!');
                    else {
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
                            }
                        });
                        const city = current.state.forecast;
                        this.props.addCity(city);
                        current.setState({current: ''});
                        let msg = "";
                        this.props.setError(msg);
                    }
                } else this.props.setError('Ошибка!');
            });
    }

    render() {
        this.state.listFavorites = this.props.favorites.map((city, i) =>
            <div className="col-6" key={i}>
                <Suspense fallback={<div>Loading...</div>}>
                    <WeatherShort city={city}/>
                </Suspense>
            </div>);
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Избранное</h3>
                    </div>
                    <div className="error">{this.props.errorMessage}</div>
                    <form onSubmit={this.getWeather} className="col" style={{textAlign: 'end'}}>
                        <input type={'text'} placeholder="Добавить новый город" value={this.state.current}
                               onChange={e => this.updateInputValue(e)} style={{padding: '3px'}}/>
                        <input type={'submit'} className="roundButton" value={'+'}/>
                    </form>
                </div>
                <div className="row">
                    {this.state.listFavorites}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errorMessage: state.errorMessage,
    favorites: state.favorites,
    API_KEY: state.API_KEY,
    API_URL: state.API_URL
});

const mapDispatchToProps = (dispatch) => ({
    addCity: city => dispatch(addCity(city)),
    setError: message => dispatch(setError(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);