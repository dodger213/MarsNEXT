import Particles from '@/components/Particles';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import React, { Suspense, useState } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { SpaceModel } from './AstronautModel';
import { SupportedChainComponent } from './SupportedChainComponent';

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
      bgGradient={useColorModeValue(
        'linear(to-r, green.50, pink.500)',
        'linear(to-r, blackAlpha.900, blue.900, blackAlpha.900)'
      )}
      zIndex={1}
      onMouseMove={handleMouseMove}
      overflow="hidden"
      direction="column"
    >
      <VStack w="full" h="140vh" spacing={0}>
        <Particles quantity={200}></Particles>
        <VStack
          w="full"
          justify={['flex-start', 'flex-start', 'flex-start', 'center']}
          pt={[150, 175, 150, 0]}
          h="100vh"
        >
          <VStack w="full" maxW={1500} align="flex-start" px={[2, 5, 10]}>
            <VStack align={['center', 'flex-start']} spacing={5}>
              <VStack w={['full', 'min-content']} minW={300} zIndex={0}>
                <HStack
                  bgGradient={'linear(to-r, red.500, yellow.500, green.500)'}
                  bgClip="text"
                  fontSize={['4xl', '5xl', '7xl', '9xl']}
                  textAlign="left"
                >
                  <Text fontWeight={900} lineHeight={1} w="max-content">
                    MARS
                  </Text>
                  <Text fontWeight={400} lineHeight={1} w="max-content">
                    NEXT
                  </Text>
                </HStack>
                <Text
                  fontWeight={[300, 500, 700, 900]}
                  fontSize={['xl', '2xl', '3xl']}
                  textAlign={['center', 'left']}
                >
                  A reward centric decentralized protocol only made for
                  community.
                </Text>
              </VStack>
              <Button
                w={300}
                h={14}
                colorScheme="orange"
                bg="orange.500"
                _hover={{
                  bg: 'orange.600',
                }}
                borderRadius="xl"
                rightIcon={<ChevronRightIcon />}
                zIndex={111}
              >
                Register Now
              </Button>
            </VStack>
          </VStack>
        </VStack>
        <Suspense>
          <Center w="full" position="absolute" h="200vh">
            <Canvas>
              <ambientLight intensity={useColorModeValue(7, 5)} />
              <motion.pointLight
                position={[5, 5, 5]}
                intensity={useColorModeValue(0.1, 1)}
              />
              <SpaceModel mousePosition={mousePosition}></SpaceModel>
              {/* <OrbitControls enableZoom={false}></OrbitControls> */}
            </Canvas>
          </Center>
        </Suspense>
      </VStack>
      <SupportedChainComponent />
    </VStack>
  );
};
