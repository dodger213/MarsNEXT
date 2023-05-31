import { CardContainer } from '@/components/CardContainer';
import { Tag, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import BalanceCard from './BalanceCard';
import { BalanceContainer } from '@/components/BalanceContainer';
import { FcScatterPlot } from 'react-icons/fc';

export default function RewardsCard() {
  const userValueObject = [
    {
      name: 'Referral Rewards',
      value: 1111,
    },
    {
      name: 'Global Rewards',
      value: 1111,
    },
    {
      name: 'Weekly Rewards',
      value: 1111,
    },
    {
      name: 'IBC Rewards',
      value: 1111,
    },
  ];
  return (
    <CardContainer heading="Rewards" icon={FcScatterPlot}>
      {userValueObject?.map((valueObject, key) => {
        return (
          <BalanceContainer
            key={key}
            heading={valueObject?.name}
            value={valueObject?.value}
          ></BalanceContainer>
        );
      })}
    </CardContainer>
  );
}
