import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getTransactionHistory, getProfile, getBalance } from '../services/api';
import DefaultAvatar from '../components/atoms/DefaultAvatar/DefaultAvatar';

const TransactionContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 24px;
`;

const Header = styled.header`
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
  background-color: #dc2626;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

const LogoText = styled.h1`
  color: #1f2937;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 32px;
`;

const NavLink = styled.a`
  color: #1f2937;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  
  &.active {
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

const BalanceCard = styled.div`
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  min-width: 280px;
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

const TransactionSection = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #1f2937;
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 24px 0;
`;

const MonthFilter = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;
`;

const MonthButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 0;
  white-space: nowrap;
  
  &.active {
    color: #1f2937;
    font-weight: bold;
  }
  
  &:hover {
    color: #1f2937;
  }
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
`;

const TransactionLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TransactionAmount = styled.div`
  font-size: 16px;
  font-weight: bold;
  
  &.positive {
    color: #16a34a;
  }
  
  &.negative {
    color: #dc2626;
  }
`;

const TransactionDate = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const TransactionDescription = styled.div`
  font-size: 14px;
  color: #1f2937;
  font-weight: 500;
`;

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #dc2626;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin: 24px auto 0;
  display: block;
  
  &:hover {
    color: #b91c1c;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  padding: 40px 0;
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

const TransactionPage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector(state => state.auth);
  const token = user?.token || localStorage.getItem('token');
  
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('Semua');
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  
  const months = ['Semua', 'Maret', 'Mei', 'Juni', 'Juli', 'Agustus', 'September'];
  const limit = 5;

  // Function to get month number from month name
  const getMonthNumber = (monthName) => {
    const monthMap = {
      'Maret': 2,    // March (0-indexed)
      'Mei': 4,      // May (0-indexed)
      'Juni': 5,     // June (0-indexed)
      'Juli': 6,     // July (0-indexed)
      'Agustus': 7,  // August (0-indexed)
      'September': 8 // September (0-indexed)
    };
    return monthMap[monthName];
  };

  // Function to filter transactions by month
  const filterTransactionsByMonth = useCallback((transactions, monthName) => {
    if (!monthName || monthName === 'Semua') {
      return transactions;
    }
    
    const targetMonth = getMonthNumber(monthName);
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.created_on);
      return transactionDate.getMonth() === targetMonth;
    });
  }, []);

  // Function to handle month filter change
  const handleMonthChange = useCallback((monthName) => {
    setSelectedMonth(monthName);
    const filtered = filterTransactionsByMonth(allTransactions, monthName);
    setFilteredTransactions(filtered);
  }, [allTransactions, filterTransactionsByMonth]);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [profileResponse, balanceResponse, transactionResponse] = await Promise.all([
        getProfile(token),
        getBalance(token),
        getTransactionHistory(token, 0, limit)
      ]);
      
      setProfile(profileResponse.data);
      setBalance(balanceResponse.data);
      
      const allRecords = transactionResponse.data.records || [];
      setAllTransactions(allRecords);
      
      // Apply initial filter based on selected month
      const filtered = filterTransactionsByMonth(allRecords, selectedMonth);
      setFilteredTransactions(filtered);
      
      setOffset(limit);
      setHasMore(allRecords.length === limit);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, limit, selectedMonth, filterTransactionsByMonth]);

  useEffect(() => {
    if (!isLoggedIn || !token) {
      navigate('/login');
      return;
    }
    
    fetchInitialData();
  }, [isLoggedIn, token, navigate, fetchInitialData]);

  const handleShowMore = useCallback(async () => {
    try {
      setLoadingMore(true);
      setError(null);
      
      const response = await getTransactionHistory(token, offset, limit);
      const newTransactions = response.data.records || [];
      
      // Add new transactions to all transactions
      const updatedAllTransactions = [...allTransactions, ...newTransactions];
      setAllTransactions(updatedAllTransactions);
      
      // Apply current filter to updated transactions
      const filtered = filterTransactionsByMonth(updatedAllTransactions, selectedMonth);
      setFilteredTransactions(filtered);
      
      setOffset(prev => prev + limit);
      setHasMore(newTransactions.length === limit);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  }, [token, offset, limit, allTransactions, selectedMonth, filterTransactionsByMonth]);

  const formatAmount = (amount, isPayment = false) => {
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(Math.abs(amount));
    
    // If it's a payment transaction, always show with minus sign
    if (isPayment) {
      return `- ${formatted}`;
    }
    
    // For top up transactions, show with plus sign
    return `+ ${formatted}`;
  };

  const formatBalance = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Function to determine if transaction is a payment (should be red) or top up (should be green)
  const isPaymentTransaction = (transaction) => {
    // If total_amount is negative, it's a payment (outgoing)
    if (transaction.total_amount < 0) {
      return true;
    }
    
    // Check transaction type or description to determine if it's a payment
    const description = transaction.description || transaction.transaction_type || '';
    const paymentKeywords = ['pulsa', 'listrik', 'pdam', 'bpjs', 'pajak', 'pembayaran', 'bayar'];
    
    return paymentKeywords.some(keyword => 
      description.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta'
    }) + ' WIB';
  };

  if (loading) {
    return (
      <TransactionContainer>
        <LoadingSpinner />
      </TransactionContainer>
    );
  }

  return (
    <TransactionContainer>
      <Header>
        <Logo>
          <LogoIcon>S</LogoIcon>
          <LogoText>SIMS PPOB</LogoText>
        </Logo>
        <Navigation>
          <NavLink onClick={() => navigate('/topup')}>Top Up</NavLink>
          <NavLink href="#transaction" className="active">Transaction</NavLink>
          <NavLink onClick={() => navigate('/profile')}>Akun</NavLink>
        </Navigation>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <UserSection>
        <UserInfo>
          {profile && (
            <>
              {profile.profile_image ? (
                <img 
                  src={profile.profile_image} 
                  alt="Profile" 
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '12px'
                  }}
                />
              ) : (
                <DefaultAvatar firstName={profile.first_name} lastName={profile.last_name} />
              )}
              <div style={{ color: '#6b7280', fontSize: '16px', marginBottom: '4px' }}>
                Selamat datang,
              </div>
              <div style={{ color: '#1f2937', fontSize: '20px', fontWeight: 'bold' }}>
                {profile.first_name} {profile.last_name}
              </div>
            </>
          )}
        </UserInfo>
        
        <BalanceSection>
          <BalanceCard>
            <BalanceCardBackground />
            <BalanceTitle>Saldo anda</BalanceTitle>
            <BalanceAmount>
              {isBalanceVisible ? formatBalance(balance?.balance || 0) : 'Rp ••••••••'}
            </BalanceAmount>
            <ViewBalanceLink onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
              <span>👁️</span>
              <span>{isBalanceVisible ? 'Tutup Saldo' : 'Lihat Saldo'}</span>
            </ViewBalanceLink>
          </BalanceCard>
        </BalanceSection>
      </UserSection>

      <TransactionSection>
        <SectionTitle>Semua Transaksi</SectionTitle>
        
        <MonthFilter>
          {months.map(month => (
            <MonthButton
              key={month}
              className={selectedMonth === month ? 'active' : ''}
              onClick={() => handleMonthChange(month)}
            >
              {month}
            </MonthButton>
          ))}
        </MonthFilter>

        {filteredTransactions.length === 0 ? (
          <EmptyState>
            {selectedMonth === 'Semua' 
              ? 'Maaf tidak ada histori transaksi saat ini'
              : `Maaf tidak ada histori transaksi untuk bulan ${selectedMonth}`
            }
          </EmptyState>
        ) : (
          <>
            <TransactionList>
              {filteredTransactions.map((transaction, index) => (
                <TransactionItem key={index}>
                  <TransactionLeft>
                    <TransactionAmount 
                      className={isPaymentTransaction(transaction) ? 'negative' : 'positive'}
                    >
                      {formatAmount(transaction.total_amount, isPaymentTransaction(transaction))}
                    </TransactionAmount>
                    <TransactionDate>
                      {formatDate(transaction.created_on)}
                    </TransactionDate>
                  </TransactionLeft>
                  <TransactionDescription>
                    {transaction.description || transaction.transaction_type}
                  </TransactionDescription>
                </TransactionItem>
              ))}
            </TransactionList>

            {hasMore && (
              <ShowMoreButton onClick={handleShowMore} disabled={loadingMore}>
                {loadingMore ? 'Loading...' : 'Show more'}
              </ShowMoreButton>
            )}
          </>
        )}
      </TransactionSection>
    </TransactionContainer>
  );
};

export default TransactionPage;
