import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./redux/store";

const WeatherFull = lazy(() => import('./components/WeatherFull'));
const Favorites = lazy(() => import('./components/Favorites'));

class App extends React.Component {

    render() {
        console.log(store.getState());
        return (
            <Provider store={store}>
                <Suspense fallback={<div>Loading...</div>}>
                    <WeatherFull/>
                    <Favorites />
                </Suspense>
            </Provider>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);