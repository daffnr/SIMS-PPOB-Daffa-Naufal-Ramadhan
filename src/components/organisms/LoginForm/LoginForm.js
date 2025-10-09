import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../atoms/Logo/Logo';
import LoginPageTitle from '../../atoms/LoginPageTitle/LoginPageTitle';
import FormField from '../../molecules/FormField/FormField';
import LoginButton from '../../atoms/LoginButton/LoginButton';
import RegisterLink from '../../atoms/RegisterLink/RegisterLink';
import { loginUserAsync, clearError } from '../../../features/auth/authSlice';

const FormContainer = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const ErrorAlert = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const SuccessAlert = styled.div`
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #16a34a;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user, isLoggedIn } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Redirect to home after successful login
  useEffect(() => {
    if (isLoggedIn && user) {
      navigate('/home');
    }
  }, [isLoggedIn, user, navigate]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Clear API error
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(loginUserAsync(formData));
  };

  const handleRegisterClick = () => {
    // Navigate to register page
    navigate('/register');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <FormContainer>
      <Logo />
      <LoginPageTitle>Masuk atau buat akun untuk memulai</LoginPageTitle>

      {error && (
        <ErrorAlert>
          {typeof error === 'string' ? error : 'Terjadi kesalahan saat login'}
        </ErrorAlert>
      )}

      {user && (
        <SuccessAlert>
          Login berhasil! Selamat datang kembali.
        </SuccessAlert>
      )}

      <form onSubmit={handleSubmit}>
        <FormField
          type="email"
          placeholder="masukan email anda"
          icon="📧"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={errors.email}
        />

        <FormField
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="masukan password anda"
          icon="🔒"
          value={formData.password}
          onChange={handleInputChange('password')}
          error={errors.password}
          showPasswordToggle={true}
          isPasswordVisible={isPasswordVisible}
          onTogglePassword={togglePasswordVisibility}
        />

        <LoginButton
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Masuk...' : 'Masuk'}
        </LoginButton>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <RegisterLink onRegisterClick={handleRegisterClick} />
      </div>
    </FormContainer>
  );
};

export default LoginForm;
