import {
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  HStack,
  Heading,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { CardContainer } from './CardContainer';
import { BalanceContainer } from './BalanceContainer';
import { FcDoughnutChart } from 'react-icons/fc';
import { useGetUserLimits } from '@/hooks/ReferralHooks';
import { AddressZero } from '@/constants/ContractAddress';

function LimitCard({
  userAddress,
}: {
  userAddress: `0x${string}` | undefined;
}) {
  const value = useGetUserLimits(userAddress ?? AddressZero);
  const limitReachedPer = (value.currentLimit / value.maxLimit) * 100;
  return (
    <CardContainer heading="Limits" icon={FcDoughnutChart}>
      <CircularProgress
        size="150px"
        value={limitReachedPer}
        color="yellow.500"
        thickness="16px"
      >
        <CircularProgressLabel>
          <Center>
            <Heading size="md">
              {limitReachedPer > 0 ? limitReachedPer.toFixed(1) : 0}
            </Heading>
            <Heading size="sm" color="orange.500">
              %
            </Heading>
          </Center>
        </CircularProgressLabel>
      </CircularProgress>
      <BalanceContainer
        heading="Max Rewards"
        value={value.maxLimit}
      ></BalanceContainer>
      <BalanceContainer
        heading="Rewards Claimed"
        value={value.currentLimit}
      ></BalanceContainer>
      <BalanceContainer
        heading="Remaining Rewards"
        value={value.limitRemaingvalue}
      ></BalanceContainer>
    </CardContainer>
  );
}

export default LimitCard;
