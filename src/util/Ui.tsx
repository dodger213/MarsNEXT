import {
  Center,
  CenterProps,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const MotionCenter = motion(Center)

export const bgGradient = {
  heading: 'linear(to-r, red.500, yellow.500, green.500)',
};

export const HeadingComponent = ({
  heading,
  gradientHeading,
}: {
  heading: string;
  gradientHeading: string;
}) => {
  return (
    <VStack
      fontSize={['2xl', '3xl', '4xl', '5xl']}
      fontWeight={900}
      lineHeight={1}
    >
      <Text textAlign="center" color="twitter.400">
        {heading}
      </Text>
      <Text
        fontSize={['4xl', '5xl', '6xl', '7xl']}
        bgGradient={`linear(to-r, red.400, yellow.500, green.400)`}
        bgClip="text"
      >
        {gradientHeading}
      </Text>
    </VStack>
  );
};

export const CenterComponent = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CenterProps;
}) => {
  return (
    <Center
      p={5}
      borderRadius="50px"
      borderWidth={1}
      borderBottomWidth="thick"
      backdropFilter="blur(10px)"
      bgColor={useColorModeValue('white', 'whiteAlpha.200')}
      _hover={{
        borderColor: "pink"
      }}
      transition="border-color 0.5s"
     
      {...style}
    >
      {children}
    </Center>
  );
};
