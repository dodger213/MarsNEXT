'use client';
import { VStack } from '@chakra-ui/react';
import { Header } from './Header';
import { PlanDiscriptionComponent } from './PlanDiscriptionComponent/PlanDiscriptionComponent';
import { PowerOfBlockchainComponent } from './PowerOfBlockchainComponent/PowerOfBlockchainComponent';
import { TokenDistribution } from './TokenDistribution/TokenDistribution';

export const Home = () => {
  return (
    <div>
      <Header />
      <PlanDiscriptionComponent />
      <TokenDistribution />
      <PowerOfBlockchainComponent />
    </div>
  );
};
