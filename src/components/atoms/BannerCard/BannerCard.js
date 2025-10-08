import React from 'react';
import styled from 'styled-components';

const BannerCardContainer = styled.div`
  width: 320px;
  height: 200px;
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const BannerImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: center;
`;

const BannerCard = ({ banner, onClick }) => {
  const { banner_image, alt } = banner;
  
  const handleImageError = (e) => {
    // Fallback jika gambar gagal dimuat
    e.target.style.display = 'none';
  };
  
  return (
    <BannerCardContainer onClick={onClick}>
      <BannerImage 
        src={banner_image} 
        alt={alt || 'Banner'}
        onError={handleImageError}
      />
    </BannerCardContainer>
  );
};

export default BannerCard;
