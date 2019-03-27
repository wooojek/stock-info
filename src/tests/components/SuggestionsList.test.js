import React from 'react';
import { shallow } from 'enzyme';
import { SuggestionsList } from '../../components/SuggestionsList';
import suggestions from '../fixtures/suggestions';

test('should render SuggestionsList correctly', () => {
  const wrapper = shallow(<SuggestionsList suggestions={suggestions} onSelect={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call onSelect on button click', () => {
  const onSelect = jest.fn();
  const wrapper = shallow(<SuggestionsList suggestions={suggestions} onSelect={onSelect} />);
  wrapper.find('li').at(0).simulate('click');
  expect(onSelect).toHaveBeenCalled();
});