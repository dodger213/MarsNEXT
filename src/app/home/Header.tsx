import Particles from '@/components/Particles';
import { Center, VStack, useColorModeValue } from '@chakra-ui/react';
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
      <VStack w="full" spacing={0} h="140vh">
        <Particles quantity={200}></Particles>
        <VStack w="full" px={[2, 5, 10]} pt={150}>
            <HeaderHeadingComponent />
        </VStack>
        <Suspense>
          <Center w="full" h="200vh" position="absolute">
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
