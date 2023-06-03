import {
  ReferralV1ContractObject,
  VariablesV1ContractObject,
} from '@/constants/ContractAddress';
import { useSupportedNetworkInfo } from '@/constants/SupportedNetworkInfo';
import { useContractRead, useNetwork } from 'wagmi';

export const useContractCall = ({
  functionName,
  args,
}: {
  functionName: string;
  args?: any[];
}) => {
  const { chain } = useNetwork();
  const currentNetwork = useSupportedNetworkInfo[chain?.id ?? 137];

  const { data, isError, isLoading, error } = useContractRead({
    address: currentNetwork?.variablesContractAddress,
    abi: VariablesV1ContractObject?.abi,
    functionName: functionName,
    args: args ?? [],
  });

  if (isError) {
    console.log('Referral Hook Error', error?.message);
    return undefined;
  }

  return data;
};

export const useGetPlanById = (planId: number) => {
  const value: any = useContractCall({
    functionName: 'getPlanById',
    args: [planId],
  });

  const valueObject = {
    planId: value ? Number(value?.planId) : 0,
    name: value ? value?.name?.toString() : "",
    value: value ? Number(value?.value) / 10 ** 18 : 0,
    maxLimitMultiplier: value ? Number(value?.maxLimitMultiplier) : 0
  }

  return valueObject;
};

export const useGetPlansCount = () => {
  const value = useContractCall({
    functionName: 'getPlansCount',
  });

  const valueObject = value ? (Number(value) as number) : 0;

  return valueObject;
};
