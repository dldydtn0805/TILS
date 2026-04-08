// src/components/common/Footer/Footer.tsx
import React from 'react';
import { FooterContainer, Text } from './Footer.styles';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Text>
        &copy; {new Date().getFullYear()} My App. All rights reserved.
      </Text>
      <Text>Contact: example@example.com</Text>
    </FooterContainer>
  );
};

export default Footer;
