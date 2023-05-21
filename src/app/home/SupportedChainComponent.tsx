import { bgGradient } from '@/util/Ui';
import {
  Divider,
  HStack,
  Heading,
  Tag,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

export const SupportedChainComponent = () => {
  return (
    <VStack
      zIndex={111}
      py={[50, 75, 100]}
      bgGradient={`linear(to-t, ${useColorModeValue(
        'green.100',
        'blackAlpha.900'
      )}, transparent)`}
      spacing={5}
      w="full"
    >
      <VStack>
        <Heading size="2xl" bgGradient={bgGradient?.heading} bgClip="text">
          We are on
        </Heading>
        <Divider />
      </VStack>
      <HStack spacing={[2, 5, 10]} p={[2, 5, 10]}>
        <Tag p={5} borderRadius="3xl">
          <Image
            src="/chainIcons/bscSmartChainLogo.svg"
            alt="bsc logo"
            width={100}
            height={100}
          ></Image>
        </Tag>
        <Tag p={5} borderRadius="3xl">
          <Image
            src="/chainIcons/polygonChainLogo.svg"
            alt="polygon logo"
            width={100}
            height={100}
          ></Image>
        </Tag>
        <Tag p={5} borderRadius="3xl">
          <Image
            src="/chainIcons/ethereumChainLogo.svg"
            alt="ethereum logo"
            width={100}
            height={100}
          ></Image>
        </Tag>
      </HStack>
    </VStack>
  );
};
