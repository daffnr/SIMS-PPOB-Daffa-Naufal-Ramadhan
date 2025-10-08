import React from 'react';
import styled from 'styled-components';
import ilustrasiLogin from '../../../assets/images/illustrasiLogin.png';

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

const IllustrationImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const RegisterLayout = ({ children }) => {
  return (
    <PageContainer>
      <LeftSection>
        {children}
      </LeftSection>
      <RightSection>
        <IllustrationContainer>
          <IllustrationImage src={ilustrasiLogin} alt="Register Illustration" />
        </IllustrationContainer>
      </RightSection>
    </PageContainer>
  );
};

export default RegisterLayout;
