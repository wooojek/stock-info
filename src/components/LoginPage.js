import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import { startLogin } from '../actions/auth';

const uid = uuid();

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Stock info</h1>
      <p>Be up to date with your stocks!</p>
      <button className="button" onClick={startLogin}>Login</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin(uid)),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);