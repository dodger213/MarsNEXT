import {
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
  Wrap,
  useColorModeValue,
} from '@chakra-ui/react';
import { Logo } from './Logo';
import SocialMediaIcons from './SocialMediaIcons';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function Footer() {
  return (
    <VStack
      w="full"
      bg={useColorModeValue('white', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      justify="flex-start"
      align="flex-start"
      p={5}
    >
      <Wrap
        w="full"
        py={5}
        justify={['center', 'center', 'center', 'space-between']}
        align="center"
        spacing={5}
      >
        <Logo />
        <Text>© 2023 MarsNext. All rights reserved</Text>
        <SocialMediaIcons />
      </Wrap>
      <Flex direction="column" gap={5}>
        <Heading size="lg" color="orange.500">
          Contract Address
        </Heading>
        <Flex direction="column" gap={2}>
          <Button borderRadius="xl" size="lg" rightIcon={<ExternalLinkIcon/>}>Referral Contract</Button>
          <Button borderRadius="xl" size="lg" rightIcon={<ExternalLinkIcon/>}>Variables Contract</Button>
          <Button borderRadius="xl" size="lg" rightIcon={<ExternalLinkIcon/>}>Core Members Contract</Button>
        </Flex>
      </Flex>
    </VStack>
  );
}
