import { BUSDLogoSVG, USDTLogoSVG } from '@/assets';
import {
  Avatar,
  AvatarGroup,
  Button,
  HStack,
  Tag,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

export const BalanceContainer = ({
  heading,
  value,
  showIcon = true,
}: {
  heading: string;
  value: number;
  showIcon?: boolean;
}) => {
  return (
    <VStack>
      {/* <Tag bgColor={useColorModeValue("gray.100", "")} px={3} py={2} fontSize="md" borderRadius="3xl">{heading}</Tag> */}
      <Tag size="lg" borderRadius="xl" fontWeight="bold" fontSize="md">
        {heading}
      </Tag>
      <HStack>
        <Text>{value}</Text>
        {showIcon && (
          <AvatarGroup size="xs" max={2}>
            <Avatar name="BUSD Logo" src="/token-icons/usdt.svg" />
            <Avatar name="USDT Logo" src="/token-icons/busd.svg" />
            <Avatar name="Matic Logo" src="/token-icons/polygon.svg" />
          </AvatarGroup>
        )}
      </HStack>
    </VStack>
  );
};
