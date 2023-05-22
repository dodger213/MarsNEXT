import TokenDistributionComponent from '@/components/TokenDistributionComponent';
import { HeadingComponent } from '@/util/Ui';
import {
  Box,
  Flex,
  HStack,
  Progress,
  Tag,
  VStack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

export const TokenDistribution = () => {
  return (
    <VStack
      w="full"
      py="10vh"
      bgColor={useColorModeValue('green.100', 'blackAlpha.900')}
      spacing={10}
    >
      <HeadingComponent
        heading="Build for community"
        gradientHeading="DISTRIBUTION"
      ></HeadingComponent>
      <TokenDistributionComponent
        boxSize={useBreakpointValue([250, 300, 350, 400, 500])}
      />
      <Flex
        direction="column"
        gap={5}
        p={[5, 10]}
        bgColor={useColorModeValue('white', 'gray.900')}
        borderRadius="50px"
        borderBottomWidth="thick"
      >
        <HStack>
          <Tag>Referrer</Tag>
          <Box w="50vw" h={7} bgGradient="linear(to-r, red.500, yellow.500, green.500)" borderRadius="full"></Box>
          <Tag>50%</Tag>
        </HStack>
        <HStack>
          <Tag>Levels</Tag>
          <Box w="20vw" h={7} bgColor="twitter.400" borderRadius="full"></Box>
          <Tag>20%</Tag>
        </HStack>
        <HStack>
          <Tag>Global Pool</Tag>
          <Box w="10vw" h={7} bgColor="purple.300" borderRadius="full"></Box>
          <Tag>10%</Tag>
        </HStack>
        <HStack>
          <Tag>Weekly Pool</Tag>
          <Box w="10vw" h={7} bgColor="red.300" borderRadius="full"></Box>
          <Tag>10%</Tag>
        </HStack>
        <HStack>
          <Tag>IB Partners</Tag>
          <Box w="5vw" h={7} bgColor="green.300" borderRadius="full"></Box>
          <Tag>5%</Tag>
        </HStack>
        <HStack>
          <Tag>Dev & Teams</Tag>
          <Box w="5vw" h={7} bgColor="orange.500" borderRadius="full"></Box>
          <Tag>5%</Tag>
        </HStack>
      </Flex>
    </VStack>
  );
};
