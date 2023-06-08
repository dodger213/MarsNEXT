import { Center, Divider, HStack, Hide, Icon, Image, Text } from '@chakra-ui/react';
import { GiAstronautHelmet } from 'react-icons/gi';
import { RiSpaceShipFill } from 'react-icons/ri';

import { Inter, Roboto } from 'next/font/google';
import Link from 'next/link';

export const LogoFull = () => {
  return (
    <Link href="/">
      <HStack spacing={2} cursor="pointer">
        <Image src="/MarsNextLogoFull.svg" alt="logo" w={200}></Image>
      </HStack>
    </Link>
  );
};
