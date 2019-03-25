export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_STOCK':
      return {
        stock: action.stock,
        ...state,
      };
    default:
      return state;
  }
};