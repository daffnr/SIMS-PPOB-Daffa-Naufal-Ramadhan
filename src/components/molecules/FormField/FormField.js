import React from 'react';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';

const FieldContainer = styled.div`
  margin-bottom: 20px;
`;

const FormField = ({ 
  label,
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
    <FieldContainer>
      <Input
        type={type}
        placeholder={placeholder}
        icon={icon}
        value={value}
        onChange={onChange}
        error={error}
        showPasswordToggle={showPasswordToggle}
        isPasswordVisible={isPasswordVisible}
        onTogglePassword={onTogglePassword}
        {...props}
      />
    </FieldContainer>
  );
};

export default FormField;
