import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

const BalanceCardContainer = styled.div`
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  min-width: 280px;
`;

const BalanceTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const BalanceAmount = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const ViewBalanceButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const PatternOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
  opacity: 0.3;
`;

const BalanceCard = ({ balance = 0, onToggleVisibility }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const handleToggle = () => {
    setIsVisible(!isVisible);
    if (onToggleVisibility) {
      onToggleVisibility(!isVisible);
    }
  };
  
  const formatBalance = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <BalanceCardContainer>
      <BalanceTitle>Saldo anda</BalanceTitle>
      <BalanceAmount>
        {isVisible ? formatBalance(balance) : 'Rp ••••••••'}
      </BalanceAmount>
      <ViewBalanceButton onClick={handleToggle}>
        <Icon 
          icon="mdi:eye" 
          width="16" 
          height="16"
        />
        {isVisible ? 'Sembunyikan' : 'Lihat Saldo'}
      </ViewBalanceButton>
      <PatternOverlay />
    </BalanceCardContainer>
  );
};

export default BalanceCard;
