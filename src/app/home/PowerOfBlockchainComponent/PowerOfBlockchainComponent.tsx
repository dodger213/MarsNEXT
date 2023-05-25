import { CenterComponent, HeadingComponent } from '@/util/Ui';
import {
  Center,
  Container,
  Heading,
  Icon,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import {
  BsBox,
  BsHexagon,
  BsShieldCheck,
  BsShieldFillCheck,
} from 'react-icons/bs';
import { FaBoxOpen, FaLock } from 'react-icons/fa';
import { GiCubes, GiWineGlass } from 'react-icons/gi';

const TagComponent = ({
  icon,
  heading,
}: {
  icon: IconType;
  heading: string;
}) => {
  return (
    <CenterComponent
      style={{
        minW: 200,
      }}
    >
      <VStack w="full">
        <Icon as={icon} boxSize={14}></Icon>
        <Heading color="orange.500" size={['sm', 'md']}>
          {heading}
        </Heading>
      </VStack>
    </CenterComponent>
  );
};

export const PowerOfBlockchainComponent = () => {
  return (
    <VStack
      w="full"
      minH="80vh"
      py="10vh"
      bgGradient={`linear(to-b, ${useColorModeValue(
        'white',
        'blackAlpha.900'
      )}, transparent)`}
      spacing={10}
    >
      <HeadingComponent
        heading="Build with the power of"
        gradientHeading="BLOCKCHAIN"
      ></HeadingComponent>
      <Icon as={GiCubes} boxSize={[270, 300]}></Icon>
      <Container>
        <Heading textAlign="center" size="md">
          Every logic & reward distribution written on secure smart contracts.
          All smart contracts are verified on block explorers & open source.
        </Heading>
      </Container>
      <Wrap spacing={10} align="center" justify="center">
        <TagComponent icon={GiWineGlass} heading="Transparent"></TagComponent>
        <TagComponent icon={BsShieldCheck} heading="Secured"></TagComponent>
        <TagComponent icon={BsBox} heading="Open Source"></TagComponent>
        {/* <TagComponent icon={FaLock} heading="Renounced"></TagComponent> */}
      </Wrap>
    </VStack>
  );
};
