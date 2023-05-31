import {
  Divider,
  HStack,
  Heading,
  Icon,
  Tag,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { FcDoughnutChart } from 'react-icons/fc';

export const CardContainer = ({
  children,
  heading,
  icon
}: {
  children: ReactNode;
  heading: string;
  icon: IconType
}) => {
  return (
    <VStack
      p={5}
      borderRadius="50px"
      spacing={5}
      minW={200}
      bgColor={useColorModeValue('white', 'blackAlpha.300')}
      flex={1}
      borderWidth="0.5px"
      borderBottomWidth={5}
    >
      <VStack>
        <Tag size="lg" fontWeight="bold" fontSize="xl" borderRadius="xl">
          <HStack>
            <Icon as={icon} color="twitter.500"></Icon>
            <Text>{heading}</Text>
          </HStack>
        </Tag>
        <Divider></Divider>
      </VStack>
      {children}
    </VStack>
  );
};
