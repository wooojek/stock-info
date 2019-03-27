import React from 'react';
import { shallow } from 'enzyme';
import Stock from '../../components/Stock';
import stocks from '../fixtures/stocks';

test('should render Stock correctly', () => {
  const wrapper = shallow(<Stock />);
  expect(wrapper).toMatchSnapshot();
});

test('should render Stock correctly with data', () => {
  const wrapper = shallow(<Stock {...stocks[0]} />);
  expect(wrapper).toMatchSnapshot();
});