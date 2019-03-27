import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addStock,
  startAddStock,
  setStocks,
  startSetStocks,
} from '../../actions/stocks';
import stocks from '../fixtures/stocks';

const uid = 'testuid';
const defaultState = { auth: { uid }, stocks: [] };
const createMockStore = configureMockStore([thunk]);

const mockStorage = { auth: { uid }, stocks: JSON.stringify(stocks) };

beforeEach(() => {
  const localStorageMock = {
    getItem: jest.fn(key => mockStorage[key]),
    setItem: jest.fn(),
  };
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true
  });
});

test('should setup action stock action object', () => {
  const action = addStock(stocks[1]);
  expect(action).toEqual({
    type: 'ADD_STOCK',
    stock: stocks[1],
  });
});

test('should add stocks to database and store', (done) => {
  const store = createMockStore(defaultState);
  const stockData = {
    name: 'MOUSE',
  };

  store.dispatch(startAddStock(stockData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_STOCK',
      stock: {
        ...stockData,
      },
    });

    expect(localStorage.setItem).toBeCalledWith('stocks', expect.any(String));
    done();
  });
});

test('should setup set stocks action object with data', () => {
  const action = setStocks(stocks);
  expect(action).toEqual({
    type: 'SET_STOCKS',
    stocks,
  });
});

test('should fetch the stocks from database', (done) => {
  const store = createMockStore(defaultState);

  store.dispatch(startSetStocks()).then(() => {
    expect(localStorage.getItem).toBeCalledWith('stocks');
    done();
  });
});