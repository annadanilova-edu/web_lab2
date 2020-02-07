import React, {lazy} from 'react';
import {configure, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from "enzyme";
import WeatherFull from './WeatherFull';

configure({ adapter: new Adapter() });

describe('WeatherFull', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<WeatherFull/>);
        expect(wrapper.firstChild).toMatchSnapshot();
    })

});