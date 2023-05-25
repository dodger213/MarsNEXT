'use client';
import { Container, HStack, Spacer, useColorModeValue } from '@chakra-ui/react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { ConnectWalletButton } from '../ConnectWalletButton';
import { Logo } from '../Logo';
import MenuButtonComponent from './MenuButtonComponent';
import { Web3Button } from '@web3modal/react';

export const Nav = () => {
  const { scrollY } = useScroll();
  const [scrollYValue, setScrollYValue] = useState(0);
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrollYValue(latest);
  });

  const navBgColor = useColorModeValue('transparent', 'transparent');

  return (
    <HStack
      w="full"
      align="center"
      justify="center"
      borderBottomRadius="3xl"
      bgColor={scrollYValue > 20 ? navBgColor : 'transparent'}
      position="fixed"
      top={0}
      zIndex={1111}
      backdropFilter="auto"
      backdropBlur={scrollYValue > 20 ? '20px' : 'none'}
      transition={'background-color 300ms linear'}
      px={[1, 2, 3, 5]}
      py={5}
      // borderBottomWidth={scrollYValue > 20 ? 'thick' : 'none'}
    >
      <HStack w="full" px={5}>
        <Logo></Logo>
        <Spacer />
        <ConnectWalletButton></ConnectWalletButton>
        <MenuButtonComponent />
      </HStack>
    </HStack>
  );
};
