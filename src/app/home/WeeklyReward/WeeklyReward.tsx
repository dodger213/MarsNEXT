'use client';
import { Counter } from '@/components/Counter';
import {
  useGetRegistrationsStats,
  useGetWeeklyRewardToBeDistributed,
} from '@/hooks/ReferralHooks';
import { CenterComponent, HeadingComponent } from '@/util/Ui';
import { Button, HStack, Heading, Icon, VStack, Wrap } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineFire } from 'react-icons/ai';
import { HiUserGroup } from 'react-icons/hi';
import { SlGlobeAlt } from 'react-icons/sl';
import { CiTimer } from 'react-icons/ci';

function WeeklyReward() {
  const weeklyRewardsToBeDistributed = useGetWeeklyRewardToBeDistributed();
  const registrationStats = useGetRegistrationsStats();
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
      </VStack>
      <VStack>
        <Heading>Remaining Time</Heading>
        <Counter
          timeinseconds={Number(weeklyRewardsToBeDistributed?.[2])}
        ></Counter>
      </VStack>
      <Wrap w="full" p={5} justify="center" align="center" spacing={10}>
        <CenterComponent>
          <VStack>
            <Icon as={AiOutlineFire} boxSize={10}></Icon>
            <Heading>
              {Number(Number(registrationStats?.[1]) / 10 ** 18)} USDT
            </Heading>
            <Heading size="sm" w={150} textAlign="center">
              Total Registration Value
            </Heading>
          </VStack>
        </CenterComponent>
        <CenterComponent>
          <VStack>
            <Icon as={HiUserGroup} boxSize={10}></Icon>
            <Heading>
              {Number(Number(registrationStats?.[2]) / 10 ** 18)?.toFixed(0)}{' '}
              USDT
            </Heading>
            <Heading size="sm" w={200} textAlign="center">
              Referral Rewards Distributed
            </Heading>
          </VStack>
        </CenterComponent>
        <CenterComponent>
          <VStack>
            <Icon as={SlGlobeAlt} boxSize={10}></Icon>
            <Heading>
              {Number(Number(registrationStats?.[3]) / 10 ** 18)?.toFixed(0)}{' '}
              USDT
            </Heading>
            <Heading size="sm" w={200} textAlign="center">
              Global Rewards Distributed
            </Heading>
          </VStack>
        </CenterComponent>
        <CenterComponent>
          <VStack>
            <Icon as={CiTimer} boxSize={10}></Icon>
            <Heading>
              {Number(Number(registrationStats?.[4]) / 10 ** 18)?.toFixed(0)}{' '}
              USDT
            </Heading>
            <Heading size="sm" w={200} textAlign="center">
              Weekly Rewards Distributed
            </Heading>
          </VStack>
        </CenterComponent>
      </Wrap>
    </VStack>
  );
}

export default WeeklyReward;
