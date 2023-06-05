'use client';
import { ReactNode } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import NoWalletComponent from './NoWalletComponent';
import UnSupportedNetworkComponent from './UnSupportedNetworkComponent';
import { VStack } from '@chakra-ui/react';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { chain } = useNetwork();
  const { address } = useAccount();

  return (
    <VStack w="full" minH="100vh" justify="center">
      {!address ? (
        <NoWalletComponent />
      ) : chain?.unsupported ? (
        <UnSupportedNetworkComponent />
      ) : (
        children
      )}
    </VStack>
  );
}

export default ProtectedRoute;
