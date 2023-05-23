import {
  Box,
  chakra,
  Container,
  HStack,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaTelegram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ReactNode } from 'react';
import { Logo } from './Logo';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      target="_blank"
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <HStack
      bg={useColorModeValue('white', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      w="full"
      p={5}
      borderTopRadius="3xl"
      borderTopWidth="thick"
    >
      <Logo />
      <Spacer />
      <Text>© 2023 MarsNext. All rights reserved</Text>
      <Spacer />
      <Stack direction={'row'} spacing={6}>
        <SocialButton
          label={'Twitter'}
          href={'https://twitter.com/letstothemars'}
        >
          <FaTwitter />
        </SocialButton>
        <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
        <SocialButton label={'Instagram'} href={'https://t.me/letstothemars'}>
          <FaTelegram />
        </SocialButton>
      </Stack>
    </HStack>
  );
}
