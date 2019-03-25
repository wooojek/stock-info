import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import { login } from '../actions/auth';

const uid = uuid();

export const LoginPage = ({ login }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Stock info</h1>
      <p>Be up to date with your stocks!</p>
      <button className="button" onClick={login}>Login</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login(uid)),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);