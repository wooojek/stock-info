import React from 'react';

export default class StockForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.stock ? props.stock.name : '',
      error: '',
    }
  }

  onNameChange = (e) => {
    const name = e.target.value.toUpperCase();
    this.setState(() => ({ name }))
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.name) {
      this.setState(() => ({ errorState: 'Please provide name.' }));
    } else {
      this.setState(() => ({ errorState: '' }));
      this.props.onSubmit({
        name: this.state.name,
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
        <div>
          <button className="button">Track</button>
        </div>
      </form>
    )
  }
};