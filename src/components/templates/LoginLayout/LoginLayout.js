import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background-color: #f9fafb;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: white;
`;

const RightSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const IllustrationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Character = styled.div`
  width: 300px;
  height: 400px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: relative;
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 80px;
    background-color: #fbbf24;
    border-radius: 50%;
    border: 3px solid #f59e0b;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 60px;
    background-color: #fbbf24;
    border-radius: 50%;
  }
`;

const GeometricShape = styled.div`
  position: absolute;
  border-radius: ${props => props.shape === 'circle' ? '50%' : '0'};
  background: ${props => props.color};
  animation: float 4s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  &:nth-child(1) {
    width: 40px;
    height: 40px;
    top: 20%;
    left: 10%;
    background: #10b981;
  }
  
  &:nth-child(2) {
    width: 30px;
    height: 30px;
    top: 30%;
    right: 15%;
    background: #ec4899;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
  
  &:nth-child(3) {
    width: 50px;
    height: 50px;
    bottom: 25%;
    left: 20%;
    background: #10b981;
    transform: rotate(45deg);
  }
  
  &:nth-child(4) {
    width: 35px;
    height: 35px;
    bottom: 30%;
    right: 25%;
    background: #fbbf24;
    border-radius: 50%;
  }
  
  &:nth-child(5) {
    width: 25px;
    height: 25px;
    top: 60%;
    right: 10%;
    background: #8b5cf6;
    border-radius: 50%;
  }
`;

const LoginLayout = ({ children }) => {
  return (
    <PageContainer>
      <LeftSection>
        {children}
      </LeftSection>
      <RightSection>
        <IllustrationContainer>
          <Character />
          <GeometricShape />
          <GeometricShape />
          <GeometricShape />
          <GeometricShape />
          <GeometricShape />
        </IllustrationContainer>
      </RightSection>
    </PageContainer>
  );
};

export default LoginLayout;
