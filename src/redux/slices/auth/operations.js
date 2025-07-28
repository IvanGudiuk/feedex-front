import { api, setAuthHeader } from 'api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/users/register', credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { email = '', password = '' } = credentials;

      const { data } = await api.post('/users/login', { email, password });
      if (data.token) {
        setAuthHeader(data.token);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const verify = createAsyncThunk(
  'auth/verify',
  async (credentials, thunkAPI) => {
    try {
      const { token } = credentials;
      const { data } = await api.get(`/users/verify/${token}`);
      if (data?.token) {
        setAuthHeader(data.token);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const resendVerify = createAsyncThunk(
  'auth/resendVerify',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/users/verify/resend/', credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (credentials, thunkAPI) => {
    try {
      await api.post('/users/logout', credentials);
      setAuthHeader();
      localStorage.clear();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const restorePassword = createAsyncThunk(
  'auth/restorePassword',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post(`/users/restore`, credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post(`/users/password/reset`, credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const checkRestoreKey = createAsyncThunk(
  'auth/checkRestoreKey',
  async (credentials, thunkAPI) => {
    try {
      const { restoreKey } = credentials;
      const { data } = await api.get(`/users/restore/${restoreKey}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
