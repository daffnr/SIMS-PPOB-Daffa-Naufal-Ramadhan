import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const LogoSquare = styled.div`
  width: 40px;
  height: 40px;
  background-color: #dc2626;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LogoText = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: white;
  position: relative;
  
  &::before {
    content: 'S';
    position: absolute;
    left: -2px;
    top: 0;
  }
  
  &::after {
    content: 'P';
    position: absolute;
    right: -2px;
    top: 0;
  }
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
      <LogoSquare>
        <LogoText></LogoText>
      </LogoSquare>
      <BrandText>SIMS PPOB</BrandText>
    </LogoContainer>
  );
};

export default Logo;
