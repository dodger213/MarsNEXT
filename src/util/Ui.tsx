import { Text, VStack, useColorModeValue } from '@chakra-ui/react';

export const bgGradient = {
  heading: 'linear(to-r, red.500, yellow.500, green.500)',
};

export const HeadingComponent = ({heading, gradientHeading}: {heading: string, gradientHeading: string}) => {
  return (
    <VStack
      fontSize={['2xl', '3xl', '4xl', '5xl']}
      fontWeight={900}
      lineHeight={1}
    >
      <Text textAlign="center">{heading}</Text>
      <Text
        fontSize={['4xl', '5xl', '6xl', '7xl']}
        bgGradient={`linear(to-r, red.500, yellow.500, green.500)`}
        bgClip="text"
      >
        {gradientHeading}
      </Text>
    </VStack>
  );
};
