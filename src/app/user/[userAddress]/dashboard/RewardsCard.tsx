import { CardContainer } from '@/components/CardContainer';
import { Tag, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import BalanceCard from './BalanceCard';
import { BalanceContainer } from '@/components/BalanceContainer';
import { FcScatterPlot } from 'react-icons/fc';
import { useGetUserRewards } from '@/hooks/ReferralHooks';

export default function RewardsCard({
  params,
}: {
  params: {
    userAddress: `0x${string}` | undefined;
  };
}) {
  const userRewardsObject = useGetUserRewards(params.userAddress);

  const userValueObject = [
    {
      name: 'Referral Rewards',
      value: userRewardsObject?.referralReward,
    },
    {
      name: 'Global Rewards',
      value: userRewardsObject?.globalReward,
    },
    {
      name: 'Weekly Rewards',
      value: userRewardsObject?.weeklyReward,
    },
    // {
    //   name: 'IBP Rewards',
    //   value: userRewardsObject?.ibpReward,
    // },
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
