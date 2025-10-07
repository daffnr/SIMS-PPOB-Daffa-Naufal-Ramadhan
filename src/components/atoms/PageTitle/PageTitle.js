import React from 'react';
import styled from 'styled-components';

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 32px 0;
  line-height: 1.2;
`;

const PageTitle = ({ children }) => {
  return <Title>{children}</Title>;
};

export default PageTitle;
