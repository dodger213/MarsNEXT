'use client';
import { USDTLogoSVG } from '@/assets';
import { PlanInfoType, useReferralPlanInfo } from '@/hooks/ReferralHooks';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Spacer,
  Tag,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

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
    <Card w={isLarge ? 270 : 250} borderRadius="50px" boxShadow="2xl">
      <CardHeader textAlign="center" fontWeight={900}>
        {planInfo.name}
      </CardHeader>
      <Divider opacity={0.5}></Divider>
      <CardBody>
        <VStack w="full" spacing={5} p={0}>
          <Heading textAlign="center" w="full" size="3xl" color="orange.500">
            ${planInfo.value}
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
        </VStack>
      </CardBody>
      <CardFooter justify="center">
        <Button
          w={200}
          borderRadius="xl"
          colorScheme="orange"
          bgColor="orange.500"
          _hover={{
            bg: 'orange.600',
          }}
          h={14}
          rightIcon={<ChevronRightIcon />}
        >
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RegistrationUI;
