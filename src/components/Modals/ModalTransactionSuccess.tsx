import { CurrentNetworkInfo } from '@/constants/SupportedNetworkInfo';
import { sliceTransactionHash } from '@/util/UtilHooks';
import {
  Button,
  Divider,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AddressActionButtons } from '../AddressActionButtons';
import { ExternalLinkIcon } from '@chakra-ui/icons';

function ModalTransactionSuccess({
  onClose,
  transactionHash,
  currentNetwork
}: {
  onClose: () => void;
  transactionHash: string;
  currentNetwork: CurrentNetworkInfo
}) {
  return (
    <>
      <ModalHeader>Transaction Success</ModalHeader>
      <Divider />
      <ModalBody>
        <VStack w="full" py={5}>
          <Heading size="md">Transaction Hash</Heading>
          <Text>{sliceTransactionHash(transactionHash)}</Text>
          <Button as="a" borderRadius="xl" rightIcon={<ExternalLinkIcon/>} href={`${currentNetwork.native.blockExplorers?.default.url}/tx/${transactionHash}`} target='_blank'>Open in explorer</Button>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} borderRadius="xl">Close</Button>
      </ModalFooter>
    </>
  );
}

export default ModalTransactionSuccess;
