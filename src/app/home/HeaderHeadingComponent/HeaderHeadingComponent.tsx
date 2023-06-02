import { tagLine } from '@/constants/SupportedNetworkInfo';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export const HeaderHeadingComponent = () => {
  return (
    <VStack spacing={5} w="full">
      <VStack w={[300, 500, 700]} zIndex={0}>
        <Image
          src="/MarsNextTextLogo.svg"
          alt="MarsNext Logo"
          w={"80%"}
        ></Image>
        <Text
          fontSize={['2xl', '3xl', '4xl']}
          textAlign="center"
          px={5}
        >
          A community centric decentralized reward distribution system.
        </Text>
      </VStack>
      <Link href="/registration">
        <Button
          w={[250, 300, 400]}
          h={16}
          colorScheme="orange"
          bg="orange.500"
          _hover={{
            bg: 'orange.600',
          }}
          borderRadius={20}
          rightIcon={<ChevronRightIcon />}
          zIndex={111}
          borderBottomWidth="thick"
        >
          Launch App
        </Button>
      </Link>
    </VStack>
  );
};
