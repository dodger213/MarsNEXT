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

export type PlanInfoType = {
  name: string;
  value: number;
  maxLimitMutiplier: number;
};
export const useGetUserStakingIDs = (address: `0x${string}`) => {
  const value = useContractCall({
    functionName: 'getUserStakingIDs',
    args: [address],
  });

  const valueObject = {
    data: value ? value?.data as BigInt[] : [],
    object: value
  }

  return valueObject;
};

export const useGetStakingRewardByID = (stakingID: number) => {};
