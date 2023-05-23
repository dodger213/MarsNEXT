import { tagLine } from '@/constants/SupportedNetworkInfo';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const HeaderHeadingComponent = () => {
  return (
    <VStack align={['center', 'flex-start']} spacing={5}>
      <VStack w={['full', 'min-content']} minW={300} zIndex={0}>
        <HStack
          bgGradient={'linear(to-r, red.500, yellow.500, green.500)'}
          bgClip="text"
          fontSize={['5xl', '5xl', '7xl', '9xl']}
          textAlign="left"
          spacing={0}
        >
          <Text fontWeight={900} lineHeight={1} w="max-content">
            Mars
          </Text>
          <Text fontWeight={400} lineHeight={1} w="max-content">
            Next
          </Text>
        </HStack>
        <Text
          fontWeight={[500]}
          fontSize={['2xl', '3xl']}
          textAlign={['center', 'left']}
          px={5}
        >
          {tagLine}
        </Text>
      </VStack>
      <Button
        w={[250, 300, 400]}
       
        h={16}
        colorScheme="orange"
        bg="orange.500"
        _hover={{
          bg: 'orange.600',
        }}
        borderRadius={20}
        rightIcon={<ChevronRightIcon />}
        zIndex={111}
        borderBottomWidth="thick"
      >
        Launch App
      </Button>
    </VStack>
  );
};
