import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import BannerCard from '../../atoms/BannerCard/BannerCard';

const BannerSliderContainer = styled.div`
  margin-top: 32px;

  @media (max-width: 768px) {
    margin-top: 24px;
  }

  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

const BannerTitle = styled.h3`
  color: #1f2937;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 12px;
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 16px;

  @media (max-width: 768px) {
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    border-radius: 8px;
  }
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(${props => props.translateX}px);
`;

const BannerSlide = styled.div`
  min-width: 320px;
  min-height: 200px;
  margin-right: 12px;

  @media (max-width: 768px) {
    min-width: 280px;
    min-height: 180px;
    margin-right: 10px;
  }

  @media (max-width: 480px) {
    min-width: 240px;
    min-height: 160px;
    margin-right: 8px;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(NavigationButton)`
  left: 16px;
`;

const NextButton = styled(NavigationButton)`
  right: 16px;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#dc2626' : '#d1d5db'};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.active ? '#b91c1c' : '#9ca3af'};
  }
`;

const BannerSlider = ({ banners = [], onBannerClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    if (currentIndex < 2) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + 3) % 3);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, nextSlide, banners.length]);

  if (!banners || banners.length === 0) {
    return (
      <BannerSliderContainer>
        <BannerTitle>Temukan promo menarik</BannerTitle>
        <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>
          Tidak ada banner tersedia
        </div>
      </BannerSliderContainer>
    );
  }

  return (
    <BannerSliderContainer>
      <BannerTitle>Temukan promo menarik</BannerTitle>
      <SliderWrapper>
        {banners.length > 1 && (
          <>
            <PrevButton onClick={prevSlide}>
              ‹
            </PrevButton>
            <NextButton onClick={nextSlide}>
              ›
            </NextButton>
          </>
        )}
        <SliderTrack translateX={-currentIndex * (window.innerWidth <= 480 ? 248 : window.innerWidth <= 768 ? 290 : 336)}>
          {banners.map((banner, index) => (
            <BannerSlide key={index}>
              <BannerCard
                banner={banner}
                onClick={() => onBannerClick && onBannerClick(banner)}
              />
            </BannerSlide>
          ))}
        </SliderTrack>
      </SliderWrapper>
      {banners.length > 1 && (
        <DotsContainer>
          {banners.slice(0, 3).map((_, index) => (
            <Dot
              key={index}
              active={index === currentIndex}
              onClick={() => goToSlide(index)}
            />
          ))}
        </DotsContainer>
      )}
    </BannerSliderContainer>
  );
};

export default BannerSlider;
