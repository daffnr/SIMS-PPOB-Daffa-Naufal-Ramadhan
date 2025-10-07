import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  width: 100%;
  height: 56px;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background-color: #b91c1c;
  }
  
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Button = ({ children, isLoading = false, disabled = false, ...props }) => {
  return (
    <ButtonContainer disabled={disabled || isLoading} {...props}>
      {isLoading && <LoadingSpinner />}
      {children}
    </ButtonContainer>
  );
};

export default Button;
