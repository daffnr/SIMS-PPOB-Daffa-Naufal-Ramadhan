import React from 'react';
import styled from 'styled-components';
import defaultProfileImage from '../../../assets/images/profilePhoto.png';

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
    // Fallback ke default image jika gambar gagal dimuat
    e.target.src = defaultProfileImage;
  };
  
  const handleImageLoad = (e) => {
    // Gambar berhasil dimuat, tidak perlu melakukan apa-apa
  };
  
  // Tentukan gambar yang akan ditampilkan
  const displayImage = profile_image && profile_image.trim() !== '' ? profile_image : defaultProfileImage;
  
  return (
    <AvatarContainer>
      <AvatarImageContainer>
        <ProfileImage 
          src={displayImage} 
          alt={fullName}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      </AvatarImageContainer>
      <WelcomeText>Selamat datang,</WelcomeText>
      <UserName>{fullName}</UserName>
    </AvatarContainer>
  );
};

export default Avatar;
