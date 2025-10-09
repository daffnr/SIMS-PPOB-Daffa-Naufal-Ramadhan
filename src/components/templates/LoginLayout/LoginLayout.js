import React from 'react';
import styled from 'styled-components';
import ilustrasiLogin from '../../../assets/images/illustrasiLogin.png';

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  background-color: #f9fafb;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 100vh;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: white;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 24px;
    flex: 1;
    min-height: 0;
  }

  @media (max-width: 480px) {
    padding: 20px;
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
    flex: 1;
    min-height: 0;
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
  object-fit: contain;
  object-position: center;
  max-width: 100%;
  max-height: 100%;
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
