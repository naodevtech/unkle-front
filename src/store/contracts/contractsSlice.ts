import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../rootReducer";

export interface IContract {
  id?: string;
  reference: string;
  icon: string;
  name: string;
  description?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IContractState {
  contracts?: IContract[];
  isLoading: boolean;
  error: string;
}

export const initialState: IContractState = {
  isLoading: false,
  error: "",
};

export const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = true;
    },
    setContractsSuccess: (state, { payload }: PayloadAction<IContract[]>) => {
      state.contracts = payload;
      state.isLoading = false;
    },
    setContractsFailed: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export const {
  setContractsSuccess,
  setContractsFailed,
  setLoading,
} = contractsSlice.actions;

export const contractsSelector = (state: RootState) => state.contracts;

export default contractsSlice.reducer;