import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import store from "./store";

const rootReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
