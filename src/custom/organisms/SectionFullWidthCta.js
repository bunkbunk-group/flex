import React, { useState } from 'react';
import styled from '@emotion/styled';

import helsinkiImage from './images/huvilakatu.jpg';

const Container = styled.a`
  position: relative;
  max-width: 1135px;
  margin: auto;
  display: grid;
  place-content: center;
  background-position: center;
  background-size: cover;
  cursor: pointer;

  @media (min-width: 991px) {
    border-radius: 1rem;
  }
`;

const InnerDiv = styled.a`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  font-weight: bolder;
  color: white;
  display: grid;
  align-content: center;
  padding-left: 6rem;
`;

const Image = styled.img`
  filter: brightness(80%);
  border-radius: 0.3rem;

  &:hover {
    filter: brightness(50%);
  }
`;

const SectionFullWidthCta = () => {
  const [hover, setHover] = useState(false);
  return (
    <Container
      href="/s?address=Helsinki%2C%20Finland&bounds=60.3101563%2C25.01165441%2C60.11100041%2C24.77584986&mapSearch=true"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ padding: '0 2rem' }}>
        <Image
          src={helsinkiImage}
          alt="Landing page CTA"
          width="100%"
          style={{
            transitionDuration: '0.3s',
            borderRadius: '0.3rem',
            filter: hover ? 'brightness(50%)' : 'brightness(80%)',
          }}
        />
        <InnerDiv>
          <p style={{ fontWeight: 'bold', fontSize: '30px', marginBottom: '20px' }}>browse</p>
          <p style={{ fontSize: '70px', fontWeight: 'bolder', lineHeight: '60px' }}>
            bunks in Helsinki
          </p>
        </InnerDiv>
      </div>
    </Container>
  );
};

export default SectionFullWidthCta;
