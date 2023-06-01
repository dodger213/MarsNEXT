import { AddressZero } from '@/constants/SupportedNetworkInfo';
import {
  Button,
  Center,
  Divider,
  HStack,
  Heading,
  Icon,
  Tag,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { shortenAddress } from '@usedapp/core';
import React from 'react';
import { FcReadingEbook } from 'react-icons/fc';
import { AddressActionButtons } from './AddressActionButtons';
import { CardContainer } from './CardContainer';
import { IconType } from 'react-icons';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import Link from 'next/link';

function UserTeamDisplayCard({
  userType,
  icon,
  address,
}: {
  userType: string;
  icon: IconType;
  address: string | undefined;
}) {
  return (
    <CardContainer heading={userType} icon={icon}>
      <Tag size="lg" borderRadius="xl" colorScheme="green">
        {shortenAddress(address ?? AddressZero)}
      </Tag>
      <AddressActionButtons
        address={address ?? AddressZero}
      ></AddressActionButtons>
      <Button
        borderRadius="xl"
        rightIcon={<ExternalLinkIcon />}
        as={Link}
        href={`/user/${address}/team`}
        target="_blank"
      >
        View Account Stats
      </Button>
    </CardContainer>
  );
}

export default UserTeamDisplayCard;
