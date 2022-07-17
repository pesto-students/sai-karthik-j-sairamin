import { createStore } from "redux";

function lightReducer(state = { isLightOn: true }, action) {
  if (action.type === "TOGGLE_LIGHT") {
    return { isLightOn: !state.isLightOn };
  }
  return state;
}

export const store = createStore(lightReducer);


