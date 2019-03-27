import React from 'react';
import { connect } from 'react-redux';
import StockForm from './StockForm';
import { startAddStock } from '../actions/stocks';

export class AddStockPage extends React.Component {
  onSubmit = (stock) => {
    this.props.startAddStock(stock);
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h2 className="page-header__title">Add Stock</h2>
          </div>
        </div>
        <div className="content-container">
          <StockForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  startAddStock: (stock) => dispatch(startAddStock(stock)),
});

export default connect(undefined, mapDispatchToProps)(AddStockPage);