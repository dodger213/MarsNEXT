'use client';
import UserTeamDisplayCard from '@/components/UserTeamDisplayCard';
import { AddressZero } from '@/constants/SupportedNetworkInfo';
import {
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  Input,
  Text,
  VStack,
  Wrap,
  useClipboard,
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
import { useGetUserBusiness, useGetUserTeam } from '@/hooks/ReferralHooks';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import { useAccount } from 'wagmi';

function Team({
  params,
}: {
  params: {
    userAddress: `0x${string}` | undefined;
  };
}) {
  const { address } = useAccount();
  const userBusiness = useGetUserBusiness(params.userAddress);
  const userTeamObject = useGetUserTeam(params.userAddress);
  const isUserActive = Number(userBusiness.selfBusiness) > 0 ? true : false;
  const userReferralLink = `https://marsnext.io/registration/${address}`;
  const { hasCopied, onCopy } = useClipboard(userReferralLink);
  return (
    <VStack w="full" spacing={10}>
      <VStack>
        <HStack>
          <Icon as={FcConferenceCall} boxSize={10}></Icon>
          <Heading color="orange.500">Team</Heading>
        </HStack>
        <Divider></Divider>
      </VStack>
      <VStack>
        <Heading>Your referral link</Heading>
        <VStack>
          <Input
            defaultValue={
              isUserActive ? userReferralLink : 'User is not active'
            }
            borderRadius="xl"
            color={!isUserActive ? 'red' : ''}
            isReadOnly
          ></Input>
          <Button
            w="full"
            borderRadius="xl"
            onClick={onCopy}
            rightIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
            isDisabled={!isUserActive}
          >
            {hasCopied ? 'Referral Link Copied' : 'Copy Referral Link'}
          </Button>
        </VStack>
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
