import React from 'react';
import styled from 'styled-components';

const BannerCardContainer = styled.div`
  background: ${props => props.bgColor || '#f3f4f6'};
  border-radius: 16px;
  padding: 24px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BannerImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%);
  z-index: 2;
`;

const BannerContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 3;
`;

const BannerTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const BannerDescription = styled.div`
  font-size: 14px;
  line-height: 1.4;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

const BannerLogo = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 12px;
  font-weight: 600;
  opacity: 0.8;
  z-index: 3;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
`;

const BannerCard = ({ banner, onClick }) => {
  const { banner_name, banner_image, description } = banner;
  
  const handleImageError = (e) => {
    // Fallback jika gambar gagal dimuat
    e.target.style.display = 'none';
  };
  
  return (
    <BannerCardContainer onClick={onClick}>
      <BannerImage 
        src={banner_image} 
        alt={banner_name}
        onError={handleImageError}
      />
      <BannerOverlay />
      <BannerLogo>SIMS PPOB</BannerLogo>
      <BannerContent>
        <BannerTitle>{banner_name}</BannerTitle>
        <BannerDescription>{description}</BannerDescription>
      </BannerContent>
    </BannerCardContainer>
  );
};

export default BannerCard;
