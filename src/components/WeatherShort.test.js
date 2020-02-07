import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store"
import {configure, shallow} from "enzyme";
import WeatherShort from './WeatherShort';

configure({ adapter: new Adapter() });

describe('WeatherShort', () => {
    it('renders correctly', () => {
        const mockStore = configureMockStore();
        const store = mockStore({
            city: {
                city: "Shuzenji",
                temp: 28,
                icon: "01d",
                windSpeed: 0.47,
                windDirection: "north",
                clouds: "broken clouds",
                pressure: 1016,
                humidity: 93,
                lat: 35,
                lon: 139
            }
        });
        const wrapper = shallow(<WeatherShort store={store}/>);
        expect(wrapper.firstChild).toMatchSnapshot();
    })
});