import DistributionChartComponent from '@/components/DistributionChartComponent';
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
      <Tag size={['sm', 'md', 'lg']} borderRadius="xl">
        {heading}
      </Tag>
      <Spacer />
      <Box w={`${value}vw`} h={7} bgColor={color} borderRadius="full"></Box>
      <Tag size={['sm', 'md', 'lg']} borderRadius="xl">
        {value}%
      </Tag>
    </HStack>
  );
};

export const TokenDistribution = () => {
  return (
    <VStack w="full" py="10vh" spacing={10} overflow="hidden">
      <HeadingComponent
        heading="Build for community"
        gradientHeading="DISTRIBUTION"
      ></HeadingComponent>
      {/* <TokenDistributionComponent
        boxSize={useBreakpointValue([250, 300, 350, 400, 500])}
      /> */}
      <DistributionChartComponent  boxSize={useBreakpointValue([400, 500, 600])}></DistributionChartComponent>
      <CenterComponent>
        <VStack>
          <TagComponent
            heading="Referrer"
            color="#F687B3"
            value={50}
          ></TagComponent>
          <TagComponent
            heading="Levels"
            color="#76E4F7"
            value={20}
          ></TagComponent>
          <TagComponent
            heading="Global Pool"
            color="#F6AD55"
            value={10}
          ></TagComponent>
          <TagComponent
            heading="Weekly Pool"
            color="#FC8181"
            value={10}
          ></TagComponent>
          {/* <TagComponent
            heading="IB Partners"
            color="linear(to-r, green.300, green.300)"
            value={5}
          ></TagComponent> */}
          <TagComponent
            heading="Dev, Core Teams & Development"
            color="#68D391"
            value={10}
          ></TagComponent>
        </VStack>
      </CenterComponent>
    </VStack>
  );
};
