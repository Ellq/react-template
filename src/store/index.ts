import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as Reducers from "./reducers";

const store = configureStore({
  reducer: combineReducers({ ...Reducers }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
