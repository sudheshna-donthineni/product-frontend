export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_STUDENT":
      return Object.assign({}, state, action.payload);
    case "FILTER_CHANGE":
      return {
        ...state,
        filters: [...state.filters, action.payload],
      };
    default:
      return state;
  }
}
