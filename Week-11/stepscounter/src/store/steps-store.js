import { createStore } from "redux";

function stepsReducer(state = { count: 0 }, action) {
  if (action.type === "INCREMENT") {
    return { count: state.count + 1 };
  }
  if (action.type === "RESET") {
    return { count: 0 };
  }
  return state;
}

const store = createStore(stepsReducer);

export { store };
