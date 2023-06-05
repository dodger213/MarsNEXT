import { USDT } from '@/constants/ContractAddress';
import { supportedNetworkInfo } from '@/constants/SupportedNetworkInfo';
import { erc20ABI, useContractRead, useNetwork } from 'wagmi';

export const useContractCall = ({
  contractAddress,
  functionName,
  args,
}: {
  contractAddress: `0x${string}`;
  functionName:
    | 'symbol'
    | 'name'
    | 'allowance'
    | 'balanceOf'
    | 'decimals'
    | 'totalSupply'
    | undefined;
  args:
    | readonly [`0x${string}`, `0x${string}`]
    | readonly [`0x${string}`]
    | undefined;
}) => {
  const { data, isError, isLoading, error } = useContractRead({
    address: contractAddress,
    abi: erc20ABI,
    functionName: functionName,
    args: args,
    watch: true,
  });

  if (isError) {
    console.log('ERC20Token Hook Error', error?.message);
    return undefined;
  }

  return data;
};

export const useGetAllowance = (
  contractAddress: `0x${string}`,
  userAddress: `0x${string}`,
  spenderAddress: `0x${string}`
) => {
  const { chain } = useNetwork();
  const currentNetwork = supportedNetworkInfo[chain?.id ?? 137];
  const value = useContractCall({
    contractAddress: contractAddress,
    functionName: 'allowance',
    args: [userAddress, spenderAddress],
  });

  const valueObject = value
    ? Number(value) / 10 ** currentNetwork?.USDT?.decimals
    : 0;
  return valueObject;
};
