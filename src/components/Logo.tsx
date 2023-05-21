import { Center, Divider, HStack, Hide, Icon, Text } from '@chakra-ui/react';
import { GiAstronautHelmet } from 'react-icons/gi';
import { RiSpaceShipFill } from 'react-icons/ri';

import { Inter, Roboto } from 'next/font/google';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/">
      <HStack spacing={2} cursor="pointer">
        <Icon as={RiSpaceShipFill} boxSize={7} color="red.500"></Icon>
        <Hide below="sm">
          <Center h={5}>
            <Divider orientation="vertical" bgColor="orange.600"></Divider>
          </Center>
          <HStack
            spacing={1}
            bgGradient="linear(to-r, red.500, yellow.500, green.500)"
            bgClip="text"
          >
            <Text fontSize="20px" fontWeight={900}>
              Mars
            </Text>
            <Text fontSize="20px" fontFamily="mono">
              Next
            </Text>
          </HStack>
        </Hide>
      </HStack>
    </Link>
  );
};
