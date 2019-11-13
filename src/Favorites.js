import React, {lazy, Suspense} from 'react';

const WeatherShort = lazy(() => import('./WeatherShort'), 'default');

export default class Favorites extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Избранное</h3>
                    </div>
                    <div className="col" style={{textAlign: 'end'}}>
                        <input placeholder="Добавить новый город" style={{padding: '3px'}} />
                        <button className="roundButton"><img src="https://img.icons8.com/android/16/000000/plus.png"/></button>
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