'use client';
import UserTeamDisplayCard from '@/components/UserTeamDisplayCard';
import { AddressZero } from '@/constants/SupportedNetworkInfo';
import {
  Divider,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';
import {
  FcAssistant,
  FcConferenceCall,
  FcDown,
  FcReadingEbook,
  FcVoicePresentation,
} from 'react-icons/fc';
import UserTeamTable from './UserTeamTable';
import { useGetUserTeam } from '@/hooks/ReferralHooks';

function Team({
  params,
}: {
  params: {
    userAddress: `0x${string}` | undefined;
  };
}) {
  const userTeamObject = useGetUserTeam(params.userAddress);
  console.log(userTeamObject);
  return (
    <VStack w="full" direction="column" gap={10}>
      <VStack>
        <HStack>
          <Icon as={FcConferenceCall} boxSize={10}></Icon>
          <Heading color="orange.500">Team</Heading>
        </HStack>
        <Divider></Divider>
      </VStack>
      <VStack>
        {userTeamObject?.referrer !== AddressZero && (
          <VStack>
            <UserTeamDisplayCard
              address={userTeamObject?.referrer}
              icon={FcReadingEbook}
              userType="Referrer"
            />
            <Icon as={FcDown} boxSize={10}></Icon>
          </VStack>
        )}

        <VStack>
          <UserTeamDisplayCard
            address={params.userAddress}
            icon={FcAssistant}
            userType="You"
          />
        </VStack>
        <Icon as={FcDown} boxSize={10}></Icon>
        {userTeamObject.refereeCount > 0 ? (
          <Wrap w="full" justify="center" align="center">
            {userTeamObject.referees.map((address, key) => {
              return (
                <UserTeamDisplayCard
                  address={address}
                  icon={FcVoicePresentation}
                  userType="Referee"
                  key={key}
                />
              );
            })}
          </Wrap>
        ) : (
          <Heading size="md" textAlign="center" color="red">
            You have no team yet.
          </Heading>
        )}
      </VStack>
      {userTeamObject.refereeCount > 0 && (
        <VStack w="full" spacing={10}>
          <Divider />
          <VStack>
            <Heading size="md" color="orange.500">
              All Team
            </Heading>
            <Divider />
          </VStack>
          <UserTeamTable params={params} />
        </VStack>
      )}
    </VStack>
  );
}

export default Team;
