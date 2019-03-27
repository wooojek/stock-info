import stocksReducer from '../../reducers/stocks';
import stocks from '../fixtures/stocks';

test('should set default state', () => {
  const state = stocksReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should add an stock', () => {
  const newStock = {
    name: 'NEW',
  };

  const action = {
    type: 'ADD_STOCK',
    stock: newStock,
  }
  const state = stocksReducer(stocks, action);
  expect(state).toEqual([newStock, ...stocks]);
});

test('should set stocks', () => {
  const action = {
    type: 'SET_STOCKS',
    stocks: [stocks[1]],
  };
  const state = stocksReducer(stocks, action);
  expect(state).toEqual([stocks[1]]);
});
