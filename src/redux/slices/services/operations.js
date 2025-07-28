import { api } from 'api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrders = createAsyncThunk(
  'services/getOrders',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/users/register', credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
