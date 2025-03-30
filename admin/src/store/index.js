import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('adminToken'),
    user: null,
    error: null,
    loading: false
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('adminToken');
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    }
  }
});

const watchesSlice = createSlice({
  name: 'watches',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    setWatches: (state, { payload }) => {
      state.items = payload;
    },
    addWatch: (state, { payload }) => {
      state.items.push(payload);
    },
    updateWatch: (state, { payload }) => {
      const index = state.items.findIndex(w => w.id === payload.id);
      if (index !== -1) {
        state.items[index] = payload;
      }
    },
    deleteWatch: (state, { payload }) => {
      state.items = state.items.filter(w => w.id !== payload);
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    }
  }
});

export const { setCredentials, logout, setError: setAuthError, setLoading: setAuthLoading } = authSlice.actions;
export const {
  setWatches,
  addWatch,
  updateWatch,
  deleteWatch,
  setLoading: setWatchesLoading,
  setError: setWatchesError
} = watchesSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    watches: watchesSlice.reducer
  }
});