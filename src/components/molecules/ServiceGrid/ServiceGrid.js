import React from 'react';
import styled from 'styled-components';
import ServiceCard from '../../atoms/ServiceCard/ServiceCard';

const ServiceGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ServiceGrid = ({ services = [], onServiceClick }) => {
  if (!services || services.length === 0) {
    return (
      <ServiceGridContainer>
        <div style={{ 
          gridColumn: '1 / -1', 
          textAlign: 'center', 
          color: '#6b7280', 
          padding: '40px' 
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
