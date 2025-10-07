import React from 'react';
import styled from 'styled-components';

const LinkText = styled.span`
  color: #6b7280;
  font-size: 16px;
`;

const Link = styled.span`
  color: #dc2626;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    color: #b91c1c;
    text-decoration: underline;
  }
`;

const LoginLink = ({ onLoginClick }) => {
  return (
    <LinkText>
      sudah punya akun? <Link onClick={onLoginClick}>login di sini</Link>
    </LinkText>
  );
};

export default LoginLink;
