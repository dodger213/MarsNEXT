import { BalanceContainer } from '@/components/BalanceContainer';
import { CardContainer } from '@/components/CardContainer';
import React from 'react';
import { FaWallet } from 'react-icons/fa';
import { FcBusinessContact, FcComboChart } from 'react-icons/fc';

function BusinessCard() {
  const userValueObject = [
    {
      name: 'Self Business',
      value: 111,
    },
    {
      name: 'Direct Business',
      value: 1111,
    },
    {
      name: 'Team Business',
      value: 11111,
    },
  ];
  return (
    <CardContainer heading="Business" icon={FcComboChart}>
      {userValueObject.map((valueObject, key) => {
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

export default BusinessCard;
