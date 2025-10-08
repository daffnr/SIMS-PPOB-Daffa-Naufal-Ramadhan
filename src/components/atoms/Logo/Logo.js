import React from 'react';
import styled from 'styled-components';
import logoImage from '../../../assets/images/logo.png';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 8px;
`;

const BrandText = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const Logo = () => {
  return (
    <LogoContainer>
      <LogoImage src={logoImage} alt="SIMS PPOB Logo" />
      <BrandText>SIMS PPOB</BrandText>
    </LogoContainer>
  );
};

export default Logo;
