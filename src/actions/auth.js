export const login = (uid) => ({
  type: 'LOGIN',
  uid,
});

export const startLogin = (uid) => {
  return (dispatch) => {
    return new Promise((resolve) => {
      localStorage.setItem('uid', uid);
      logout();
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
      localStorage.removeItem('uid');
      logout();
      dispatch(logout());
      resolve();
    });
  };
}