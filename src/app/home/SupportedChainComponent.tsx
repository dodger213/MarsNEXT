import { BUSDLogoSVG, USDTLogoSVG } from '@/assets';
import { HeadingComponent } from '@/util/Ui';
import {
  HStack,
  Tag,
  VStack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';

export const SupportedChainComponent = () => {
  return (
    <VStack
      zIndex={111}
      py={[50, 75, 100]}
      bgGradient={`linear(to-t, ${useColorModeValue(
        'transparent',
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
        <Tag
          p={5}
          borderRadius="50px"
          borderBottomWidth="thick"
          backdropFilter="blur(10px) "
        >
          <Image
            src="/chainIcons/bscSmartChainLogo.svg"
            alt="bsc logo"
            width={100}
            height={100}
          ></Image>
        </Tag>
        <Tag
          p={5}
          borderRadius="50px"
          borderBottomWidth="thick"
          backdropFilter="blur(10px) "
        >
          <Image
            src="/chainIcons/polygonChainLogo.svg"
            alt="polygon logo"
            width={100}
            height={100}
          ></Image>
        </Tag>
        <Tag
          p={5}
          borderRadius="50px"
          borderBottomWidth="thick"
          backdropFilter="blur(10px) "
        >
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
        <Tag
          p={5}
          borderRadius="50px"
          borderBottomWidth="thick"
          backdropFilter="blur(10px) "
        >
          <Image
            src={USDTLogoSVG}
            alt="bsc logo"
            width={useBreakpointValue([70, 85])}
            height={useBreakpointValue([70, 85])}
          ></Image>
        </Tag>
        <Tag
          p={5}
          borderRadius="50px"
          borderBottomWidth="thick"
          backdropFilter="blur(10px) "
        >
          <Image
            src={BUSDLogoSVG}
            alt="polygon logo"
            width={useBreakpointValue([65, 75])}
            height={useBreakpointValue([65, 75])}
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
