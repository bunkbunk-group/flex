import React, { useState } from 'react';
// import styled from '@emotion/styled';

import helsinkiImage from './images/huvilakatu.jpg';

const SectionFullWidthCta = () => {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="/s?address=Helsinki%2C%20Finland&bounds=60.3101563%2C25.01165441%2C60.11100041%2C24.77584986&mapSearch=true"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        maxWidth: '1135px',
        margin: 'auto',
        display: 'grid',
        placeContent: 'center',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        cursor: 'pointer',
      }}
    >
      <div style={{ padding: '0 2rem', position: 'relative' }}>
        <img
          src={helsinkiImage}
          alt="Landing page CTA"
          width="100%"
          style={{
            transitionDuration: '0.3s',
            borderRadius: '0.3rem',
            filter: hover ? 'brightness(50%)' : 'brightness(80%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            fontWeight: 'bolder',
            color: 'white',
            display: 'grid',
            alignContent: 'center',
            paddingLeft: '6rem',
          }}
        >
          <p style={{ fontWeight: 'bold', fontSize: '30px', marginBottom: '20px' }}>browse</p>
          <p style={{ fontSize: '70px', fontWeight: 'bolder', lineHeight: '60px' }}>
            bunks in Helsinki
          </p>
        </div>
      </div>
    </a>
  );
};

export default SectionFullWidthCta;
