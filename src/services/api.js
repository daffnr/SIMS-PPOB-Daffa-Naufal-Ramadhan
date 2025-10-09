const API_BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

const fetchWithTimeout = (url, options, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
};

export const registerUser = async (userData) => {

  try {
    const response = await fetch(`${API_BASE_URL}/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Registration failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    // Handle specific network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti.');
    }
    throw error;
  }
};

export const loginUser = async (userData) => {

  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Login failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error.message === 'Request timeout') {
      throw new Error('Koneksi timeout. Server mungkin sedang sibuk, coba lagi nanti.');
    }
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti.');
    }
    throw error;
  }
};

export const getProfile = async (token) => {

  try {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Failed to fetch profile');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getBalance = async (token) => {

  try {
    const response = await fetch(`${API_BASE_URL}/balance`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Failed to fetch balance');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getServices = async (token) => {

  try {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Failed to fetch services');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getBanners = async (token) => {

  try {
    const response = await fetch(`${API_BASE_URL}/banner`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Failed to fetch banners');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (token, profileData) => {

  try {
    const response = await fetch(`${API_BASE_URL}/profile/update`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Failed to update profile');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateProfileImage = async (token, imageFile) => {

  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch(`${API_BASE_URL}/profile/image`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Failed to update profile image');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getTransactionHistory = async (token, offset = 0, limit = 5) => {

  try {
    const response = await fetch(`${API_BASE_URL}/transaction/history?offset=${offset}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Failed to fetch transaction history');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const topUp = async (token, topUpAmount) => {

  try {
    const response = await fetch(`${API_BASE_URL}/topup`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        top_up_amount: topUpAmount
      }),
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Failed to process top up');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const createTransaction = async (token, transactionData) => {

  try {
    const response = await fetch(`${API_BASE_URL}/transaction`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Failed to process transaction');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
