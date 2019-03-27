import React from "react";
import { shallow } from "enzyme";
import { StockList } from '../../components/StockList';
import stocks from '../fixtures/stocks';

test('should render StockList with stocks', () => {
    const wrapper = shallow(<StockList stocks={stocks} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render StockList with empty message', () => {
    const wrapper = shallow(<StockList stocks={[]} />);
    expect(wrapper).toMatchSnapshot();
});