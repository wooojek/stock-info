import React from 'react';
import { shallow } from 'enzyme';
import { AddStockPage } from '../../components/AddStockPage';
import stocks from '../fixtures/stocks';

let startAddStock, history, wrapper;

beforeEach(() => {
  startAddStock = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddStockPage startAddStock={startAddStock} history={history} />);
});

test('should render AddStockPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('StockForm').prop('onSubmit')(stocks[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startAddStock).toHaveBeenLastCalledWith(stocks[1]);
});