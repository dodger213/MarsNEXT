import { BalanceContainer } from '@/components/BalanceContainer';
import { CardContainer } from '@/components/CardContainer';
import { useGetUserBusiness } from '@/hooks/ReferralHooks';
import React from 'react';
import { FaWallet } from 'react-icons/fa';
import { FcBusinessContact, FcComboChart } from 'react-icons/fc';

function BusinessCard({
  params,
}: {
  params: {
    userAddress: `0x${string}` | undefined;
  };
}) {
  const userBusiness = useGetUserBusiness(params.userAddress);
  const userValueObject = [
    {
      name: 'Self Business',
      value: userBusiness?.selfBusiness,
    },
    {
      name: 'Direct Business',
      value: userBusiness?.directBusiness,
    },
    {
      name: 'Team Business',
      value: userBusiness?.teamBusiness,
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
