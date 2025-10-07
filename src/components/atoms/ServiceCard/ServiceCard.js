import React from 'react';
import styled from 'styled-components';

const ServiceCardContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px -1px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceIconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor || '#f3f4f6'};
  overflow: hidden;
`;

const ServiceIconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ServiceIconEmoji = styled.div`
  font-size: 24px;
`;

const ServiceName = styled.div`
  color: #1f2937;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
`;

const ServiceTariff = styled.div`
  color: #6b7280;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
`;

const ServiceCard = ({ service, onClick }) => {
  const { service_code, service_name, service_icon, service_tariff } = service;
  
  const handleImageError = (e) => {
    // Fallback jika gambar gagal dimuat
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };
  
  const formatTariff = (tariff) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(tariff);
  };
  
  // Fallback emoji berdasarkan service code
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
      <ServiceTariff>{formatTariff(service_tariff)}</ServiceTariff>
    </ServiceCardContainer>
  );
};

export default ServiceCard;
