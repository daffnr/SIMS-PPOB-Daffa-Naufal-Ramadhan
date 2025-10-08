import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateTokenAsync, setTokenValidated } from '../../features/auth/authSlice';

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { tokenValidated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        try {
          await dispatch(validateTokenAsync(token)).unwrap();
        } catch (error) {
          // Token invalid, already handled in authSlice
        }
      } else {
        dispatch(setTokenValidated());
      }
    };

    if (!tokenValidated) {
      initializeAuth();
    }
  }, [dispatch, tokenValidated]);

  if (!tokenValidated || isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#6b7280'
      }}>
        Memuat...
      </div>
    );
  }

  return children;
};

export default AuthWrapper;
