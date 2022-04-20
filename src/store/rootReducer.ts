import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import contracts from "./contracts/contractsSlice";

import store from "./store";

const rootReducer = combineReducers({
  auth,
  contracts,
});

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
