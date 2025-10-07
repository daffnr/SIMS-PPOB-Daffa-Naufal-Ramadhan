import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import TransactionPage from './pages/TransactionPage';
import TopUpPage from './pages/TopUpPage';

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  
  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <HomePage /> : <LoginPage />} 
        />
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/home" replace /> : <LoginPage />} 
        />
        <Route 
          path="/register" 
          element={isLoggedIn ? <Navigate to="/home" replace /> : <RegisterPage />} 
        />
        <Route 
          path="/home" 
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/profile" 
          element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/transaction" 
          element={isLoggedIn ? <TransactionPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/topup" 
          element={isLoggedIn ? <TopUpPage /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </div>
  );
}

export default App;
