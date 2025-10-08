import React from 'react';
import styled from 'styled-components';
import ilustrasiLogin from '../../../assets/images/illustrasiLogin.png';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background-color: #f9fafb;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: white;
  
  @media (max-width: 768px) {
    padding: 24px;
    min-height: 60vh;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    min-height: 70vh;
  }
`;

const RightSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    min-height: 40vh;
  }
  
  @media (max-width: 480px) {
    min-height: 30vh;
  }
`;

const IllustrationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IllustrationImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  
  @media (max-width: 768px) {
    object-fit: contain;
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
          <IllustrationImage src={ilustrasiLogin} alt="Login Illustration" />
        </IllustrationContainer>
      </RightSection>
    </PageContainer>
  );
};

export default LoginLayout;
