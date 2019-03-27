import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import stockReducer from '../reducers/stocks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducer = combineReducers({
  auth: authReducer,
  stocks: stockReducer,
});

const rootReducer = (state, action) => { // quick solution for clearing state after logout
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
}

export default () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
}
