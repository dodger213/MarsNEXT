'use client';
import { USDTLogoSVG } from '@/assets';
import { useReferralPlanInfo } from '@/hooks/ReferralHooks';
import { CenterComponent } from '@/util/Ui';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  HStack,
  Heading,
  Spacer,
  Tag,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';

function RegistrationUI({
  referrerAddress,
  isLarge,
  planId,
}: {
  referrerAddress: string | undefined;
  isLarge?: boolean;
  planId: number;
}) {
  const planInfo = useReferralPlanInfo(planId);
  return (
    <CenterComponent
      style={{
        py: 10,
      }}
    >
      <VStack minW={250} maxW={300} w="full" spacing={5}>
        <VStack>
          <Heading size="md">Beginner</Heading>
          <Divider></Divider>
        </VStack>
        <Heading size="3xl" color="orange.500">${planInfo.value}</Heading>
        <VStack
          w="full"
          spacing={5}
          p={3}
          bgColor={useColorModeValue('green.50', 'gray.900')}
          borderRadius="3xl"
        >
          <HStack w="full">
            <Tag colorScheme="green">Selected Coin</Tag>
            <Spacer />
            <HStack spacing={0} cursor="pointer">
              <Image src={USDTLogoSVG} alt="USDT Logo" width={30}></Image>
              <ChevronDownIcon />
            </HStack>
          </HStack>
          <HStack w="full">
            <Tag colorScheme="orange">Max Limit</Tag>
            <Spacer />
            <Heading size="sm">
              ${planInfo.value * planInfo.maxLimitMutiplier}
            </Heading>
          </HStack>
        </VStack>
        <VStack>
          <Heading size="md">You have</Heading>
          <HStack>
            <Heading size="sm">0.00001</Heading>
            <Image src={USDTLogoSVG} alt="USDT Logo" width={20}></Image>
          </HStack>
        </VStack>
        <Button
          borderRadius="xl"
          rightIcon={<ChevronRightIcon />}
          colorScheme="orange"
          bgColor="orange.500"
          _hover={{
            bgColor: 'orange.400',
          }}
        >
          Register Now
        </Button>
      </VStack>
    </CenterComponent>
  );
}

export default RegistrationUI;
