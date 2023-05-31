import { useGetRandomColor } from '@/util/UtilHooks';
import { Button, Tag, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export const BalanceContainer = ({
  heading,
  value,
}: {
  heading: string;
  value: number;
}) => {
  return (
    <VStack>
      {/* <Tag bgColor={useColorModeValue("gray.100", "")} px={3} py={2} fontSize="md" borderRadius="3xl">{heading}</Tag> */}
      <Tag size="lg" borderRadius="xl" fontWeight="bold" fontSize="md">
        {heading}
      </Tag>
      <Text fontWeight="bold">{value}</Text>
    </VStack>
  );
};
