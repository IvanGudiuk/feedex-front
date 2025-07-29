import { createSlice } from '@reduxjs/toolkit';
import { getOrders } from './operations';

const initialState = {
  isLoading: false,
  message: '',
  status: '',
  orders: [],
  order: {},
  account: {},
  accounts: [],
};

const serviceSlice = createSlice({
  name: 'services',
  initialState: initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setIsModalShown: (state, action) => {
      state.isModalShown = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getOrders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.status = 'error';
      });
  },
});

export const {
  setIsLoggedIn,
  setMessage,
  setStatus,
  setEmail,
  setAuthError,
  setIsModalShown,
  setModalType,
  setBalance,
} = serviceSlice.actions;

export const serviceReducer = serviceSlice.reducer;
