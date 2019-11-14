import React from 'react';
import styled from '@emotion/styled';

import helsinkiImage from './images/huvilakatu.jpg';

const Container = styled.a`
  position: relative;
  max-width: 990px;
  margin: auto;
  display: grid;
  place-content: center;
  background: 
  linear-gradient(
          rgba(0, 0, 0, 0.5), 
          rgba(0, 0, 0, 0.5)
        ),
  url('${p => p.bgSrc}');
  background-position: center;
  background-size: cover;
  height: 300px;
  padding: '6rem 4rem';
  cursor: pointer;

  @media (min-width: 991px) {
    border-radius: 1rem;
  }
  
`;

const InnerDiv = styled.div`
  font-weight: bolder;
  color: white;
  padding: 2rem;
`;

const SectionFullWidthCta = () => {
  return (
    <Container
      bgSrc={helsinkiImage}
      href="/s?address=Helsinki%2C%20Finland&bounds=60.3101563%2C25.01165441%2C60.11100041%2C24.77584986&mapSearch=true"
    >
      <InnerDiv>
        <p style={{ fontWeight: 'bold', fontSize: '30px', marginBottom: '20px' }}>browse</p>
        <p style={{ fontSize: '60px', lineHeight: '60px' }}>bunks in Helsinki</p>
      </InnerDiv>
    </Container>
  );
};

export default SectionFullWidthCta;
