import React, {lazy, Suspense} from 'react';
import {connect} from "react-redux";
import {removeCity} from "../redux/actions";

import store from "../redux/store";

const WeatherInfo = lazy(() => import('./WeatherInfo'), 'default');

class WeatherShort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.removeCityFromFavs = this.removeCityFromFavs.bind(this);
    }

    removeCityFromFavs(e){
        e.preventDefault();
        this.props.removeCity(this.props.city.city);
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-8" style={{marginTop: '8px', marginBottom: '8px'}}>
                        <h2>{this.props.city.city} {this.props.city.temp} °C</h2>
                    </div>
                    <div className="col" >
                        <img alt="Icon" style={{width: '50px'}} src={"http://openweathermap.org/img/wn/" + this.props.city.icon + "@2x.png"}/>
                    </div>
                    <div className="col-2" style={{textAlign: 'end', marginTop: '8px' }}>
                        <button className="roundButton" onClick={ this.removeCityFromFavs }>×</button>
                    </div>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <WeatherInfo
                        windSpeed={this.props.city.windSpeed}
                        windDirection={this.props.city.windDirection}
                        clouds={this.props.city.clouds}
                        pressure={this.props.city.pressure}
                        humidity={this.props.city.humidity}
                        lat={this.props.city.lat}
                        lon={this.props.city.lon}
                    />
                </Suspense>
            </div>
        )
    }
}

const WeatherShortConnect = connect(
    null,
    mapDispatchToProps
)(WeatherShort);
export default WeatherShortConnect;

function mapDispatchToProps(dispatch) {
    return {
        removeCity: cityName => dispatch(removeCity(cityName))
    };
}