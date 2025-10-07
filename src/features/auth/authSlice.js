import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, updateProfile, updateProfileImage } from '../../services/api';

// Async thunk untuk register
export const registerUserAsync = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// Async thunk untuk login
export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async thunk untuk update profile
export const updateProfileAsync = createAsyncThunk(
  'auth/updateProfile',
  async ({ token, profileData }, { rejectWithValue }) => {
    try {
      const response = await updateProfile(token, profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Profile update failed');
    }
  }
);

// Async thunk untuk update profile image
export const updateProfileImageAsync = createAsyncThunk(
  'auth/updateProfileImage',
  async ({ token, imageFile }, { rejectWithValue }) => {
    try {
      const response = await updateProfileImage(token, imageFile);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Profile image update failed');
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isLoading: false,
  error: null,
  isRegistered: false,
  isLoggedIn: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRegistrationStatus: (state) => {
      state.isRegistered = false;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // Registration cases
      .addCase(registerUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isRegistered = true;
        state.error = null;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isRegistered = false;
      })
      // Login cases
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.isLoggedIn = true;
        state.error = null;
        localStorage.setItem('token', action.payload.data.token);
        localStorage.setItem('user', JSON.stringify(action.payload.data));
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })
      // Update profile cases
      .addCase(updateProfileAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Update user data if needed
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update profile image cases
      .addCase(updateProfileImageAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfileImageAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Update user profile image if needed
      })
      .addCase(updateProfileImageAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearRegistrationStatus, logout } = authSlice.actions;
export default authSlice.reducer;
