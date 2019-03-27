import React from 'react';
import { shallow } from 'enzyme';
import StockForm from '../../components/StockForm';
import stocks from '../fixtures/stocks';

test('should render StockForm correctly', () => {
    const wrapper = shallow(<StockForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render StockForm correctly with data', () => {
    const wrapper = shallow(<StockForm stock={stocks[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<StockForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { },
    });
    expect(wrapper.state('errorState').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set name on input change', () => {
    let value = 'New Name';
    const wrapper = shallow(<StockForm />);

    value = value.toUpperCase();
    wrapper.find('input').at(0).simulate('change', {
        target: {
            value
        }
    });
    expect(wrapper.state('name')).toBe(value);
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<StockForm stock={stocks[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { },
    });
    expect(wrapper.state('errorState')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        name: stocks[0].name,
    });
});