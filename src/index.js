import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';

import store from "./redux/store";

const WeatherFull = lazy(() => import('./components/WeatherFull'));
const Favorites = lazy(() => import('./components/Favorites'));

class App extends React.Component {

    render() {
        console.log(store.getState());
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