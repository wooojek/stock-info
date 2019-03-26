export const addStock = (stock) => ({
  type: 'ADD_STOCK',
  stock,
});

export const setStocks = (stocks) => ({
  type: 'SET_STOCKS',
  stocks,
});

export const startSetStocks = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      const stocks = JSON.parse(localStorage.getItem('stocks')) || [];
      dispatch(setStocks(stocks));
      resolve();
    });
  };
}