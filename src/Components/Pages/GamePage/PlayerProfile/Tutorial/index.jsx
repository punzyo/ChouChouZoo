import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import { tutorialContent } from './tutorialContent';
const Mask = styled.div`
  position: fixed;
  top: 0px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: auto;
`;
const Wrapper = styled.div`
  position: relative;
  cursor: auto;
  width: 520px;
  height: 450px;
  background-color: #faf4e1;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .slick-slide {
    > div {
      height: 420px;
    }
  }
  .slick-slider {
    width: 80%;
    height: 90%;
    color: black;
    .slick-slide > div {
      padding: 0 10px;
    }
    h2 {
      font-size: 36px;
      text-align: center;
      margin-bottom: 30px;
    }
  }

  img,
  video {
    width: 100%;
    height: 230px;
    border-radius: 20px;
    margin-bottom: 20px;
    object-fit: contain;
  }
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
  .slick-next,
  .slick-prev {
    transform: scale(1.5);
  }
  .slick-next {
    right: -35px;
  }
  .slick-prev {
    left: -35px;
  }
`;
const CategoryWrapper = styled.div`
  position: absolute;
  display: flex;
  top: -30px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 97%;
  height: 30px;
  z-index: -1;
  margin-left: 10px;
`;
const Category = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  color: black;
  width: 33.3%;
  border-radius: 20px;
  height: 30px;
  background-color: ${(props) => (props.$isSelected ? '#f1d67e' : '#eee3bf')};
  border: ${(props) => (props.$isSelected ? '1px' : '1px')} solid
    rgba(0, 0, 0, 0.4);

  border-bottom: none;
  border-radius: 15px 15px 0 0;
  z-index: ${(props) => (props.$isSelected ? '5' : props.$last ? '-1' : '0')};
  margin-left: -5px;
  &:hover {
    background-color: ${(props) => (props.$isSelected ? '' : '#edda9c')};
  }
`;
const Title = styled.h2`
  width: 100%;
  padding: 0 20px;
`;


export default function Tutorial({setShowTutorial}) {
  const BASIC = 'basic';
  const COMMUNICATION = 'communication';
  const PERMISSION = 'permission';
  const categories = [
    { name: '基本教學', id: BASIC },
    { name: '多人通訊', id: COMMUNICATION },
    { name: '權限功能', id: PERMISSION },
  ];
  const [category, setCategory] = useState(BASIC);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const currentContent = tutorialContent[category];
  return (
    <Mask
      onClick={(e) => {
        e.stopPropagation();
        setShowTutorial(false)
      }}
    >
      <Wrapper  onClick={(e) => {
        e.stopPropagation();
      }}>
        <CategoryWrapper>
          {categories.map((cat, index) => (
            <Category
              key={cat.id}
              $isSelected={category === cat.id}
              onClick={() => setCategory(cat.id)}
              $last={index === categories.length - 1}
            >
              {cat.name}
            </Category>
          ))}
        </CategoryWrapper>
        <Slider {...settings} key={category}>
          {currentContent.map((item, index) => (
            <div key={index}>
              <Title>{item.title}</Title>
              {item.mediaType === 'video' ? (
                <video src={`/tutorial/${category}/${category}_${index}.mp4`} autoPlay loop />
              ) : (
                <img
                  src={`/tutorial/${category}/${category}_${index}.png`}
                  alt={item.title}
                />
              )}
              <p>{item.content}</p>
            </div>
          ))}
        </Slider>
      </Wrapper>
    </Mask>
  );
}