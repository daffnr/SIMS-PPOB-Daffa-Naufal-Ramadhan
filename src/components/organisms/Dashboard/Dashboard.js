import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../atoms/Logo/Logo';
import Avatar from '../../atoms/Avatar/Avatar';
import BalanceCard from '../../atoms/BalanceCard/BalanceCard';
import ServiceGrid from '../../molecules/ServiceGrid/ServiceGrid';
import BannerSlider from '../../molecules/BannerSlider/BannerSlider';
import { 
  fetchProfileAsync, 
  fetchBalanceAsync, 
  fetchServicesAsync, 
  fetchBannersAsync
} from '../../../features/dashboard/dashboardSlice';
import { logout } from '../../../features/auth/authSlice';

const DashboardContainer = styled.div`
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

const Navigation = styled.div`
  display: flex;
  gap: 24px;
`;

const NavLink = styled.a`
  color: #1f2937;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    color: #dc2626;
  }
`;

const UserSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  gap: 32px;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const BalanceSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
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

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { 
    profile, 
    balance, 
    services, 
    banners, 
    isLoading, 
    error 
  } = useSelector((state) => state.dashboard);
  
  useEffect(() => {
    // Only fetch data if user is logged in
    if (isLoggedIn) {
      dispatch(fetchProfileAsync());
      dispatch(fetchBalanceAsync());
      dispatch(fetchServicesAsync());
      dispatch(fetchBannersAsync());
    } else {
      // Redirect to login if not logged in
      navigate('/login');
    }
  }, [dispatch, isLoggedIn, navigate]);
  
  const handleServiceClick = (service) => {
    navigate('/payment', { state: { service } });
  };
  
  const handleBannerClick = (banner) => {
    // Navigate to promotion detail
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  if (isLoading) {
    return (
      <DashboardContainer>
        <LoadingSpinner />
      </DashboardContainer>
    );
  }
  
  return (
    <DashboardContainer>
      <Header>
        <Logo />
        <Navigation>
          <NavLink onClick={() => navigate('/topup')}>Top Up</NavLink>
          <NavLink onClick={() => navigate('/transaction')}>Transaction</NavLink>
          <NavLink onClick={() => navigate('/profile')}>Akun</NavLink>
        </Navigation>
      </Header>
      
      {error && (
        <ErrorMessage>
          {typeof error === 'string' ? error : 'Terjadi kesalahan saat memuat data'}
        </ErrorMessage>
      )}
      
      <UserSection>
        <UserInfo>
          <Avatar profile={profile?.data} />
        </UserInfo>
        <BalanceSection>
          <BalanceCard balance={balance?.data?.balance || 0} />
        </BalanceSection>
      </UserSection>
      
      <ServiceGrid 
        services={services} 
        onServiceClick={handleServiceClick}
      />
      
      <BannerSlider 
        banners={banners} 
        onBannerClick={handleBannerClick}
      />
    </DashboardContainer>
  );
};

export default Dashboard;
