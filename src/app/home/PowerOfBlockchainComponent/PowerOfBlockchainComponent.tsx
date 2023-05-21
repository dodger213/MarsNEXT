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
        'green.100',
        'blackAlpha.900'
      )}, transparent)`}
      spacing={10}
    >
      <VStack
        fontSize={['3xl', '4xl', '5xl', '6xl']}
        fontWeight={900}
        lineHeight={1}
      >
        <Text textAlign="center">Build with the power of</Text>
        <Text
          fontSize={['5xl', '6xl', '7xl', '8xl']}
          bgGradient={`linear(to-r, red.500, yellow.500, green.500)`}
          bgClip="text"
        >
          BLOCKCHAIN
        </Text>
      </VStack>
      <Icon as={GiCubes} boxSize={300}></Icon>
      <Container>
        <Heading textAlign="center">
          Every logic & reward distribution written on secure smart contracts.
          All smart contracts are verified on block explorers & open source.
        </Heading>
      </Container>
      <Wrap spacing={10}>
        <Tag
          w={250}
          h={300}
          borderRadius="50px"
          bgColor={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="thick"
        >
          <VStack w="full">
            <Icon as={GiWineGlass} boxSize={20}></Icon>
            <Heading color="orange.500">Transparent</Heading>
          </VStack>
        </Tag>
        <Tag
          w={250}
          h={300}
          borderRadius="50px"
          bgColor={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="thick"
        >
          <VStack w="full">
          <Icon as={BsShieldFillCheck} boxSize={20}></Icon>
            <Heading color="orange.500">Secured</Heading>
          </VStack>
        </Tag>
        <Tag
          w={250}
          h={300}
          borderRadius="50px"
          bgColor={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="thick"
        >
          <VStack w="full">
          <Icon as={FaBoxOpen} boxSize={20}></Icon>
            <Heading textAlign="center" color="orange.500">
              Open Source
            </Heading>
          </VStack>
        </Tag>
        <Tag
          w={250}
          h={300}
          borderRadius="50px"
          bgColor={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="thick"
        >
          <VStack w="full">
          <Icon as={FaLock} boxSize={20}></Icon>
            <Heading textAlign="center" color="orange.500">
              Renounced
            </Heading>
          </VStack>
        </Tag>
      </Wrap>
    </VStack>
  );
};
