import React from 'react';
import styled from 'styled-components';
import defaultProfileImage from '../../../assets/images/profilePhoto.png';

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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


const WelcomeText = styled.div`
  color: #6b7280;
  font-size: 16px;
  text-align: left;
`;

const UserName = styled.div`
  color: #1f2937;
  font-size: 20px;
  font-weight: 700;
  text-align: left;
`;

const Avatar = ({ profile }) => {
  const { first_name = "", last_name = "", profile_image = "" } = profile || {};

  const fullName = `${first_name} ${last_name}`.trim() || "User";

  const handleImageError = (e) => {
    e.target.src = defaultProfileImage;
  };

  const displayImage = profile_image && profile_image.trim() !== '' ? profile_image : defaultProfileImage;

  return (
    <AvatarContainer>
      <AvatarImageContainer>
        <ProfileImage
          src={displayImage}
          alt={fullName}
          onError={handleImageError}
        />
      </AvatarImageContainer>
      <WelcomeText>Selamat datang,</WelcomeText>
      <UserName>{fullName}</UserName>
    </AvatarContainer>
  );
};

export default Avatar;
