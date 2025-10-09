import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, updateProfile, updateProfileImage, getProfile } from '../../services/api';

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

// Async thunk untuk validasi token
export const validateTokenAsync = createAsyncThunk(
  'auth/validateToken',
  async (token, { rejectWithValue }) => {
    try {
      // Cek validitas token dengan memanggil API profile
      const response = await getProfile(token);
      return response;
    } catch (error) {
      // Jika token tidak valid, hapus dari localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return rejectWithValue(error.message || 'Token tidak valid');
    }
  }
);


const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    localStorage.removeItem('user');
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(),
  isLoading: false,
  error: null,
  isRegistered: false,
  isLoggedIn: false, // Tidak langsung set true, akan divalidasi terlebih dahulu
  tokenValidated: false, // Flag untuk menandai apakah token sudah divalidasi
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
      state.tokenValidated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearAuthData: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      state.tokenValidated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setTokenValidated: (state) => {
      state.tokenValidated = true;
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
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
      })
      // Token validation cases
      .addCase(validateTokenAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(validateTokenAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.tokenValidated = true;
        state.error = null;
      })
      .addCase(validateTokenAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.tokenValidated = true;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearRegistrationStatus,
  logout,
  clearAuthData,
  setTokenValidated,
  setAuthLoading
} = authSlice.actions;
export default authSlice.reducer;
