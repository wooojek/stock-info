import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

export const Header = ({ logout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/">
          <h1>Stock Info</h1>
        </Link>
        <Link className="header__element--link" to="/add">
          <h3>Add new company</h3>
        </Link>
        <button className="button button--link header__logout" onClick={logout}>Logout</button>
      </div>

    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(undefined, mapDispatchToProps)(Header);