import React from 'react';
import styled from 'styled-components';

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const AvatarImageContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const InitialsFallback = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  font-size: 32px;
  color: white;
  font-weight: bold;
`;

const WelcomeText = styled.div`
  color: #6b7280;
  font-size: 16px;
  text-align: center;
`;

const UserName = styled.div`
  color: #1f2937;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;

const Avatar = ({ profile }) => {
  const { first_name = "", last_name = "", profile_image = "" } = profile || {};
  
  // Gabungkan first_name dan last_name
  const fullName = `${first_name} ${last_name}`.trim() || "User";
  
  // Generate initials dari first_name dan last_name
  const initials = `${first_name[0] || ''}${last_name[0] || ''}`.toUpperCase() || "U";
  
  const handleImageError = (e) => {
    // Fallback jika gambar gagal dimuat
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };
  
  const handleImageLoad = (e) => {
    // Sembunyikan fallback jika gambar berhasil dimuat
    e.target.nextSibling.style.display = 'none';
  };
  
  return (
    <AvatarContainer>
      <AvatarImageContainer>
        {profile_image && (
          <>
            <ProfileImage 
              src={profile_image} 
              alt={fullName}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            <InitialsFallback>
              {initials}
            </InitialsFallback>
          </>
        )}
        {!profile_image && (
          <InitialsFallback>
            {initials}
          </InitialsFallback>
        )}
      </AvatarImageContainer>
      <WelcomeText>Selamat datang,</WelcomeText>
      <UserName>{fullName}</UserName>
    </AvatarContainer>
  );
};

export default Avatar;
