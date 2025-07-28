import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, verify, resendVerify } from './operations';

const initialState = {
  email: '',
  isLoggedIn: false,
  isLoading: false,
  message: '',
  status: '',
  refLink: '',
  crypto: {},
  token: null,
  balance: 0,
  error: false,
  isModalShown: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setIsModalShown: (state, action) => {
      state.isModalShown = action.payload;
    },
    setModalType: (state, action) => {
      state.modalType = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lang = action.payload.lang;
        state.email = action.payload.email;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.status = 'error';
        if (action.payload.status === 503) {
          state.maintence = true;
        }
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state._id = action.payload._id;
        state.token = action.payload.token;
        state.balance = action.payload.balance;
        state.topups = action.payload.topups;
        state.ban = action.payload.ban;
        state.apiKey = action.payload.apiKey;
        state.lang = action.payload.lang;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.status = 'error';
        if (action.payload.status === 503) {
          state.maintence = true;
        }
      })
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.token = '';
        state.balance = null;
        state.apiKey = '';
        state.lang = '';
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.status = 'error';
        if (action.payload.status === 503) {
          state.maintence = true;
        }
      })
      .addCase(verify.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isLoading = false;
        state._id = action.payload._id;
        state.token = action.payload.token;
        state.balance = action.payload.balance;
        state.apiKey = action.payload.apiKey;
        state.lang = action.payload.lang;
      })
      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.status = 'error';
        if (action.payload.status === 503) {
          state.maintence = true;
        }
      })
      .addCase(resendVerify.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(resendVerify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = 'success';
      })
      .addCase(resendVerify.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.status = 'error';
        if (action.payload.status === 503) {
          state.maintence = true;
        }
      })
      .addCase(restorePassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(restorePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = 'success';
      })
      .addCase(restorePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.status = 'error';
        if (action.payload.status === 503) {
          state.maintence = true;
        }
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.status = 'success';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.status = 'error';
        if (action.payload.status === 503) {
          state.maintence = true;
        }
      })
      .addCase(checkRestoreKey.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkRestoreKey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
        state.message = action.payload.message;
        state.status = 'success';
      })
      .addCase(checkRestoreKey.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.status = 'error';
        if (action.payload.status === 503) {
          state.maintence = true;
        }
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
} = authSlice.actions;

export const authReducer = authSlice.reducer;
