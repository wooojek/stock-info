import React from 'react';

export const SuggestionsList = ({ suggestions, onSelect }) => {

  const onClick = (suggestion) => {
    onSelect({
      symbol: suggestion['1. symbol'],
      name: suggestion['2. name'],
      region: suggestion['4. region'],
      marketOpen: suggestion['5. marketOpen'],
      marketClose: suggestion['6. marketClose'],
      timezone: suggestion['7. timezone'],
    });
  }

  return (
    <div className="suggestions-container">
      <ul className='list-body suggestions-cover'>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className='list-item'
            onClick={() => onClick(suggestion)}
          >
            {suggestion['1. symbol']} - {suggestion['2. name']}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;