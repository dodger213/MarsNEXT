import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const Heading = () => {
  return (
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
        A reward centric decentralized protocol only made for community.
      </Text>
    </VStack>
  );
};
