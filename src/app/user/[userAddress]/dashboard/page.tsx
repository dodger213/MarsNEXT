'use client';
import LimitCard from '@/components/LimitCard';
import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';
import BalanceCard from './BalanceCard';
import RewardsCard from './RewardsCard';
import TeamCard from './TeamCard';
import BusinessCard from './BusinessCard';
import { FcAreaChart} from 'react-icons/fc';

function page({
  params,
}: {
  params: {
    userAddress: string | undefined;
  };
}) {
  return (
    <VStack w="full" direction="column" gap={10}>
      <VStack>
        <HStack>
          <Icon as={FcAreaChart} boxSize={10}></Icon>
          <Heading color="orange.500">Dashboard</Heading>
        </HStack>
        <Divider></Divider>
      </VStack>
      <Wrap w="full" justify="center" spacing={5}>
        <LimitCard></LimitCard>
        <BalanceCard></BalanceCard>
        <BusinessCard></BusinessCard>
        <RewardsCard></RewardsCard>
        <TeamCard />
      </Wrap>
    </VStack>
  );
}

export default page;
