import {
  Center,
  Divider,
  HStack,
  Hide,
  Icon,
  Image,
  Show,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { GiAstronautHelmet } from 'react-icons/gi';
import { RiSpaceShipFill } from 'react-icons/ri';

import { Inter, Roboto } from 'next/font/google';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/">
      <Hide below="sm">
        <Image src="/MarsNextLogoFull.svg" alt="logo" w={200}></Image>
      </Hide>
      <Show below="sm">
        <Image src="/MarsNextRocketLogo.svg" alt="logo" w={7}></Image>
      </Show>
    </Link>
  );
};
