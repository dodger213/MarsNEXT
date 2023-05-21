'use client';

import { Nav } from '@/components/Nav/Nav';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, VStack, theme } from '@chakra-ui/react';

const ProviderChakra = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <VStack w="full" minH="100vh" spacing={0}>
          <Nav></Nav>
          {children}
        </VStack>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default ProviderChakra;
