import { history } from '../routers/AppRouter';

export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      setTimeout(function () { // auth spoof
        history.push('/dashboard');
      }, 1000);
      return {
        uid: action.uid,
      };
    case 'LOGOUT':
      setTimeout(function () { // auth spoof
        history.push('/');
      }, 1000);
      return {};
    default:
      return state;
  }
};