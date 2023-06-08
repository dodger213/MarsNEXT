import Particles from '@/components/Particles';
import {
  Center,
  Flex,
  Image,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import React, { Suspense, useState } from 'react';
import { SpaceModel } from './AstronautModel';
import { HeaderHeadingComponent } from './HeaderHeadingComponent/HeaderHeadingComponent';
import { SupportedChainComponent } from './SupportedChainComponent';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

export const Header = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = -(clientY / innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };
  return (
    <VStack
      w="full"
      zIndex={1}
      onMouseMove={handleMouseMove}
      overflow="hidden"
      direction="column"
      bgGradient={useColorModeValue(
        'linear(to-b, white, blue.100, transparent)',
        'linear(to-b, transparent, blue.900, transparent)'
      )}
    >
      <VStack w="full" spacing={70}>
        <Particles quantity={200}></Particles>
        <ParallaxProvider>
          <Parallax speed={-30}>
            <VStack w="full" px={[2, 5, 10]} minH="40vh">
              <HeaderHeadingComponent />
            </VStack>
          </Parallax>
        </ParallaxProvider>
        <Flex flex={1}></Flex>
        <Image
          src="/header2.svg"
          alt="Header image"
          width="100%"
          minW={800}
          maxW={1200}
          zIndex={1}
        ></Image>
      </VStack>
    </VStack>
  );
};
