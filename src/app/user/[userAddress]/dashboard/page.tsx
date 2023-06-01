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
import { FcAreaChart } from 'react-icons/fc';
import { AddressZero } from '@/constants/ContractAddress';

function Dashboard({
  params,
}: {
  params: {
    userAddress: `0x${string}` | undefined;
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
        <LimitCard userAddress={params.userAddress}></LimitCard>
        <BalanceCard params={params}></BalanceCard>
        <BusinessCard params={params}></BusinessCard>
        <RewardsCard params={params}></RewardsCard>
        <TeamCard params={params}/>
      </Wrap>
    </VStack>
  );
}

export default Dashboard;
