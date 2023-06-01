import { BalanceContainer } from '@/components/BalanceContainer';
import { CardContainer } from '@/components/CardContainer';
import { AddressZero } from '@/constants/SupportedNetworkInfo';
import { HStack, Heading, Tag, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { IoIosWallet } from 'react-icons/io';
import { useBalance, useNetwork } from 'wagmi';
import { useSupportedNetworkInfo } from '@/constants/SupportedNetworkInfo';
import { polygon } from 'viem/chains';
import { USDTLogoSVG } from '../../../../../public/token-icons';

export default function BalanceCard({
  params,
}: {
  params: {
    userAddress: `0x${string}` | undefined;
  };
}) {
  const { chain } = useNetwork();
  const currentNetwork = useSupportedNetworkInfo[chain?.id!];
  const { data: userNativeBalance } = useBalance({
    address: params.userAddress ?? AddressZero,
  });

  const { data: userUSDTBalance } = useBalance({
    address: params.userAddress ?? AddressZero,
    token: currentNetwork.USDT.contractAddress,
  });

  const { data: userBUSDBalance } = useBalance({
    address: params.userAddress ?? AddressZero,
    token: currentNetwork.BUSD.contractAddress,
  });

  const useValueObject = [
    {
      name: `${userNativeBalance?.symbol} Balance`,
      value: Number(Number(userNativeBalance?.formatted).toFixed(3)),
      symbol: userNativeBalance?.symbol,
      showIcon: false,
      icons: [currentNetwork?.logo],
    },
    {
      name: 'USDT Balance',
      value: Number(Number(userUSDTBalance?.formatted).toFixed(3)),
      symbol: userUSDTBalance?.symbol,
      showIcon: false,
      icons: ['/token-icons/usdt.svg'],
    },
    {
      name: 'BUSD Balance',
      value: Number(Number(userBUSDBalance?.formatted).toFixed(3)),
      symbol: userBUSDBalance?.symbol,
      showIcon: false,
      icons: ['/token-icons/busd.svg'],
    },
  ];
  return (
    <CardContainer heading="Balances" icon={IoIosWallet}>
      {useValueObject.map((valueObject, key) => {
        return (
          <BalanceContainer
            heading={valueObject?.name}
            value={valueObject?.value}
            key={key}
            currencySymbol={valueObject.symbol}
            icons={valueObject.icons}
          ></BalanceContainer>
        );
      })}
    </CardContainer>
  );
}
