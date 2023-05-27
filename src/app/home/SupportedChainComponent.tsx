import { BUSDLogoSVG, USDTLogoSVG } from '@/assets';
import { CenterComponent, HeadingComponent } from '@/util/Ui';
import {
  Center,
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
      spacing={5}
      w="full"
      borderTopRadius={['25%']}
    >
      <HeadingComponent
        heading="Supported by the"
        gradientHeading="BEST"
      ></HeadingComponent>
      <HStack spacing={[2, 5, 10]} p={[2, 5, 10]}>
        <CenterComponent>
          <Image
            src="/chainIcons/bscSmartChainLogo.svg"
            alt="bsc logo"
            width={100}
            height={100}
          ></Image>
        </CenterComponent>
        <CenterComponent>
          <Image
            src="/chainIcons/polygonChainLogo.svg"
            alt="polygon logo"
            width={100}
            height={100}
          ></Image>
        </CenterComponent>
        <CenterComponent>
          <Image
            src="/chainIcons/ethereumChainLogo.svg"
            alt="ethereum logo"
            width={100}
            height={100}
          ></Image>
        </CenterComponent>
      </HStack>
      <HeadingComponent
        heading="Supported"
        gradientHeading="CURRENCIES"
      ></HeadingComponent>
      <HStack spacing={[2, 5, 10]} p={[2, 5, 10]}>
        <CenterComponent style={{
          w:150,
          h: 120
        }}>
          <Image
            src={USDTLogoSVG}
            alt="bsc logo"
            width={useBreakpointValue([50, 70])}
            height={useBreakpointValue([50, 70])}
          ></Image>
        </CenterComponent>
        <CenterComponent style={{
           w:150,
           h: 120
        }}>
          <Image
            src={BUSDLogoSVG}
            alt="polygon logo"
            width={useBreakpointValue([50, 70])}
            height={useBreakpointValue([50, 70])}
          ></Image>
        </CenterComponent>
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
