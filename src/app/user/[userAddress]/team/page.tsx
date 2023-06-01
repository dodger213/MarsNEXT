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

function page({
  params,
}: {
  params: {
    userAddress: string | undefined;
  };
}) {
  const userReferee = [AddressZero, AddressZero, AddressZero, AddressZero];
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
        <VStack>
          <UserTeamDisplayCard
            address={AddressZero}
            icon={FcReadingEbook}
            userType="Referrer"
          />
          <Icon as={FcDown} boxSize={10}></Icon>
        </VStack>
        <VStack>
          <UserTeamDisplayCard
            address={AddressZero}
            icon={FcAssistant}
            userType="You"
          />
          <Icon as={FcDown} boxSize={10}></Icon>
        </VStack>
        <Wrap w="full" justify="center" align="center">
          {userReferee.map((address, key) => {
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
      </VStack>
      <Divider />
      <VStack>
        <Heading size="md" color="orange.500">
          All Team
        </Heading>
        <Divider />
      </VStack>
      <UserTeamTable />
    </VStack>
  );
}

export default page;
