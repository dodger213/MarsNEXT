import {
  Box,
  BoxProps,
  Center,
  HStack,
  Icon,
  IconButton,
  StackProps,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MotionProps, motion } from 'framer-motion';
import * as React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Button, ButtonProps, Flex } from '@chakra-ui/react';
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';

type AnimatedBoxProps = MotionProps & BoxProps & StackProps;

const MotionCenter = motion(Center);
const MotionIcon = motion(Icon);

export const ColorModeSwitcher: React.FC<AnimatedBoxProps> = () => {
  const { toggleColorMode, colorMode } = useColorMode();
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
      opacity={0.5}
      borderColor={useColorModeValue("gray.500", "white")}
      cursor="pointer"
      layout
      _hover={{
        opacity: 1,
      }}
    >
      <MotionCenter
        boxSize={5}
        bgColor={useColorModeValue("gray.200", "white")}
        borderRadius="full"
        cursor="pointer"
        layout
        transition={{
          type: 'spring',
          stiffness: 700,
          duration: 1,
        }}
      >
        <Icon as={colorMode === "dark" ? BsMoonStarsFill : BsSun} boxSize={3} color="black"></Icon>
      </MotionCenter>
    </HStack>
  );
};
