import React from 'react';
import styled from 'styled-components';

const DefaultAvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #f3f4f6;
  position: relative;
  overflow: hidden;
`;

const AvatarCharacter = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: white;
  font-weight: bold;
`;

// SVG untuk karakter default (seperti di gambar)
const DefaultAvatarSVG = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    {/* Head */}
    <circle cx="40" cy="30" r="18" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
    
    {/* Hair */}
    <path d="M22 25 Q40 15 58 25 Q55 20 40 12 Q25 20 22 25" fill="#8b4513"/>
    
    {/* Glasses */}
    <circle cx="32" cy="28" r="6" fill="none" stroke="#4a5568" strokeWidth="2"/>
    <circle cx="48" cy="28" r="6" fill="none" stroke="#4a5568" strokeWidth="2"/>
    <line x1="38" y1="28" x2="42" y2="28" stroke="#4a5568" strokeWidth="2"/>
    
    {/* Eyes */}
    <circle cx="32" cy="28" r="2" fill="#1f2937"/>
    <circle cx="48" cy="28" r="2" fill="#1f2937"/>
    
    {/* Nose */}
    <ellipse cx="40" cy="32" rx="2" ry="3" fill="#f59e0b"/>
    
    {/* Mouth */}
    <path d="M35 38 Q40 42 45 38" stroke="#1f2937" strokeWidth="2" fill="none"/>
    
    {/* Body */}
    <rect x="30" y="48" width="20" height="25" rx="10" fill="#e5e7eb"/>
    
    {/* Shirt collar */}
    <path d="M35 48 L40 53 L45 48" fill="#f3f4f6"/>
  </svg>
);

const DefaultAvatar = ({ firstName, lastName }) => {
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'U';
  
  return (
    <DefaultAvatarContainer>
      <DefaultAvatarSVG />
    </DefaultAvatarContainer>
  );
};

export default DefaultAvatar;
