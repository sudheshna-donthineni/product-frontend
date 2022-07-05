import { createStore } from "redux";
import rootReducer from "./reducers.js";

// initial states here
const initalState = {
  filters: [],
};

// creating store
export const store = createStore(rootReducer, initalState);
