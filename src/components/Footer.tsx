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
import { BsFilePdfFill } from 'react-icons/bs';
import { LogoFull } from './LogoFull';
import { polygon } from 'wagmi/chains';
import { supportedNetworkInfo } from '@/constants/SupportedNetworkInfo';

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
        spacing={10}
      >
        <VStack spacing={5}>
          <LogoFull />
          <Text>© 2023 MarsNext. All rights reserved</Text>
        </VStack>
        <VStack spacing={5}>
          <Heading size="md" color="orange.500" textAlign="center">
            Follow us on Social Media
          </Heading>
          <SocialMediaIcons />
        </VStack>
        <VStack spacing={5}>
          <Heading size="md" color="orange.500" textAlign="center">
            Contract Address
          </Heading>
          <Flex direction="column" gap={2}>
            <Button
              as="a"
              borderRadius="xl"
              rightIcon={<ExternalLinkIcon />}
              href={`${polygon.blockExplorers.default.url}/address/${supportedNetworkInfo[137].referralContractAddress}`}
              target="_blank"
            >
              Referral Contract
            </Button>
            {/* <Button borderRadius="xl" rightIcon={<ExternalLinkIcon />}>
              Variables Contract
            </Button> */}
            {/* <Button borderRadius="xl" rightIcon={<ExternalLinkIcon />}>
              Core Members Contract
            </Button> */}
          </Flex>
        </VStack>
        <VStack spacing={5}>
          <Heading size="md" color="orange.500" textAlign="center">
            Project Discription
          </Heading>
          <Button
            borderRadius="xl"
            rightIcon={<BsFilePdfFill />}
            as="a"
            href="/MarsNextProjectDiscription.pdf"
            target="_blank"
          >
            Download PDF
          </Button>
        </VStack>
      </Wrap>
    </VStack>
  );
}
