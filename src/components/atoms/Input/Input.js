import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  z-index: 1;
  color: #6b7280;
  font-size: 18px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  padding: 16px 16px 16px 48px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
  
  ${props => props.hasError && `
    border-color: #ef4444;
  `}
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  z-index: 1;
  
  &:hover {
    color: #374151;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 14px;
  margin-top: 4px;
  margin-left: 4px;
`;

const Input = ({ 
  type = 'text', 
  placeholder, 
  icon, 
  value, 
  onChange, 
  error,
  showPasswordToggle = false,
  isPasswordVisible = false,
  onTogglePassword,
  ...props 
}) => {
  return (
    <InputContainer>
      <InputWrapper>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          hasError={!!error}
          {...props}
        />
        {showPasswordToggle && (
          <PasswordToggle onClick={onTogglePassword} type="button">
            {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
          </PasswordToggle>
        )}
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;
