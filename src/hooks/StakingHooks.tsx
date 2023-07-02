import {
  AddressZero,
  ReferralV1ContractObject,
  StakingContractObject,
} from '@/constants/ContractAddress';
import { supportedNetworkInfo } from '@/constants/SupportedNetworkInfo';
import { formatNumberWithMaxDecimals } from '@/util/UtilHooks';
import { useContractRead, useNetwork } from 'wagmi';

export const useContractCall = ({
  functionName,
  args,
}: {
  functionName: string;
  args?: any[];
}) => {
  const { chain } = useNetwork();
  const currentNetwork = supportedNetworkInfo[chain?.id ?? 137];

  return useContractRead({
    address: currentNetwork?.stakingContractAddress,
    abi: StakingContractObject?.abi,
    functionName: functionName,
    args: args ?? [],
  });
};

export const useGetUserStakingIDs = (address: `0x${string}`) => {
  const value = useContractCall({
    functionName: 'getUserStakingIDs',
    args: [address],
  });

  const valueObject = {
    data: value ? (value?.data as BigInt[]) : [],
    object: value,
  };

  return valueObject;
};

export type StakeInfoMapType = {
  owner: `0x${string}`;
  isActive: boolean;
  duration: BigInt;
  rewardClaimed: BigInt;
  rewardRate: BigInt;
  startTime: BigInt;
  value: BigInt;
};

export const useStakeInfoMap = (stakingId: number) => {
  const value = useContractCall({
    functionName: 'stakeInfoMap',
    args: [stakingId],
  });

  const data = value ? value?.data : {};

  const valueObject = {
    data: data as StakeInfoMapType,
    object: value,
  };

  return valueObject;
};

export const useGetStakingRewardByID = (stakingId: number) => {
  const value = useContractCall({
    functionName: 'getStakingReward',
    args: [stakingId],
  });

  const valueObject = {
    data: value ? value?.data : 0,
    object: value,
  };

  return valueObject;
};
