'use client';
import {
  Container,
  HStack,
  Icon,
  Spacer,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Web3Button } from '@web3modal/react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
import { HamburgerIcon } from '@chakra-ui/icons';
import MenuButtonComponent from './MenuButtonComponent';

export const Nav = () => {
  const { scrollY } = useScroll();
  const [scrollYValue, setScrollYValue] = useState(0);
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrollYValue(latest);
  });

  const navBgColor = useColorModeValue('white', 'gray.900');

  return (
    <HStack
      w="full"
      py={[3, 5]}
      align="center"
      justify="center"
      borderBottomRadius={['20%', '20%', '20%', '30%', 'full']}
      bgColor={scrollYValue > 20 ? navBgColor : 'transparent'}
      position="fixed"
      top={0}
      zIndex={1111}
      backdropFilter="auto"
      backdropBlur={scrollYValue > 20 ? '20px' : 'none'}
      transition={'background-color 100ms linear'}
    >
      <Container maxW={1500}>
        <HStack w="full">
          <Logo></Logo>
          <Spacer />
          <Web3Button
            balance={useBreakpointValue(['hide', 'hide', 'show'])}
          ></Web3Button>
          <MenuButtonComponent />
          <ColorModeSwitcher />
        </HStack>
      </Container>
    </HStack>
  );
};
