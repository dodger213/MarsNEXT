'use client';
import {
  Container,
  HStack,
  Spacer,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Web3Button } from '@web3modal/react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';

export const Nav = () => {
  const { scrollY } = useScroll();
  const [scrollYValue, setScrollYValue] = useState(0);
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrollYValue(latest);
  });

  return (
    <HStack
      w="full"
      py={[3, 5]}
      align="center"
      justify="center"
      borderBottomRadius={['20%', '20%', '20%', '30%', 'full']}
      bgColor={scrollYValue > 20 ? 'transparent' : 'transparent'}
      position="fixed"
      top={0}
      zIndex={1111}
      backdropFilter="auto"
      backdropBlur={scrollYValue > 20 ? '20px' : 'none'}
    >
      <Container maxW={1500}>
        <HStack w="full">
          <Logo></Logo>
          <Spacer />
          <Web3Button
            balance={useBreakpointValue(['hide', 'hide', 'show'])}
          ></Web3Button>
          <ColorModeSwitcher />
        </HStack>
      </Container>
    </HStack>
  );
};
