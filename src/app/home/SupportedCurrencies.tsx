import { HeadingComponent, bgGradient } from '@/util/Ui';
import {
  Divider,
  HStack,
  Heading,
  Tag,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

export const SupportedCurrencies = () => {
  return (
    <VStack
      zIndex={111}
      py={[50, 75, 100]}
      bgColor={useColorModeValue('green.100', 'blackAlpha.900')}
      spacing={5}
      w="full"
    >
      <HeadingComponent
        heading="Supported by the"
        gradientHeading="BEST"
      ></HeadingComponent>
      <HStack spacing={[2, 5, 10]} p={[2, 5, 10]}>
        <Tag p={5} borderRadius="50px">
          <Image
            src="/chainIcons/bscSmartChainLogo.svg"
            alt="bsc logo"
            width={100}
            height={100}
          ></Image>
        </Tag>
        <Tag p={5} borderRadius="50px">
          <Image
            src="/chainIcons/polygonChainLogo.svg"
            alt="polygon logo"
            width={100}
            height={100}
          ></Image>
        </Tag>
        <Tag p={5} borderRadius="50px">
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
