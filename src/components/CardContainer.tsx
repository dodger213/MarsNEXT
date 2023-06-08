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
  icon,
}: {
  children: ReactNode;
  heading: string;
  icon: IconType;
}) => {
  return (
    <VStack
      p={5}
      borderRadius="50px"
      spacing={5}
      minW={200}
      bgColor={useColorModeValue('white', 'whiteAlpha.200')}
      flex={1}
      borderWidth="0.5px"
      borderBottomWidth={5}
    >
      <VStack w="full">
        <Tag size="lg" fontWeight="bold" fontSize="xl" borderRadius="xl">
          <HStack>
            <Text>{heading}</Text>
          </HStack>
        </Tag>
        <Icon as={icon} color="twitter.500" boxSize={100}></Icon>
        <Divider></Divider>
      </VStack>
      {children}
    </VStack>
  );
};
