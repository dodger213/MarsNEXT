'use client';
import { Image, VStack, useColorModeValue } from '@chakra-ui/react';
import { Header } from './Header';
import { PlanDiscriptionComponent } from './PlanDiscriptionComponent/PlanDiscriptionComponent';
import { PowerOfBlockchainComponent } from './PowerOfBlockchainComponent/PowerOfBlockchainComponent';
import { TokenDistribution } from './TokenDistribution/TokenDistribution';
import { SupportedChainComponent } from './SupportedChainComponent';

export const Home = () => {
  return (
    <VStack bgColor={useColorModeValue("gray.100", "blackAlpha.600")} >
      <Header />
      <SupportedChainComponent />
      <PlanDiscriptionComponent />
      <TokenDistribution />
      <PowerOfBlockchainComponent />
    </VStack>
  );
};
