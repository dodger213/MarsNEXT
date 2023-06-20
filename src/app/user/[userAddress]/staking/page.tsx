'use client';
import { useGetUserStakingIDs } from '@/hooks/StakingHooks';
import { Divider, HStack, Heading, Icon, VStack } from '@chakra-ui/react';
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
  console.log(
    Number(userStakingIDs.data?.length),
    userStakingIDs.object.isLoading
  );
  return (
    <VStack w="full" spacing={10}>
      <VStack>
        <HStack>
          <Icon as={FcConferenceCall} boxSize={10}></Icon>
          <Heading color="orange.500">Staking</Heading>
        </HStack>
        <Divider></Divider>
        {Number(userStakingIDs.data?.length) > 0 ? (
          userStakingIDs.data?.map(() => {
            return <></>;
          })
        ) : (
          <Heading>You have no stakings.</Heading>
        )}
      </VStack>
    </VStack>
  );
}

export default Staking;
