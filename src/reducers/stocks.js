const defaultStockState = [
  {
    name: 'Apple',
  },
  {
    name: 'Google',
  },
];

export default (state = defaultStockState, action) => {
  switch (action.type) {
    case 'ADD_STOCK':
      return [
        action.stock,
        ...state,
      ];
    default:
      return state;
  }
};