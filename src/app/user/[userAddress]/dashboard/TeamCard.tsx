import { CardContainer } from '@/components/CardContainer';
import React from 'react';
import BalanceCard from './BalanceCard';
import { BalanceContainer } from '@/components/BalanceContainer';
import { FcConferenceCall } from 'react-icons/fc';

function TeamCard() {
  const userValueObject = [
    {
      name: 'Direct Team',
      value: 1111
    },
    {
      name: 'Total Team',
      value: 1111,
    },
  ];
  return (
    <CardContainer heading="Team" icon={FcConferenceCall}>
      {userValueObject.map((valueObject, key) => {
        return (
          <BalanceContainer
            heading={valueObject?.name}
            value={valueObject?.value}
            key={key}
            showIcon={false}
          ></BalanceContainer>
        );
      })}
    </CardContainer>
  );
}

export default TeamCard;
