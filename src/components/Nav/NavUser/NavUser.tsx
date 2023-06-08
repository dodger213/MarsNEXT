import {
  Divider,
  HStack,
  IconButton,
  Spacer,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { ConnectWalletButton } from '../../ConnectWalletButton';
import { AddressActionButtons } from '../../AddressActionButtons';
import { FaSignOutAlt } from 'react-icons/fa';
import NavUserMenu from '../NavUserMenu';
import SocialMediaIcons from '@/components/SocialMediaIcons';

function NavUser({userAddress, onClick}:{userAddress: string, onClick?: () => void}) {
  return (
    <VStack w="full" flex={1}>
      <VStack
        w="full"
        py={10}
        bgColor={useColorModeValue('white', 'whiteAlpha.200')}
        borderRadius="50px"
        borderWidth="0.5px"
        borderBottomWidth={5}
      >
        <Jazzicon seed={jsNumberForAddress(`${1111}`)} diameter={50}></Jazzicon>
        <ConnectWalletButton></ConnectWalletButton>
        <AddressActionButtons address=""></AddressActionButtons>
      </VStack>
      <VStack
        w="full"
        py={10}
        bgColor={useColorModeValue('white', 'whiteAlpha.200')}
        borderRadius="50px"
        flex={1}
        borderWidth="0.5px"
        borderBottomWidth={5}
        justify="center"
      >
        <NavUserMenu userAddress={userAddress} onClick={onClick}></NavUserMenu>
      </VStack>
      <VStack
        w="full"
        py={10}
        bgColor={useColorModeValue('white', 'whiteAlpha.200')}
        borderRadius="50px"
        p={5}
        borderWidth="0.5px"
        borderBottomWidth={5}
      >
        <SocialMediaIcons/>
      </VStack>
    </VStack>
  );
}

export default NavUser;
