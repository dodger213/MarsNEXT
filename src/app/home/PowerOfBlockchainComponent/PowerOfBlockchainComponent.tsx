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
        fontSize={['2xl', '3xl', '4xl', '5xl']}
        fontWeight={900}
        lineHeight={1}
      >
        <Text textAlign="center">Build with the power of</Text>
        <Text
          fontSize={['4xl', '5xl', '6xl', '7xl']}
          bgGradient={`linear(to-r, red.500, yellow.500, green.500)`}
          bgClip="text"
        >
          BLOCKCHAIN
        </Text>
      </VStack>
      <Icon as={GiCubes} boxSize={300}></Icon>
      <Container>
        <Heading textAlign="center" size="md">
          Every logic & reward distribution written on secure smart contracts.
          All smart contracts are verified on block explorers & open source.
        </Heading>
      </Container>
      <Wrap spacing={10} align="center" justify="center">
        <Tag
          w={250}
          h={350}
          borderRadius="50px"
          bgColor={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="thick"
        >
          <VStack w="full">
            <Icon as={GiWineGlass} boxSize={14}></Icon>
            <Heading color="orange.500"  size="md">Transparent</Heading>
          </VStack>
        </Tag>
        <Tag
          w={250}
          h={350}
          borderRadius="50px"
          bgColor={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="thick"
        >
          <VStack w="full">
          <Icon as={BsShieldFillCheck} boxSize={14}></Icon>
            <Heading color="orange.500" size="md">Secured</Heading>
          </VStack>
        </Tag>
        <Tag
          w={250}
          h={350}
          borderRadius="50px"
          bgColor={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="thick"
        >
          <VStack w="full">
          <Icon as={FaBoxOpen} boxSize={14}></Icon>
            <Heading textAlign="center" color="orange.500" size="md">
              Open Source
            </Heading>
          </VStack>
        </Tag>
        <Tag
          w={250}
          h={350}
          borderRadius="50px"
          bgColor={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="thick"
        >
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
