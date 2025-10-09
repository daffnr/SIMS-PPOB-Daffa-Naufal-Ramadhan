import React from 'react';
import styled from 'styled-components';
import ServiceCard from '../../atoms/ServiceCard/ServiceCard';

const ServiceGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
  padding: 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
    gap: 12px;
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    gap: 8px;
    margin-bottom: 20px;
  }

  /* Fallback untuk browser yang tidak support CSS Grid */
  @supports not (display: grid) {
    display: flex;
    flex-wrap: wrap;
    overflow-x: auto;
    padding-bottom: 8px;

    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
  }
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
