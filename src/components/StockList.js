import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const StockList = ({ stocks }) => (
  <Fragment>
    <h2>Companies</h2>
    <div className="content-container">
      {stocks.length > 0 ?
        (
          <ul className="list-body">
            {stocks.map((stock, index) => <li className="list-item" key={index}>{stock.name}</li>)}
          </ul>
        ) : (
          <div>
            <span>There are no companies yet.</span>
            <Link to="/add">
              <p>Track your first company.</p>
            </Link>
          </div>
        )
      }
    </div>
  </Fragment>
);

const mapStateToProps = (state) => ({
  stocks: state.stocks,
});

export default connect(mapStateToProps)(StockList);