import { CardContainer } from '@/components/CardContainer';
import React from 'react';
import BalanceCard from './BalanceCard';
import { BalanceContainer } from '@/components/BalanceContainer';
import { FcConferenceCall } from 'react-icons/fc';
import { useGetUserTeam } from '@/hooks/ReferralHooks';

function TeamCard({
  params,
}: {
  params: {
    userAddress: `0x${string}` | undefined;
  };
}) {
  const userTeamObject = useGetUserTeam(params.userAddress);
  const userValueObject = [
    {
      name: 'Direct Team',
      value: userTeamObject?.refereeCount,
    },
    {
      name: 'Total Team',
      value: userTeamObject?.teamCount,
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
