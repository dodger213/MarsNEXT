import { AddressZero } from '@/constants/SupportedNetworkInfo';
import { Heading, Icon, Tag, VStack } from '@chakra-ui/react';
import { shortenAddress } from '@usedapp/core';
import React from 'react';
import { FcReadingEbook } from 'react-icons/fc';
import { AddressActionButtons } from './AddressActionButtons';
import { CardContainer } from './CardContainer';
import { IconType } from 'react-icons';

function UserTeamDisplayCard({userType, icon, address}:{userType: string, icon: IconType, address: string | undefined}) {
  return (
    <CardContainer heading={userType} icon={icon}>
      <Tag size="lg" borderRadius="xl" colorScheme="green">
        {shortenAddress(address ?? AddressZero)}
      </Tag>
      <AddressActionButtons address={address ?? AddressZero}></AddressActionButtons>
    </CardContainer>
  );
}

export default UserTeamDisplayCard;
