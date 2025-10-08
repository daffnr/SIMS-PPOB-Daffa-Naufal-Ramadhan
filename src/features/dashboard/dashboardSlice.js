import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile, getBalance, getServices, getBanners } from '../../services/api';

// Async thunks untuk dashboard data
export const fetchProfileAsync = createAsyncThunk(
  'dashboard/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.user?.token || localStorage.getItem('token');
      
      if (!token || !state.auth.isLoggedIn) {
        throw new Error('No authentication token found or user not logged in');
      }
      
      const response = await getProfile(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch profile');
    }
  }
);

export const fetchBalanceAsync = createAsyncThunk(
  'dashboard/fetchBalance',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.user?.token || localStorage.getItem('token');
      
      if (!token || !state.auth.isLoggedIn) {
        throw new Error('No authentication token found or user not logged in');
      }
      
      const response = await getBalance(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch balance');
    }
  }
);

export const fetchServicesAsync = createAsyncThunk(
  'dashboard/fetchServices',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.user?.token || localStorage.getItem('token');
      
      if (!token || !state.auth.isLoggedIn) {
        throw new Error('No authentication token found or user not logged in');
      }
      
      const response = await getServices(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch services');
    }
  }
);

export const fetchBannersAsync = createAsyncThunk(
  'dashboard/fetchBanners',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.user?.token || localStorage.getItem('token');
      
      if (!token || !state.auth.isLoggedIn) {
        throw new Error('No authentication token found or user not logged in');
      }
      
      const response = await getBanners(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch banners');
    }
  }
);

const initialState = {
  profile: null,
  balance: null,
  services: [],
  banners: [],
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.profile = null;
      state.balance = null;
      state.services = [];
      state.banners = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Profile cases
      .addCase(fetchProfileAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfileAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchProfileAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Balance cases
      .addCase(fetchBalanceAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBalanceAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload;
        state.error = null;
      })
      .addCase(fetchBalanceAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Services cases
      .addCase(fetchServicesAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServicesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload.data || [];
        state.error = null;
      })
      .addCase(fetchServicesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Banners cases
      .addCase(fetchBannersAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBannersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.banners = action.payload.data || [];
        state.error = null;
      })
      .addCase(fetchBannersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, logout } = dashboardSlice.actions;
export default dashboardSlice.reducer;
