import React from 'react';

export const SuggestionsList = ({ suggestions, onSelect }) => {

  const onClick = (sugestion) => {
    onSelect({
      symbol: sugestion['1. symbol'],
      name: sugestion['2. name'],
    });
  }

  return (
    <div className="suggestions-container">
      <ul className='list-body suggestions-cover'>
        {suggestions.map((sugestion, index) => (
          <li
            key={index}
            className='list-item'
            onClick={() => onClick(sugestion)}
          >
            {sugestion['1. symbol']} - {sugestion['2. name']}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;