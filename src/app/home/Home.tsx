'use client';
import { Image, VStack } from '@chakra-ui/react';
import { Header } from './Header';
import { PlanDiscriptionComponent } from './PlanDiscriptionComponent/PlanDiscriptionComponent';
import { PowerOfBlockchainComponent } from './PowerOfBlockchainComponent/PowerOfBlockchainComponent';
import { TokenDistribution } from './TokenDistribution/TokenDistribution';
import { SupportedChainComponent } from './SupportedChainComponent';

export const Home = () => {
  return (
    <div>
      <Header />
      <SupportedChainComponent />
      <PlanDiscriptionComponent />
      
      <TokenDistribution />
      <PowerOfBlockchainComponent />
    </div>
  );
};
