import { useGetStakingRewardByID, useStakeInfoMap } from '@/hooks/StakingHooks';
import { CenterComponent } from '@/util/Ui';
import {
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  HStack,
  Heading,
  Spacer,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { formatEther } from 'ethers/lib/utils';
import React from 'react';

function StakingInfoCard({ stakingId }: { stakingId: number }) {
  const stakingInfoMap = useStakeInfoMap(stakingId);
  const stakingReward = useGetStakingRewardByID(stakingId);
  const rewardClaimed =
    (Number(stakingInfoMap?.data?.rewardClaimed) /
      Number(stakingInfoMap?.data?.value)) *
    100;

  return (
    <CenterComponent>
      <VStack minW={250} maxW={300} w="full" spacing={5}>
        <VStack>
          <HStack w="full">
            <Text fontWeight="bold">Staking ID</Text>
            <Spacer />
            <Heading size="md" color="orange.500">
              #{Number(stakingId)}
            </Heading>
          </HStack>
          <Divider></Divider>
        </VStack>

        <VStack spacing={1}>
          <Tag size="lg" colorScheme="twitter" borderRadius="xl">
            Value Staked
          </Tag>
          <Heading size="md">
            {Number(Number(stakingInfoMap?.data?.value) / 10 ** 18)?.toFixed(3)}
          </Heading>
          <Heading size="sm" color="orange.500">
            MARTIANS
          </Heading>
        </VStack>
        <VStack>
          <Tag size="lg" colorScheme="twitter" borderRadius="xl">
            Reward Claimed
          </Tag>

          <CircularProgress
            size="150px"
            value={rewardClaimed}
            color="yellow.500"
            thickness="16px"
          >
            <CircularProgressLabel>
              <Center>
                <VStack spacing={0}>
                  <Heading size="md">
                    {Number(
                      Number(stakingInfoMap?.data?.rewardClaimed) / 10 ** 18
                    ).toFixed(3)}
                  </Heading>
                  <Heading size="xs" color="orange.500">
                    MARTIANS
                  </Heading>
                  <Text fontSize="xx-small" color="twitter.500">
                    Reward Claimed
                  </Text>
                </VStack>
              </Center>
            </CircularProgressLabel>
          </CircularProgress>
        </VStack>
        <VStack>
          <Tag size="lg" colorScheme="twitter" borderRadius="xl">
            Pending Reward
          </Tag>
          <Heading size="md">
            {Number(Number(stakingReward?.data) / 10 ** 18)?.toFixed(10)}
          </Heading>
          <Heading size="sm" color="orange.500">
            MARTIANS
          </Heading>
          {/* <Button
            borderRadius="xl"
            colorScheme="orange"
            bg="orange.500"
            _hover={{
              bg: 'orange.400',
            }}
          >
            Claim Staking Reward
          </Button> */}
        </VStack>
      </VStack>
    </CenterComponent>
  );
}

export default StakingInfoCard;
