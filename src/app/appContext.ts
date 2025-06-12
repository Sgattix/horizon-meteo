import React from "react";
import { initialState } from "./state/initialState";

export const appContext = React.createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});
