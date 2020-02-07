import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store"
import {configure, shallow} from "enzyme";
import Favorites from './Favorites';

configure({ adapter: new Adapter() });

describe('Favorites', () => {
    it('renders correctly', () => {
        const mockStore = configureMockStore();
        const store = mockStore({cities: []});
        const wrapper = shallow(<Favorites store={store}/>).dive();
        expect(wrapper.firstChild).toMatchSnapshot();
    })
});