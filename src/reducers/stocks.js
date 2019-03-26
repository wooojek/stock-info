const defaultStockState = [];

export default (state = defaultStockState, action) => {
  switch (action.type) {
    case 'ADD_STOCK':
      return [
        action.stock,
        ...state,
      ];
    case 'SET_STOCKS':
      return action.stocks;
    default:
      return state;
  }
};