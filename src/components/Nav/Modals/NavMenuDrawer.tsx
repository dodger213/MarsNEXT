import { AddressActionButtons } from '@/components/AddressActionButtons';
import { ColorModeSwitcher } from '@/components/ColorModeSwitcher';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Divider,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  HStack,
  Heading,
  Icon,
  IconButton,
  Spacer,
  Text,
  VStack,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { shortenAddress } from '@usedapp/core';
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { BsChevronDoubleDown, BsChevronDoubleRight } from 'react-icons/bs';
import { FaDiscord, FaGithub, FaTelegram, FaTwitter } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon';

const SocialMediaIconComponent = ({
  icon,
  link,
}: {
  icon: IconType;
  link?: string;
  key: number;
}) => {
  return (
    <Center p={2} borderWidth="thin" rounded="full" cursor="pointer">
      <Icon as={icon}></Icon>
    </Center>
  );
};

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
      <DrawerBody></DrawerBody>
      <DrawerFooter>
        <VStack w="full">
          <HStack spacing={5}>
            {socialMediaIcons?.map((icon: IconType, key: number) => {
              return (
                <SocialMediaIconComponent
                  icon={icon}
                  key={key}
                ></SocialMediaIconComponent>
              );
            })}
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
