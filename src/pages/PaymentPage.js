import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { createTransaction, getProfile, getBalance } from '../services/api';
import DefaultAvatar from '../components/atoms/DefaultAvatar/DefaultAvatar';

const PaymentContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

const LogoText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
`;

const Navigation = styled.div`
  display: flex;
  gap: 32px;
`;

const NavLink = styled.a`
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: #dc2626;
  }
  
  &.active {
    color: #dc2626;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const AvatarContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const WelcomeText = styled.p`
  color: #6b7280;
  margin: 0 0 4px 0;
  font-size: 14px;
`;

const UserName = styled.h2`
  color: #1f2937;
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`;

const PaymentSection = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  color: #1f2937;
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: bold;
`;

const ServiceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
`;

const ServiceIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #f3f4f6;
`;

const ServiceIconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ServiceIconEmoji = styled.div`
  font-size: 20px;
`;

const ServiceName = styled.span`
  color: #1f2937;
  font-weight: 500;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 18px;
`;

const AmountInput = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 16px;
  background: white;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const AmountDisplay = styled.div`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 16px;
  background: #f9fafb;
  color: #1f2937;
  font-weight: 500;
`;

const ValidationError = styled.div`
  color: #dc2626;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
`;

const PayButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const BalanceCard = styled.div`
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const BalanceCardBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
  opacity: 0.3;
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

const ViewBalanceLink = styled.button`
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

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #6b7280;
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

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.type === 'success' ? '#10b981' : props.type === 'error' ? '#dc2626' : '#dc2626'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 32px;
  color: white;
`;

const ModalTitle = styled.h3`
  color: #1f2937;
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: bold;
`;

const ModalMessage = styled.p`
  color: #6b7280;
  margin: 0 0 24px 0;
  font-size: 14px;
  line-height: 1.5;
`;

const ModalAmount = styled.div`
  color: #1f2937;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ModalButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background: #dc2626;
    color: white;
    
    &:hover {
      background: #b91c1c;
    }
  }
  
  &.secondary {
    background: #f3f4f6;
    color: #6b7280;
    
    &:hover {
      background: #e5e7eb;
    }
  }
`;

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn } = useSelector(state => state.auth);
  const token = user?.token || localStorage.getItem('token');
  
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('confirm'); // confirm, success, error
  const [modalData, setModalData] = useState(null);
  const [validationError, setValidationError] = useState('');
  
  // Get service data from location state
  const service = location.state?.service;

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
    
    if (!service) {
      navigate('/home');
      return;
    }
    
    fetchInitialData();
  }, [isLoggedIn, token, navigate, service, fetchInitialData]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const isPaymentValid = () => {
    if (!service) return false;
    if (!balance) return false;
    
    // Check if user has enough balance
    return balance.balance >= service.service_tariff;
  };

  const handleImageError = (e) => {
    // Fallback jika gambar gagal dimuat
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
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

  const handlePayClick = () => {
    if (!isPaymentValid()) {
      setValidationError('Saldo tidak mencukupi untuk melakukan pembayaran');
      return;
    }
    
    setValidationError('');
    setModalData({
      serviceName: service.service_name,
      serviceIcon: service.service_icon,
      amount: service.service_tariff
    });
    setModalType('confirm');
    setIsModalOpen(true);
  };

  const handleConfirmPayment = async () => {
    try {
      setIsProcessing(true);
      setIsModalOpen(false);
      
      const transactionData = {
        service_code: service.service_code
      };
      
      const response = await createTransaction(token, transactionData);
      
      // Show success modal
      setModalData({
        serviceName: service.service_name,
        serviceIcon: service.service_icon,
        amount: service.service_tariff,
        transactionId: response.data.transaction_id
      });
      setModalType('success');
      setIsModalOpen(true);
      
      // Refresh balance
      const balanceResponse = await getBalance(token);
      setBalance(balanceResponse.data);
      
    } catch (err) {
      // Show error modal
      setModalData({
        serviceName: service.service_name,
        serviceIcon: service.service_icon,
        amount: service.service_tariff,
        error: err.message
      });
      setModalType('error');
      setIsModalOpen(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (modalType === 'success') {
      navigate('/home');
    }
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  if (loading) {
    return (
      <PaymentContainer>
        <LoadingSpinner>Loading...</LoadingSpinner>
      </PaymentContainer>
    );
  }

  return (
    <PaymentContainer>
      <Header>
        <Logo>
          <LogoIcon>S</LogoIcon>
          <LogoText>SIMS PPOB</LogoText>
        </Logo>
        <Navigation>
          <NavLink onClick={() => navigate('/topup')}>Top Up</NavLink>
          <NavLink onClick={() => navigate('/transaction')}>Transaction</NavLink>
          <NavLink onClick={() => navigate('/profile')}>Akun</NavLink>
        </Navigation>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <MainContent>
        <LeftSection>
          <UserSection>
            <AvatarContainer>
              {profile?.profile_image ? (
                <img 
                  src={profile.profile_image} 
                  alt="Profile" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <DefaultAvatar />
              )}
            </AvatarContainer>
            <UserInfo>
              <WelcomeText>Selamat datang,</WelcomeText>
              <UserName>{profile?.first_name} {profile?.last_name}</UserName>
            </UserInfo>
          </UserSection>

          <PaymentSection>
            <SectionTitle>PemBayaran</SectionTitle>
            
            <ServiceInfo>
              <ServiceIcon>
                <ServiceIconImage 
                  src={service?.service_icon} 
                  alt={service?.service_name}
                  onError={handleImageError}
                />
                <ServiceIconEmoji style={{ display: 'none' }}>
                  {getFallbackEmoji(service?.service_code)}
                </ServiceIconEmoji>
              </ServiceIcon>
              <ServiceName>{service?.service_name}</ServiceName>
            </ServiceInfo>

            <InputContainer>
              <InputIcon>💳</InputIcon>
              <AmountDisplay>
                {formatAmount(service?.service_tariff || 0)}
              </AmountDisplay>
            </InputContainer>

            {validationError && (
              <ValidationError>{validationError}</ValidationError>
            )}

            <PayButton 
              onClick={handlePayClick}
              disabled={!isPaymentValid() || isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Bayar Sekarang'}
            </PayButton>
          </PaymentSection>
        </LeftSection>

        <RightSection>
          <BalanceCard>
            <BalanceCardBackground />
            <BalanceTitle>Saldo anda</BalanceTitle>
            <BalanceAmount>
              {isBalanceVisible ? formatAmount(balance?.balance || 0) : 'Rp ••••••••'}
            </BalanceAmount>
            <ViewBalanceLink onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
              <span>👁️</span>
              <span>{isBalanceVisible ? 'Tutup Saldo' : 'Lihat Saldo'}</span>
            </ViewBalanceLink>
          </BalanceCard>
        </RightSection>
      </MainContent>

      {/* Modal */}
      {isModalOpen && (
        <ModalOverlay onClick={handleModalClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {modalType === 'confirm' && (
              <>
                <ModalIcon>
                  <img 
                    src={modalData?.serviceIcon} 
                    alt={modalData?.serviceName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{ display: 'none', fontSize: '32px' }}>
                    {getFallbackEmoji(service?.service_code)}
                  </div>
                </ModalIcon>
                <ModalTitle>Konfirmasi Pembayaran</ModalTitle>
                <ModalMessage>
                  Beli {modalData?.serviceName} senilai
                </ModalMessage>
                <ModalAmount>{formatAmount(modalData?.amount || 0)} ?</ModalAmount>
                <ModalButtons>
                  <ModalButton className="primary" onClick={handleConfirmPayment}>
                    Ya, lanjutkan Bayar
                  </ModalButton>
                  <ModalButton className="secondary" onClick={handleModalClose}>
                    Batalkan
                  </ModalButton>
                </ModalButtons>
              </>
            )}
            
            {modalType === 'success' && (
              <>
                <ModalIcon type="success">
                  <img 
                    src={modalData?.serviceIcon} 
                    alt={modalData?.serviceName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{ display: 'none', fontSize: '32px' }}>✓</div>
                </ModalIcon>
                <ModalTitle>Pembayaran Berhasil!</ModalTitle>
                <ModalMessage>
                  Pembayaran {modalData?.serviceName} sebesar
                </ModalMessage>
                <ModalAmount>{formatAmount(modalData?.amount || 0)} berhasil!</ModalAmount>
                <ModalButtons>
                  <ModalButton className="primary" onClick={handleBackToHome}>
                    Kembali ke Beranda
                  </ModalButton>
                </ModalButtons>
              </>
            )}
            
            {modalType === 'error' && (
              <>
                <ModalIcon type="error">
                  <img 
                    src={modalData?.serviceIcon} 
                    alt={modalData?.serviceName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{ display: 'none', fontSize: '32px' }}>✕</div>
                </ModalIcon>
                <ModalTitle>Pembayaran Gagal</ModalTitle>
                <ModalMessage>
                  Pembayaran {modalData?.serviceName} sebesar {formatAmount(modalData?.amount || 0)}
                </ModalMessage>
                <ModalAmount>gagal</ModalAmount>
                <ModalButtons>
                  <ModalButton className="primary" onClick={handleBackToHome}>
                    Kembali ke Beranda
                  </ModalButton>
                </ModalButtons>
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </PaymentContainer>
  );
};

export default PaymentPage;
