'use client';
import { Counter } from '@/components/Counter';
import { useGetWeeklyRewardToBeDistributed } from '@/hooks/ReferralHooks';
import { HeadingComponent } from '@/util/Ui';
import { Button, HStack, Heading, VStack } from '@chakra-ui/react';
import React from 'react';

function WeeklyReward() {
  const weeklyRewardsToBeDistributed = useGetWeeklyRewardToBeDistributed();
  console.log(weeklyRewardsToBeDistributed);
  return (
    <VStack w="full" minH="80vh" py={10} spacing={10}>
      {/* <Heading>Weekly Reward to be distribued</Heading> */}
      <HeadingComponent
        heading="Weekly Rewards to be"
        gradientHeading="DISTRIBUTED"
      ></HeadingComponent>
      <VStack>
        <HStack>
          <Heading>
            {Number(
              Number(weeklyRewardsToBeDistributed?.[0]) / 10 ** 18
            )?.toFixed(2)}
          </Heading>
          <Heading color="orange.500">USDT</Heading>
        </HStack>

        {/* <Button size="lg" borderRadius="xl">
          Distribute Reward
        </Button> */}
        <Heading>Remaining Time</Heading>
        <Counter
          timeinseconds={Number(weeklyRewardsToBeDistributed?.[2])}
        ></Counter>
      </VStack>
    </VStack>
  );
}

export default WeeklyReward;
