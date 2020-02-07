import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store"
import {configure, shallow} from "enzyme";
import WeatherInfo from './WeatherInfo';

configure({ adapter: new Adapter() });

describe('WeatherInfo', () => {
    it('renders correctly', () => {
        const mockStore = configureMockStore();
        const store = mockStore({
            windSpeed: 0.47,
            windDirection: "north",
            clouds: "broken clouds",
            pressure: 1016,
            humidity: 93,
            lat: 35,
            lon: 139
        });
        const wrapper = shallow(<WeatherInfo store={store}/>);
        expect(wrapper.firstChild).toMatchSnapshot();
    })
});