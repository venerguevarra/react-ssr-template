const reducer = (state = [], action) => {
    switch(action.type) {
      case 'ADD':
        return state.concat([action.data]);
      default:
        return state;
    }
  }
  export default reducer;