import {
  HStack,
  Spacer,
  Text,
  Wrap,
  useColorModeValue,
} from '@chakra-ui/react';
import { Logo } from './Logo';
import SocialMediaIcons from './SocialMediaIcons';

export default function Footer() {
  return (
    <Wrap
      bg={useColorModeValue('white', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      w="full"
      p={5}
      justify={['center', 'center', 'center', 'space-between']}
      align="center"
      spacing={5}
    >
      <Logo />
      <Text>© 2023 MarsNext. All rights reserved</Text>
      <SocialMediaIcons />
    </Wrap>
  );
}
