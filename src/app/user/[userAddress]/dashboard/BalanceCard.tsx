import { BalanceContainer } from '@/components/BalanceContainer';
import { CardContainer } from '@/components/CardContainer';
import { HStack, Heading, Tag, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { IoIosWallet } from 'react-icons/io';

export default function BalanceCard() {
  const useValueObject = [
    {
      name: 'Native Balance',
      value: 1111,
    },
    {
      name: 'USDT Balance',
      value: 1111,
    },
    {
      name: 'BUSD Balance',
      value: 1111,
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
          ></BalanceContainer>
        );
      })}
    </CardContainer>
  );
}
