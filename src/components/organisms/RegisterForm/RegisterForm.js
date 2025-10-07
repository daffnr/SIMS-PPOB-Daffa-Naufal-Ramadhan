import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Logo from '../../atoms/Logo/Logo';
import PageTitle from '../../atoms/PageTitle/PageTitle';
import FormField from '../../molecules/FormField/FormField';
import Button from '../../atoms/Button/Button';
import LoginLink from '../../atoms/LoginLink/LoginLink';
import { registerUserAsync, clearError } from '../../../features/auth/authSlice';

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

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error, isRegistered } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Nama depan harus diisi';
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nama belakang harus diisi';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password harus diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
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
    
    const { confirmPassword, ...userData } = formData;
    
    // Convert field names to match API requirements
    const apiData = {
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
      password: userData.password
    };
    
    dispatch(registerUserAsync(apiData));
  };

  const handleLoginClick = () => {
    // Navigate to login page
    window.location.href = '/login';
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <FormContainer>
      <Logo />
      <PageTitle>Lengkapi data untuk membuat akun</PageTitle>
      
      {error && (
        <ErrorAlert>
          {typeof error === 'string' ? error : 'Terjadi kesalahan saat registrasi'}
        </ErrorAlert>
      )}
      
      {isRegistered && (
        <SuccessAlert>
          Registrasi berhasil! Silakan login dengan akun Anda.
        </SuccessAlert>
      )}
      
      <form onSubmit={handleSubmit}>
        <FormField
          type="email"
          placeholder="@ masukan email anda"
          icon="📧"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={errors.email}
        />
        
        <FormField
          type="text"
          placeholder="nama depan"
          icon="👤"
          value={formData.firstName}
          onChange={handleInputChange('firstName')}
          error={errors.firstName}
        />
        
        <FormField
          type="text"
          placeholder="nama belakang"
          icon="👤"
          value={formData.lastName}
          onChange={handleInputChange('lastName')}
          error={errors.lastName}
        />
        
        <FormField
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="buat password"
          icon="🔒"
          value={formData.password}
          onChange={handleInputChange('password')}
          error={errors.password}
          showPasswordToggle={true}
          isPasswordVisible={isPasswordVisible}
          onTogglePassword={togglePasswordVisibility}
        />
        
        <FormField
          type={isConfirmPasswordVisible ? 'text' : 'password'}
          placeholder="konfirmasi password"
          icon="🔒"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          error={errors.confirmPassword}
          showPasswordToggle={true}
          isPasswordVisible={isConfirmPasswordVisible}
          onTogglePassword={toggleConfirmPasswordVisibility}
        />
        
        <Button 
          type="submit" 
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Mendaftar...' : 'Registrasi'}
        </Button>
      </form>
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <LoginLink onLoginClick={handleLoginClick} />
      </div>
    </FormContainer>
  );
};

export default RegisterForm;
