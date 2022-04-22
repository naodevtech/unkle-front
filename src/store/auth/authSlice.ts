import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../rootReducer";

export interface AuthState {
  isAuth: boolean;
  isAdmin: boolean;
  currentUser?: CurrentUser;
  isLoading: boolean;
  error: string;
}

export interface CurrentUser {
  id: string;
  role: string;
  avatar: string;
  lastname: string;
  firstname: string;
  email: string;
  token: string;
}

export const initialState: AuthState = {
  isAuth: false,
  isAdmin: false,
  isLoading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = false;
    },
    setAuthSuccess: (state, { payload }: PayloadAction<CurrentUser>) => {
      state.currentUser = payload;
      state.isAuth = true;
      if (payload.role === "admin") {
        state.isAdmin = true;
      }
    },
    setLogOut: (state) => {
      state.isAuth = false;
      state.currentUser = undefined;
    },
    setAuthFailed: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isAuth = false;
    },
  },
});

export const {
  setAuthSuccess,
  setLogOut,
  setLoading,
  setAuthFailed,
} = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
