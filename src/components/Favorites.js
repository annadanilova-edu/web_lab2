import React, {lazy, Suspense} from 'react';
import {connect} from "react-redux";
import {addCity, addCityWeather, getFavoriteWeather} from "../redux/actions/index";

import {windToTextualDescription} from '../utils'

const WeatherShort = lazy(() => import('./WeatherShort'), 'default');

class Favorites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            forecast: '',
            current: '',
            errorMessage: "",
            listFavorites: [],
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    };

    componentDidMount() {
        this.props.getFavoriteWeather();

        setTimeout(() => this.setState({errorMessage: ""}), 300)
    };

    updateInputValue(e) {
        this.setState({current: e.target.value});
        if (!e.target.value) {
            this.setState({errorMessage: ""});
        }
    };

    onSubmit(e) {
        e.preventDefault();
        this.getWeather(this.state.current);
    };

    getWeather(cityName) {

        let link = this.props.API_URL
            + "q="
            + cityName
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
                    if (current.props.favorites.find(item => item === result.name))
                        current.setState({errorMessage: "Такой город уже есть в списке!"});
                    else {
                        let city;
                        city = {
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
                        current.props.addCity(city.city);
                        current.props.addCityWeather(city);
                        current.setState({
                            current: '',
                            errorMessage: "",
                        });
                        return city;
                    }
                } else {
                    current.setState({errorMessage: "Ошибка!"});
                }
            })
        ;
    }

    render() {
        this.state.listFavorites = this.props.favoritesForecast.map((city, i) =>
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
                    <div className="error">{this.state.errorMessage}</div>
                    <form onSubmit={this.onSubmit} className="col" style={{textAlign: 'end'}}>
                        <input type={'text'} id={'input'} placeholder="Добавить новый город" value={this.state.current}
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
    favoritesForecast: state.favoritesForecast,
    favorites: state.favorites,
    API_KEY: state.API_KEY,
    API_URL: state.API_URL
});

const mapDispatchToProps = (dispatch) => ({
    addCity: city => dispatch(addCity(city)),
    addCityWeather: city => dispatch(addCityWeather(city)),
    getFavoriteWeather: () => dispatch(getFavoriteWeather())
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);