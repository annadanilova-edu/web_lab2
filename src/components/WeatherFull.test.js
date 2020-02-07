import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store"
import {configure, shallow} from "enzyme";
import WeatherFull from './WeatherFull';

configure({ adapter: new Adapter() });

describe('WeatherFull', () => {
    it('renders correctly', () => {
        const mockStore = configureMockStore();
        const store = mockStore({cities: []});
        const wrapper = shallow(<WeatherFull store={store}/>).dive();
        expect(wrapper.firstChild).toMatchSnapshot();
    })
});