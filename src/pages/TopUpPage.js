import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { topUp, getProfile, getBalance } from '../services/api';
import Logo from '../components/atoms/Logo/Logo';
import defaultProfileImage from '../assets/images/profilePhoto.png';

const TopUpContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 24px;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px 0;
  border-bottom: 1px solid #e5e7eb;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
    padding: 12px 0;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 16px;
    padding: 10px 0;
    gap: 8px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 32px;
  
  @media (max-width: 768px) {
    gap: 16px;
    width: 100%;
    justify-content: space-between;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
    flex-wrap: wrap;
  }
`;

const NavLink = styled.a`
  color: #1f2937;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
  
  &.active {
    color: #dc2626;
  }
`;

const MainContent = styled.div`
  display: flex;
  gap: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
  
  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
`;

const RightSection = styled.div`
  flex: 1;
`;

const UserInfo = styled.div`
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const BalanceCard = styled.div`
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
`;

const BalanceCardBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transform: translate(30px, -30px);
`;

const BalanceTitle = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  opacity: 0.9;
`;

const BalanceAmount = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ViewBalanceLink = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.9;
  
  &:hover {
    opacity: 1;
  }
`;

const TopUpSection = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.div`
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 8px;
`;

const SectionSubtitle = styled.h2`
  color: #1f2937;
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 24px 0;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 16px;
`;

const AmountInput = styled.input`
  width: 100%;
  padding: 16px 12px 16px 40px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  color: #1f2937;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const QuickAmountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`;

const QuickAmountButton = styled.button`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: white;
  color: #1f2937;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #dc2626;
    color: #dc2626;
  }
  
  &.selected {
    border-color: #dc2626;
    background-color: #fef2f2;
    color: #dc2626;
  }
`;

const TopUpButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: ${props => props.disabled ? '#9ca3af' : '#dc2626'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s;
  
  &:hover:not(:disabled) {
    background-color: #b91c1c;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const ModalIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 32px;
  
  &.success {
    background-color: #10b981;
    color: white;
  }
  
  &.error {
    background-color: #dc2626;
    color: white;
  }
  
  &.confirm {
    background-color: #dc2626;
    color: white;
  }
`;

const ModalTitle = styled.h3`
  color: #1f2937;
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 16px 0;
`;

const ModalMessage = styled.div`
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 24px;
`;

const ModalAmount = styled.div`
  color: #1f2937;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ModalButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &.primary {
    background-color: #dc2626;
    color: white;
    
    &:hover {
      background-color: #b91c1c;
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: #6b7280;
    
    &:hover {
      color: #1f2937;
    }
  }
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #dc2626;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 40px auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

const TopUpPage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector(state => state.auth);
  const token = user?.token || localStorage.getItem('token');
  
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  
  const [amount, setAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('confirm'); // confirm, success, error
  const [isProcessing, setIsProcessing] = useState(false);
  
  const quickAmounts = [10000, 20000, 50000, 100000, 250000, 500000];
  const minAmount = 10000;
  const maxAmount = 1000000;

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [profileResponse, balanceResponse] = await Promise.all([
        getProfile(token),
        getBalance(token)
      ]);
      
      setProfile(profileResponse.data);
      setBalance(balanceResponse.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!isLoggedIn || !token) {
      navigate('/login');
      return;
    }
    
    fetchInitialData();
  }, [isLoggedIn, token, navigate, fetchInitialData]);

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
    setSelectedAmount(null);
  };

  const handleQuickAmountClick = (quickAmount) => {
    setAmount(quickAmount.toString());
    setSelectedAmount(quickAmount);
  };

  const isAmountValid = () => {
    const numAmount = parseInt(amount);
    return numAmount >= minAmount && numAmount <= maxAmount;
  };

  const handleTopUpClick = () => {
    if (!isAmountValid()) return;
    
    setModalType('confirm');
    setIsModalOpen(true);
  };

  const handleConfirmTopUp = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const topUpAmount = parseInt(amount);
      await topUp(token, topUpAmount);
      
      setModalType('success');
      setIsProcessing(false);
      
      // Refresh balance after successful top up
      setTimeout(() => {
        fetchInitialData();
      }, 1000);
      
    } catch (err) {
      setModalType('error');
      setIsProcessing(false);
      setError(err.message);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (modalType === 'success') {
      setAmount('');
      setSelectedAmount(null);
    }
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <TopUpContainer>
        <LoadingSpinner />
      </TopUpContainer>
    );
  }

  return (
    <TopUpContainer>
      <Header>
        <Logo />
        <Navigation>
          <NavLink href="#topup" className="active">Top Up</NavLink>
          <NavLink onClick={() => navigate('/transaction')}>Transaction</NavLink>
          <NavLink onClick={() => navigate('/profile')}>Akun</NavLink>
        </Navigation>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <MainContent>
        <LeftSection>
          <UserInfo>
            {profile && (
              <>
                <img 
                  src={profile.profile_image && profile.profile_image.trim() !== '' ? profile.profile_image : defaultProfileImage} 
                  alt="Profile" 
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '12px'
                  }}
                  onError={(e) => {
                    e.target.src = defaultProfileImage;
                  }}
                />
                <div style={{ color: '#6b7280', fontSize: '16px', marginBottom: '4px' }}>
                  Selamat datang,
                </div>
                <div style={{ color: '#1f2937', fontSize: '20px', fontWeight: 'bold' }}>
                  {profile.first_name} {profile.last_name}
                </div>
              </>
            )}
          </UserInfo>

          <TopUpSection>
            <SectionTitle>Silahkan masukan</SectionTitle>
            <SectionSubtitle>Nominal Top Up</SectionSubtitle>
            
            <InputContainer>
              <InputIcon>💳</InputIcon>
              <AmountInput
                type="text"
                placeholder="masukan nominal Top Up"
                value={amount}
                onChange={handleAmountChange}
              />
            </InputContainer>

            <TopUpButton
              onClick={handleTopUpClick}
              disabled={!isAmountValid()}
            >
              Top Up
            </TopUpButton>
          </TopUpSection>
        </LeftSection>

        <RightSection>
          <BalanceCard>
            <BalanceCardBackground />
            <BalanceTitle>Saldo anda</BalanceTitle>
            <BalanceAmount>
              {isBalanceVisible ? formatAmount(balance?.balance || 0) : 'Rp ••••••••'}
            </BalanceAmount>
            <ViewBalanceLink onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
              <Icon 
                icon="mdi:eye" 
                width="16" 
                height="16"
              />
              <span>{isBalanceVisible ? 'Tutup Saldo' : 'Lihat Saldo'}</span>
            </ViewBalanceLink>
          </BalanceCard>

          <QuickAmountGrid>
            {quickAmounts.map(quickAmount => (
              <QuickAmountButton
                key={quickAmount}
                className={selectedAmount === quickAmount ? 'selected' : ''}
                onClick={() => handleQuickAmountClick(quickAmount)}
              >
                {formatAmount(quickAmount)}
              </QuickAmountButton>
            ))}
          </QuickAmountGrid>
        </RightSection>
      </MainContent>

      {isModalOpen && (
        <ModalOverlay onClick={handleModalClose}>
          <Modal onClick={(e) => e.stopPropagation()}>
            {modalType === 'confirm' && (
              <>
                <ModalIcon className="confirm">💳</ModalIcon>
                <ModalTitle>Konfirmasi Top Up</ModalTitle>
                <ModalMessage>Anda yakin untuk Top Up sebesar</ModalMessage>
                <ModalAmount>{formatAmount(parseInt(amount))} ?</ModalAmount>
                <ModalButtons>
                  <ModalButton 
                    className="primary" 
                    onClick={handleConfirmTopUp}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Ya, lanjutkan Top Up'}
                  </ModalButton>
                  <ModalButton className="secondary" onClick={handleModalClose}>
                    Batalkan
                  </ModalButton>
                </ModalButtons>
              </>
            )}

            {modalType === 'success' && (
              <>
                <ModalIcon className="success">✓</ModalIcon>
                <ModalTitle>Top Up Berhasil!</ModalTitle>
                <ModalMessage>Top Up sebesar</ModalMessage>
                <ModalAmount>{formatAmount(parseInt(amount))}</ModalAmount>
                <ModalMessage>berhasil!</ModalMessage>
                <ModalButtons>
                  <ModalButton className="primary" onClick={handleBackToHome}>
                    Kembali ke Beranda
                  </ModalButton>
                </ModalButtons>
              </>
            )}

            {modalType === 'error' && (
              <>
                <ModalIcon className="error">✕</ModalIcon>
                <ModalTitle>Top Up Gagal</ModalTitle>
                <ModalMessage>Top Up sebesar</ModalMessage>
                <ModalAmount>{formatAmount(parseInt(amount))}</ModalAmount>
                <ModalMessage>gagal!</ModalMessage>
                <ModalButtons>
                  <ModalButton className="primary" onClick={handleModalClose}>
                    Kembali ke Beranda
                  </ModalButton>
                </ModalButtons>
              </>
            )}
          </Modal>
        </ModalOverlay>
      )}
    </TopUpContainer>
  );
};

export default TopUpPage;
