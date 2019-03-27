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

  onNameSelect = ({ name, symbol, ...market }) => {
    const suggestions = [];
    this.setState(() => ({ name, suggestions, symbol, market }));
  }

  getSuggestions = () => {
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.name}&apikey=${ALPHAVANTAGE_API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data['Note']) {
          throw Error(data['Note']);
        }
        const { bestMatches } = data;
        
        this.setState(() => ({
          suggestions: bestMatches.slice(0, 4),
        }));
      })
      .catch((e) => console.log(e));
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
        market: this.state.market,
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