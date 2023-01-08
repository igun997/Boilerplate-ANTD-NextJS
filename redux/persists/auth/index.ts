import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AUTH } from '../../../constants/slicer.constant';

export interface StateInterface {
  token?: string | null;
  userData?: {
    company: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    status: number;
    packages_id: number | null;
    package: {
      id: number;
      inbound: number;
      outbound: number;
      inbound_rate: number;
      outbound_rate: number;
      is_marketing_messages: number;
    } | null;
  } | null;
}

const initialState: StateInterface = {
  token: null,
  userData: null,
};
export const indexSlice = createSlice({
  name: AUTH,
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    addUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    clearLoggedUser: (state) => {
      state.token = null;
      state.userData = null;
    },
  },
});

export const { addUserData, addToken, clearLoggedUser } = indexSlice.actions;
export default indexSlice.reducer;
