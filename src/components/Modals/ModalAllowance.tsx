import { AddressZero } from '@/constants/ContractAddress';
import {
  SupportedTokenInterface,
  supportedNetworkInfo,
} from '@/constants/SupportedNetworkInfo';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { shortenAddress } from '@usedapp/core';
import { FaArrowRight } from 'react-icons/fa';
import {
  erc20ABI,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';

export const ModalAllowance = ({
  spenderAddress,
  valueToApprove,
  onClose,
  tokenObject,
}: {
  spenderAddress: `0x${string}`;
  valueToApprove: bigint;
  onClose: () => void;
  tokenObject: SupportedTokenInterface;
}) => {
  const { chain } = useNetwork();
  const currentNetwork = supportedNetworkInfo[chain ? chain.id : 137];

  const { config, error: prepareHookError } = usePrepareContractWrite({
    address: currentNetwork?.USDT.contractAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [spenderAddress, valueToApprove],
  });

  const {
    data,
    isLoading,
    isSuccess,
    write,
    status,
    reset,
    writeAsync,
    error: writeContractHookError,
  } = useContractWrite(config);

  return (
    <>
      <ModalHeader>Insufficient Allowance</ModalHeader>
      <Divider />
      <ModalBody py={10}>
        <VStack w="full" spacing={5}>
          <HStack>
            <Heading size="lg">USDT</Heading>
            <Spacer />
            <Icon as={FaArrowRight}></Icon>
            <Spacer />
            <Heading size="lg">
              {Number(valueToApprove) / 10 ** tokenObject?.decimals}
            </Heading>
            <Image
              src="/token-icons/usdt.svg"
              boxSize={10}
              alt="usdt logo"
            ></Image>
          </HStack>
          <HStack>
            <Text textAlign="center">
              Please allow the transaction to continue.{' '}
              <Link
                href="https://ethereum.org/en/developers/tutorials/understand-the-erc-20-token-smart-contract/#:~:text=The%20ERC%2D20%20standard%20allows,spend%20on%20behalf%20of%20owner%20."
                color="twitter.500"
                textDecoration="underline"
                target="_blank"
              >
                Learn more
              </Link>
            </Text>
          </HStack>
          <VStack>
            <Heading size="md">Address to approve</Heading>
            <Text>
              {spenderAddress
                ? shortenAddress(spenderAddress)
                : shortenAddress(AddressZero)}
            </Text>
          </VStack>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <HStack>
          <Button
            borderRadius="xl"
            variant="outline"
            colorScheme="red"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            rightIcon={<ChevronRightIcon />}
            borderRadius="xl"
            colorScheme="green"
            onClick={async () => writeAsync?.()}
            isLoading={isLoading}
            loadingText="Confirming"
          >
            Confirm
          </Button>
        </HStack>
      </ModalFooter>
    </>
  );
};
