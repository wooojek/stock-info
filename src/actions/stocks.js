export const addStock = (stock) => ({
  type: 'ADD_STOCK',
  stock,
});

export const startAddStock = (stock) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => { // spoof async
      const stocks = [...getState().stocks];
      stocks.push(stock);
      localStorage.setItem('stocks', JSON.stringify(stocks));
      dispatch(addStock(stock));
      resolve();
    })
  }
};

export const setStocks = (stocks) => ({
  type: 'SET_STOCKS',
  stocks,
});

export const startSetStocks = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => { // spoof async
      const stocks = JSON.parse(localStorage.getItem('stocks')) || [];
      dispatch(setStocks(stocks));
      resolve();
    });
  };
}