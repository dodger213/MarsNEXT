import {
  Box,
  BoxProps,
  HStack,
  StackProps,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { MotionProps, motion } from 'framer-motion';
import * as React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

type AnimatedBoxProps = MotionProps & BoxProps & StackProps;

const MotionBox = motion(Box);

export const ColorModeSwitcher: React.FC<AnimatedBoxProps> = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <HStack
      w={10}
      p={1}
      borderWidth="thin"
      borderRadius="full"
      justify={useColorModeValue('flex-start', 'flex-end')}
      onClick={toggleColorMode}
      as={motion.div}
      layout
    >
      <MotionBox
        boxSize={5}
        bgColor={useColorModeValue('blue.400', 'gray.700')}
        borderRadius="full"
        cursor="pointer"
        layout
        transition={{
          type: 'spring',
          stiffness: 700,
          duration: 1,
        }}
      ></MotionBox>
    </HStack>
  );
};
