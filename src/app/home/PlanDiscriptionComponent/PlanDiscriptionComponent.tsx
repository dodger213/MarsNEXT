import { HeadingComponent, bgGradient } from '@/util/Ui';
import {
  Card,
  CardHeader,
  Divider,
  Heading,
  Icon,
  Tag,
  Text,
  VStack,
  Wrap,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { BsFire } from 'react-icons/bs';
import { GiCube } from 'react-icons/gi';

export const PlanDiscriptionComponent = () => {
  return (
    <VStack
      w="full"
      minH="80vh"
      py="10vh"
      spacing={10}
      bgColor={useColorModeValue('green.100', 'blackAlpha.900')}
    >
        <HeadingComponent heading='A protocol made for' gradientHeading='EVERYONE'></HeadingComponent>
      <Wrap spacing={10} align="center" justify="center">
        <Tag
          w={250}
          h={350}
          borderRadius="50px"
          bgColor={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="thick"
        >
          <VStack w="full">
            <Icon as={FaUserFriends} boxSize={10}></Icon>
            <Tag colorScheme="orange">Earn Upto</Tag>

            <Heading color="orange.500">50%</Heading>
            <Text>When you refer a friend.</Text>
          </VStack>
        </Tag>
        <Tag
          w={250}
          h={350}
          borderRadius="50px"
          bgColor={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="thick"
        >
          <VStack w="full" textAlign="center">
            <Icon as={BsFire} boxSize={10}></Icon>
            <Tag colorScheme="orange">Global Rewards</Tag>
            <Heading color="orange.500">10%</Heading>
            <Text>
              <Text as="span" color="pink.500">
                *
              </Text>{' '}
              A random user will get 10% of earch registration amount randmonly.
            </Text>
          </VStack>
        </Tag>
        <Tag
          w={250}
          h={350}
          borderRadius="50px"
          bgColor={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="thick"
        >
          <VStack w="full" textAlign="center">
            <Icon as={GiCube} boxSize={10}></Icon>
            <Tag colorScheme="orange">Ownership</Tag>
            <Heading color="orange.500">100%</Heading>
            <Text>
              Everything is on decentralized smart contracts verified on block
              explorers. Completely transparent & secure.
            </Text>
          </VStack>
        </Tag>
      </Wrap>
    </VStack>
  );
};
