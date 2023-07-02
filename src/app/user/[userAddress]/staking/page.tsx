'use client';
import StakingInfoCard from '@/components/StakingInfoCard/StakingInfoCard';
import { useGetUserStakingIDs } from '@/hooks/StakingHooks';
import { CenterComponent } from '@/util/Ui';
import {
  Divider,
  HStack,
  Heading,
  Icon,
  Spacer,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';
import { FcConferenceCall } from 'react-icons/fc';

function Staking({
  params,
}: {
  params: {
    userAddress: `0x${string}` | undefined;
  };
}) {
  const userStakingIDs = useGetUserStakingIDs(params.userAddress!);
  return (
    <VStack w="full" spacing={10}>
      <VStack>
        <HStack>
          <Icon as={FcConferenceCall} boxSize={10}></Icon>
          <Heading color="orange.500">Staking</Heading>
        </HStack>
        <Divider></Divider>
        <Wrap w="full" spacing={10} align="center" justify="center" p={5}>
          {Number(userStakingIDs.data?.length) > 0 ? (
            userStakingIDs.data?.map((stakingId, key) => {
              return (
                <StakingInfoCard
                  stakingId={Number(stakingId)}
                  key={key}
                ></StakingInfoCard>
              );
            })
          ) : (
            <Heading>You have no stakings.</Heading>
          )}
        </Wrap>
      </VStack>
    </VStack>
  );
}

export default Staking;
