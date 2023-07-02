'use client';
import { Image, VStack, useColorModeValue } from '@chakra-ui/react';
import { Header } from './Header';
import { PlanDiscriptionComponent } from './PlanDiscriptionComponent/PlanDiscriptionComponent';
import { PowerOfBlockchainComponent } from './PowerOfBlockchainComponent/PowerOfBlockchainComponent';
import { TokenDistribution } from './TokenDistribution/TokenDistribution';
import { SupportedChainComponent } from './SupportedChainComponent';
import WeeklyReward from './WeeklyReward/WeeklyReward';

export const Home = () => {
  return (
    <VStack w="full">
      <Header />
      <SupportedChainComponent />
      <PlanDiscriptionComponent />
      <TokenDistribution />
      <PowerOfBlockchainComponent />
      <WeeklyReward/>
    </VStack>
  );
};
