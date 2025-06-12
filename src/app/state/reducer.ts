import { initialState } from "./initialState";

export default function reducer(state: typeof initialState, action: any) {
  switch (action.type) {
    case "UPDATE_WEATHER":
      return {
        ...state,
        weather: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
