const appReducers = (state = { data: null }, action) => {
  switch (action.type) {
    case actionType.GET_DATA:
      return state;
    default:
      return state;
  }
};

export default appReducers;
