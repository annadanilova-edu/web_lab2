import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';

const WeatherFull = lazy(() => import('./WeatherFull'));
const Favorites = lazy(() => import('./Favorites'));

class App extends React.Component {

    render() {
        return (
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <WeatherFull/>
                    <Favorites />
                </Suspense>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);