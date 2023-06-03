'use client';
import { USDTLogoSVG } from '@/assets';
import { useSupportedNetworkInfo } from '@/constants/SupportedNetworkInfo';
import { useReferralPlanInfo } from '@/hooks/ReferralHooks';
import { useGetPlanById } from '@/hooks/VariablesHooks';
import { CenterComponent } from '@/util/Ui';
import { formatNumberWithMaxDecimals } from '@/util/UtilHooks';
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
import { useAccount, useBalance, useNetwork } from 'wagmi';

function RegistrationUI({
  referrerAddress,
  isLarge,
  planId,
}: {
  referrerAddress: string | undefined;
  isLarge?: boolean;
  planId: number;
}) {
  const planObject = useGetPlanById(planId);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const currentNetwork = useSupportedNetworkInfo[chain?.id!];
  const userUSDTBalance = useBalance({
    address: address,
    token: currentNetwork?.USDT.contractAddress,
  });
  return (
    <CenterComponent
      style={{
        py: 10,
        w: [300],
      }}
    >
      <VStack minW={250} maxW={300} w="full" spacing={5}>
        <Heading>#{planId + 1}</Heading>
        <VStack>
          <Heading size="md">{planObject?.name}</Heading>
          <Divider></Divider>
        </VStack>
        <Heading size="3xl" color="orange.500">
          ${planObject.value}
        </Heading>
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
              ${planObject.value * planObject.maxLimitMultiplier}
            </Heading>
          </HStack>
        </VStack>
        <VStack>
          <Heading size="md">You have</Heading>
          <HStack>
            <Heading size="sm">
              {formatNumberWithMaxDecimals(userUSDTBalance.data?.formatted, 2)}
            </Heading>
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
