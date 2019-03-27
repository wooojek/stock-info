export const login = (uid) => ({
  type: 'LOGIN',
  uid,
});

export const startLogin = (uid) => {
  return (dispatch) => {
    return new Promise((resolve) => {
      localStorage.setItem('uid', uid);
      dispatch(login(uid));
      resolve();
    });
  };
}

export const logout = () => ({
  type: 'LOGOUT',
});

export const startLogout = () => {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(logout());
      resolve();
    });
  };
}