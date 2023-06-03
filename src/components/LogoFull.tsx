import { Center, Divider, HStack, Hide, Icon, Text } from '@chakra-ui/react';
import { GiAstronautHelmet } from 'react-icons/gi';
import { RiSpaceShipFill } from 'react-icons/ri';

import { Inter, Roboto } from 'next/font/google';
import Link from 'next/link';

export const LogoFull = () => {
  return (
    <Link href="/">
      <HStack spacing={2} cursor="pointer">
        <Icon as={RiSpaceShipFill} boxSize={7} color="red.500"></Icon>

        <Center h={5}>
          <Divider orientation="vertical" bgColor="orange.600"></Divider>
        </Center>
        <HStack
          spacing={1}
          bgGradient="linear(to-r, red.500, yellow.500, green.500)"
          bgClip="text"
          fontSize="30px"
        >
          <Text fontWeight={900}>Mars</Text>
          <Text fontFamily="mono">Next</Text>
        </HStack>
      </HStack>
    </Link>
  );
};
