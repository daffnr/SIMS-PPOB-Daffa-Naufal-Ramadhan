import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthWrapper from './components/AuthWrapper/AuthWrapper';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import TransactionPage from './pages/TransactionPage';
import TopUpPage from './pages/TopUpPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  const { isLoggedIn, user, tokenValidated } = useSelector((state) => state.auth);
  
  // Additional check to ensure user data exists and token is validated
  const isAuthenticated = isLoggedIn && user && user.token && tokenValidated;
  
  return (
    <AuthWrapper>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />} 
          />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/home" replace /> : <RegisterPage />} 
          />
          <Route 
            path="/home" 
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/transaction" 
            element={isAuthenticated ? <TransactionPage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/topup" 
            element={isAuthenticated ? <TopUpPage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/payment" 
            element={isAuthenticated ? <PaymentPage /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </div>
    </AuthWrapper>
  );
}

export default App;
