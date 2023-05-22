import { HeadingComponent } from '@/util/Ui';
import {
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
import { BsShieldFillCheck } from 'react-icons/bs';
import { FaBoxOpen, FaLock } from 'react-icons/fa';
import { GiCubes, GiWineGlass } from 'react-icons/gi';

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
      <Icon as={GiCubes} boxSize={300}></Icon>
      <Container>
        <Heading textAlign="center" size="md">
          Every logic & reward distribution written on secure smart contracts.
          All smart contracts are verified on block explorers & open source.
        </Heading>
      </Container>
      <Wrap spacing={10} align="center" justify="center">
        <Tag p={5} borderRadius="50px" borderBottomWidth="thick">
          <VStack w="full">
            <Icon as={GiWineGlass} boxSize={14}></Icon>
            <Heading color="orange.500" size="md">
              Transparent
            </Heading>
          </VStack>
        </Tag>
        <Tag p={5} borderRadius="50px" borderBottomWidth="thick">
          <VStack w="full">
            <Icon as={BsShieldFillCheck} boxSize={14}></Icon>
            <Heading color="orange.500" size="md">
              Secured
            </Heading>
          </VStack>
        </Tag>
        <Tag p={5} borderRadius="50px" borderBottomWidth="thick">
          <VStack w="full">
            <Icon as={FaBoxOpen} boxSize={14}></Icon>
            <Heading textAlign="center" color="orange.500" size="md">
              Open Source
            </Heading>
          </VStack>
        </Tag>
        <Tag p={5} borderRadius="50px" borderBottomWidth="thick">
          <VStack w="full">
            <Icon as={FaLock} boxSize={14}></Icon>
            <Heading textAlign="center" color="orange.500" size="md">
              Renounced
            </Heading>
          </VStack>
        </Tag>
      </Wrap>
    </VStack>
  );
};
