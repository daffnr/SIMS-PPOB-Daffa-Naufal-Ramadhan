import React from 'react';
import styled from 'styled-components';
import ServiceCard from '../../atoms/ServiceCard/ServiceCard';

const ServiceGridContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  overflow-x: auto;
  padding-bottom: 8px;
  
  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
    margin-bottom: 20px;
  }
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ServiceGrid = ({ services = [], onServiceClick }) => {
  if (!services || services.length === 0) {
    return (
      <ServiceGridContainer>
        <div style={{ 
          textAlign: 'center', 
          color: '#6b7280', 
          padding: '40px',
          width: '100%'
        }}>
          Tidak ada layanan tersedia
        </div>
      </ServiceGridContainer>
    );
  }
  
  return (
    <ServiceGridContainer>
      {services.map((service, index) => (
        <ServiceCard
          key={service.service_code || index}
          service={service}
          onClick={() => onServiceClick && onServiceClick(service)}
        />
      ))}
    </ServiceGridContainer>
  );
};

export default ServiceGrid;
