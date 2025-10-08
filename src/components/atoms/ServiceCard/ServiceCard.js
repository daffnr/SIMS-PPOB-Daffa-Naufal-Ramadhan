import React from 'react';
import styled from 'styled-components';

const ServiceCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  min-width: 80px;
  padding: 8px;
  
  @media (max-width: 768px) {
    gap: 6px;
    min-width: 70px;
    padding: 6px;
  }
  
  @media (max-width: 480px) {
    gap: 4px;
    min-width: 60px;
    padding: 4px;
  }
  
  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
`;

const ServiceIconContainer = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`;

const ServiceIconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ServiceIconEmoji = styled.div`
  font-size: 24px;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const ServiceName = styled.div`
  color: #1f2937;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const ServiceCard = ({ service, onClick }) => {
  const { service_code, service_name, service_icon } = service;
  
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };
  const getFallbackEmoji = (code) => {
    const emojiMap = {
      'PAJAK': '🏠',
      'PLN': '⚡',
      'PDAM': '💧',
      'PULSA': '📱',
      'PGN': '🔥',
      'MUSIK': '🎵',
      'TV': '📺',
      'PAKET_DATA': '📶',
      'VOUCHER_GAME': '🎮',
      'VOUCHER_MAKANAN': '🍔',
      'QURBAN': '🌙',
      'ZAKAT': '🤲'
    };
    return emojiMap[code] || '📋';
  };
  
  return (
    <ServiceCardContainer onClick={onClick}>
      <ServiceIconContainer>
        <ServiceIconImage 
          src={service_icon} 
          alt={service_name}
          onError={handleImageError}
        />
        <ServiceIconEmoji style={{ display: 'none' }}>
          {getFallbackEmoji(service_code)}
        </ServiceIconEmoji>
      </ServiceIconContainer>
      <ServiceName>{service_name}</ServiceName>
    </ServiceCardContainer>
  );
};

export default ServiceCard;
