import { BUSDLogoSVG, USDTLogoSVG } from '@/assets';
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

export const SupportedChainComponent = () => {
  return (
    <VStack
      zIndex={111}
      py={[50, 75, 100]}
      bgGradient={`linear(to-t, ${useColorModeValue(
        'white',
        'blackAlpha.900'
      )}, transparent)`}
      spacing={5}
      w="full"
    >
      <HeadingComponent
        heading="Supported by the"
        gradientHeading="BEST"
      ></HeadingComponent>
      <HStack spacing={[2, 5, 10]} p={[2, 5, 10]}>
        <Tag p={5} borderRadius="50px" borderBottomWidth="thick">
          <Image
            src="/chainIcons/bscSmartChainLogo.svg"
            alt="bsc logo"
            width={100}
            height={100}
          ></Image>
        </Tag>
        <Tag p={5} borderRadius="50px" borderBottomWidth="thick">
          <Image
            src="/chainIcons/polygonChainLogo.svg"
            alt="polygon logo"
            width={100}
            height={100}
          ></Image>
        </Tag>
        <Tag p={5} borderRadius="50px" borderBottomWidth="thick">
          <Image
            src="/chainIcons/ethereumChainLogo.svg"
            alt="ethereum logo"
            width={100}
            height={100}
          ></Image>
        </Tag>
      </HStack>
      <HeadingComponent
        heading="Supported"
        gradientHeading="CURRENCIES"
      ></HeadingComponent>
      <HStack spacing={[2, 5, 10]} p={[2, 5, 10]}>
        <Tag p={5} borderRadius="50px" borderBottomWidth="thick">
          <Image
            src={USDTLogoSVG}
            alt="bsc logo"
            width={85}
            height={85}
          ></Image>
        </Tag>
        <Tag p={5} borderRadius="50px" borderBottomWidth="thick">
          <Image
            src={BUSDLogoSVG}
            alt="polygon logo"
            width={75}
            height={75}
          ></Image>
        </Tag>
        {/* <Tag p={5} borderRadius="50px">
          <Image
            src="/chainIcons/ethereumChainLogo.svg"
            alt="ethereum logo"
            width={100}
            height={100}
          ></Image>
        </Tag> */}
      </HStack>
    </VStack>
  );
};
