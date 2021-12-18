import { AnyAction, AsyncThunkAction } from "@reduxjs/toolkit";
import store from "@store/index";

export const serviceDispatch: (action: AnyAction | AsyncThunkAction<any, any, any>) => void = (
  action
) => store.dispatch(action);
