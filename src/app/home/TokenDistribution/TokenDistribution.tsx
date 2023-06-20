import TokenDistributionComponent from '@/components/TokenDistributionComponent';
import { CenterComponent, HeadingComponent } from '@/util/Ui';
import {
  Box,
  Flex,
  HStack,
  Progress,
  Spacer,
  Tag,
  VStack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const TagComponent = ({
  heading,
  color,
  value,
}: {
  heading: string;
  color: string;
  value: number;
}) => {
  return (
    <HStack spacing={[1, 2, 5]} w="full">
      <Tag size={['sm', 'md', 'lg']} borderRadius="xl">{heading}</Tag>
      <Spacer />
      <Box w={`${value}vw`} h={7} bgGradient={color} borderRadius="full" ></Box>
      <Tag size={['sm', 'md', 'lg']} borderRadius="xl">{value}%</Tag>
    </HStack>
  );
};

export const TokenDistribution = () => {
  return (
    <VStack w="full" py="10vh" spacing={10}>
      <HeadingComponent
        heading="Build for community"
        gradientHeading="DISTRIBUTION"
      ></HeadingComponent>
      <TokenDistributionComponent
        boxSize={useBreakpointValue([250, 300, 350, 400, 500])}
      />
      <CenterComponent>
        <VStack>
          <TagComponent
            heading="Referrer"
            color="linear(to-r, red.500, yellow.500, green.500)"
            value={50}
          ></TagComponent>
          <TagComponent
            heading="Levels"
            color="linear(to-r, twitter.500, twitter.500)"
            value={20}
          ></TagComponent>
          <TagComponent
            heading="Global Pool"
            color="linear(to-r, purple.500, purple.500)"
            value={10}
          ></TagComponent>
          <TagComponent
            heading="Weekly Pool"
            color="linear(to-r, red.300, red.300)"
            value={10}
          ></TagComponent>
          {/* <TagComponent
            heading="IB Partners"
            color="linear(to-r, green.300, green.300)"
            value={5}
          ></TagComponent> */}
          <TagComponent
            heading="Core & Dev Teams"
            color="linear(to-r, orange.500, orange.500)"
            value={10}
          ></TagComponent>
        </VStack>
      </CenterComponent>
    </VStack>
  );
};
