import Particles from '@/components/Particles';
import {
  Center,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import React, { Suspense, useState } from 'react';
import { SpaceModel } from './AstronautModel';
import { HeaderHeadingComponent } from './HeaderHeadingComponent/HeaderHeadingComponent';
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
            <HeaderHeadingComponent />
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
