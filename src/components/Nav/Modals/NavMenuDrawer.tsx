import { AddressActionButtons } from '@/components/AddressActionButtons';
import { ColorModeSwitcher } from '@/components/ColorModeSwitcher';
import SocialMediaIcons from '@/components/SocialMediaIcons';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Divider,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  HStack,
  Heading,
  IconButton,
  Spacer,
  Text,
  VStack,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { shortenAddress } from '@usedapp/core';
import { IconType } from 'react-icons';
import { FaDiscord, FaGithub, FaTelegram, FaTwitter } from 'react-icons/fa';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import NavUserMenu from '../NavUserMenu';

export const NavMenuDrawer = ({
  address,
  onClose,
}: {
  address: string | undefined;
  onClose: () => void;
}) => {
  const { colorMode } = useColorMode();
  const JazziconSize = useBreakpointValue([25, 30, 40]);
  const socialMediaIcons: IconType[] = [
    FaTwitter,
    FaTelegram,
    FaGithub,
    FaDiscord,
  ];
  const iconButtonIcon = useBreakpointValue([
    <ChevronDownIcon key={1} />,
    <ChevronDownIcon key={2} />,
    <ChevronRightIcon key={3} />,
  ]);
  return (
    <>
      <DrawerHeader>
        <HStack w="full">
          <Spacer />
          <IconButton
            aria-label="Menu Close Button"
            icon={iconButtonIcon}
            variant="outline"
            w="fit-content"
            borderColor={useColorModeValue('gray.500', 'white')}
            opacity={0.5}
            size="sm"
            _hover={{
              bg: 'transparent',
              opacity: 1,
            }}
            onClick={onClose}
            rounded="full"
          />
        </HStack>
        {address && (
          <HStack>
            <Jazzicon
              diameter={JazziconSize}
              seed={jsNumberForAddress(address)}
            ></Jazzicon>
            <Text fontWeight={400} fontSize={['sm', 'md']}>
              {shortenAddress(address)}
            </Text>
            <AddressActionButtons address={address} />
          </HStack>
        )}
      </DrawerHeader>
      <DrawerBody>
        <Flex h="full" align="center">
        {address && <NavUserMenu userAddress={address} />}
        </Flex>
      </DrawerBody>
      <DrawerFooter>
        <VStack w="full" spacing={5}>
          <HStack spacing={5}>
            <SocialMediaIcons />
          </HStack>
          <Divider />
          <HStack w="full">
            <Heading size="sm">
              {colorMode === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </Heading>
            <Spacer />
            <ColorModeSwitcher />
          </HStack>
        </VStack>
      </DrawerFooter>
    </>
  );
};
