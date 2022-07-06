import { useRef, useState } from 'react';
import styled from 'styled-components';
import data from '@/data/data.json';

const Home = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const maxImgSlideLength = 10;
  const images = data.map((movie) => movie.poster).splice(0, 10);
  const imgContainerRef = useRef(null);

  const handleSlide = (currentIdx: number) => {
    if (currentIdx === maxImgSlideLength) {
      currentIdx = 0;
    }
    if (currentIdx < 0) {
      currentIdx = images.length - 1;
    }
    setCurrentIdx(currentIdx);
  };

  const onClickSwipe = (direction: number) => {
    handleSlide(currentIdx + direction);
  };

  return (
    <ImageWrapper>
      <div>
        <button onClick={() => onClickSwipe(-1)}>이전</button>
        <button onClick={() => onClickSwipe(1)}>다음</button>
      </div>
      <ImageContainer ref={imgContainerRef}>
        {images.map((src) => {
          return (
            <ImgeBox key={src}>
              <Image src={src} />
            </ImgeBox>
          );
        })}
      </ImageContainer>
    </ImageWrapper>
  );
};

export default Home;

const ImageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: flex;
  overflow-x: hidden;
`;
const ImgeBox = styled.div`
  &:not(:first-child) {
    margin-left: 10px;
  }
`;
const Image = styled.img`
  width: 200px;
  height: 300px;
  cursor: pointer;
`;
