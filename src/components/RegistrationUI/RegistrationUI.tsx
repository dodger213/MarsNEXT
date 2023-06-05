'use client';
import { USDTLogoSVG } from '@/assets';
import { AddressZero } from '@/constants/ContractAddress';
import { supportedNetworkInfo } from '@/constants/SupportedNetworkInfo';
import { useGetAllowance } from '@/hooks/ERC20Token';
import { useGetUserTeam } from '@/hooks/ReferralHooks';
import { useGetAdminAddress, useGetPlanById } from '@/hooks/VariablesHooks';
import { CenterComponent } from '@/util/Ui';
import { formatNumberWithMaxDecimals, isAddressValid } from '@/util/UtilHooks';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spacer,
  Tag,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { shortenAddress } from '@usedapp/core';
import Image from 'next/image';
import { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useAccount, useBalance, useContractWrite, useNetwork } from 'wagmi';
import { ModalAllowance } from '../Modals/ModalAllowance';
import ModalConfirmTransactions from '../Modals/ModalConfirmTransactions';
import ModalTransactionSuccess from '../Modals/ModalTransactionSuccess';

function RegistrationUI({
  referrerAddress,
  isLarge,
  planId,
}: {
  referrerAddress: string | undefined;
  isLarge?: boolean;
  planId: number;
}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const planObject = useGetPlanById(planId);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const userTeamObject = useGetUserTeam(address);
  const currentNetwork = supportedNetworkInfo[chain?.id!];
  const defaultReferrer = useGetAdminAddress();
  const currentReferrer = referrerAddress ? referrerAddress : AddressZero;
  const userUSDTBalance = useBalance({
    address: address,
    token: currentNetwork?.USDT.contractAddress,
  });

  const userNativeBalance = useBalance({
    address: address,
  });

  const userAllowanceValue = useGetAllowance(
    currentNetwork?.USDT.contractAddress,
    address!,
    currentNetwork?.referralContractAddress!
  );

  const isUserAllowanceSufficient =
    userAllowanceValue >= planObject?.value ? true : false;

  const cardBackgroundColor = useColorModeValue('green.50', 'gray.900');

  const {
    data,
    isLoading,
    isSuccess,
    write,
    status,
    reset,
    writeAsync,
    error: writeContractHookError,
    isError,
    isIdle,
  } = useContractWrite({
    address: currentNetwork?.referralContractAddress,
    abi: currentNetwork?.referralContractInterface,
    functionName: 'registrationWithToken',
    args: [currentReferrer, planId, currentNetwork?.USDT?.contractAddress],
    chainId: chain?.id,
  });

  const errors = {
    isReferrerAddressEmpty: !referrerAddress ? true : false,
    isReferrerAddressValid: referrerAddress
      ? isAddressValid(referrerAddress)
      : false,
    isUserAlreadyHaveReferrer:
      userTeamObject?.referrer !== AddressZero ? true : false,
    isUserHaveSufficientTokenBalance:
      Number(userUSDTBalance?.data?.formatted ?? 0) >= planObject?.value
        ? true
        : false,
    isUserHaveSufficientAllowance: isUserAllowanceSufficient,
  };

  const proceedTransaction = () => {
    if (!errors.isUserHaveSufficientTokenBalance) {
      toast({
        title: 'Insufficient Balance.',
        description: 'You dont have enough USDT to register.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      onOpen();
    }
  };

  const handleTransaction = async () => {
    try {
      await writeAsync();
      if (status === 'success') {
        toast({
          title: 'Transaction Success',
          description: '',
          status: 'success',
          duration: 10000,
          isClosable: true,
        });
        setTimeout(() => {
          reset();
          onClose();
        }, 20000);
      }
    } catch (err: any) {
      toast({
        title: err.message,
        description: '',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {}, [isSuccess, toast, onClose, reset]);

  return (
    <>
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
            bgColor={cardBackgroundColor}
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
                {formatNumberWithMaxDecimals(
                  userUSDTBalance.data?.formatted,
                  2
                )}
              </Heading>
              <Image src={USDTLogoSVG} alt="USDT Logo" width={20}></Image>
            </HStack>
          </VStack>
          {errors.isUserAlreadyHaveReferrer ? (
            <VStack>
              <Heading size="md" color="red">
                Referrer Already set
              </Heading>
              <HStack>
                <Heading size="sm">
                  {shortenAddress(userTeamObject?.referrer)}
                </Heading>
                <Icon as={FaUser}></Icon>
              </HStack>
            </VStack>
          ) : (
            !errors.isReferrerAddressEmpty &&
            (errors.isReferrerAddressValid ? (
              <VStack>
                <Heading size="md">Referrer Address</Heading>
                <HStack>
                  <Heading size="sm">
                    {shortenAddress(referrerAddress!)}
                  </Heading>
                  <Icon as={FaUser}></Icon>
                </HStack>
              </VStack>
            ) : (
              <VStack spacing={0}>
                <Heading size="sm" color="red">
                  Invalid Referrer Address
                </Heading>
                <Text fontSize="sm">Default Referrer will be used</Text>
                <HStack>
                  <Heading size="sm">
                    {defaultReferrer && shortenAddress(defaultReferrer)}
                  </Heading>
                  <Icon as={FaUser}></Icon>
                </HStack>
              </VStack>
            ))
          )}

          <Button
            borderRadius="xl"
            rightIcon={<ChevronRightIcon />}
            colorScheme="orange"
            bgColor="orange.500"
            _hover={{
              bgColor: 'orange.400',
            }}
            onClick={proceedTransaction}
            isDisabled={isLoading}
          >
            Register Now
          </Button>
        </VStack>
      </CenterComponent>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={['xs', 'md', 'lg']}
      >
        <ModalOverlay />
        <ModalContent
          borderRadius="25px"
          // bgColor={useColorModeValue('whiteAlpha.900', 'blackAlpha.200')}
          backdropFilter="blur(20px)"
          borderWidth={1}
          borderBottomWidth={5}
        >
          <ModalCloseButton />
          {!isSuccess ? (
            !errors.isUserHaveSufficientAllowance ? (
              <ModalAllowance
                onClose={onClose}
                spenderAddress={currentNetwork?.referralContractAddress!}
                valueToApprove={BigInt(
                  planObject?.value * 10 ** currentNetwork?.USDT.decimals
                )}
                tokenObject={currentNetwork?.USDT}
              />
            ) : (
              <ModalConfirmTransactions
                onClose={onClose}
                onConfirm={handleTransaction}
                transactionName="Register"
                outCurrencyObject={currentNetwork?.USDT}
                outCurrencyValue={planObject?.value}
                buttonProps={{
                  isLoading: isLoading,
                  isDisabled: isLoading,
                  loadingText: 'Confirming',
                }}
              ></ModalConfirmTransactions>
            )
          ) : (
            <ModalTransactionSuccess
              onClose={() => {
                onClose();
                reset();
              }}
              transactionHash={`${data?.hash}`}
              currentNetwork={currentNetwork}
            ></ModalTransactionSuccess>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default RegistrationUI;
