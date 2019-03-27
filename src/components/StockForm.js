import React from 'react';
import SuggestionsList from './SuggestionsList';

const { ALPHAVANTAGE_API_KEY } = process.env;

export default class StockForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.stock ? props.stock.name : '',
      symbol: props.stock ? props.stock.symbol : '',
      suggestions: [],
      error: '',
    }
  }

  onNameChange = (e) => {
    const name = e.target.value.toUpperCase();
    this.setState(() => ({ name }), () => {
      if (this.state.name && this.state.name.length > 1) {
        if (this.state.name.length % 2 === 0) {
          this.getSuggestions();
        }
      }
    });
  }

  onNameSelect = ({ name, symbol }) => {
    const suggestions = [];
    this.setState(() => ({ name, suggestions, symbol }));
  }

  getSuggestions = () => {
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.name}&apikey=${ALPHAVANTAGE_API_KEY}`)
      .then((response) => response.json())
      .then(({ bestMatches }) => {
        this.setState(() => ({
          suggestions: bestMatches.slice(0, 4),
        }));
      });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.name) {
      this.setState(() => ({ errorState: 'Please provide name.' }));
    } else {
      this.setState(() => ({ errorState: '' }));
      this.props.onSubmit({
        name: this.state.name,
        symbol: this.state.symbol,
      });
    }
  }

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.errorState && (<p className="form__error">{this.state.errorState}</p>)}
        <input
          type="text"
          className="text-input"
          placeholder="Company symbol"
          autoFocus
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <SuggestionsList suggestions={this.state.suggestions} onSelect={this.onNameSelect} />
        <div>
          <button className="button">Track</button>
        </div>
      </form>
    )
  }
};