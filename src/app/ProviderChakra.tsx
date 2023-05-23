'use client';

import Footer from '@/components/Footer';
import { Nav } from '@/components/Nav/Nav';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, VStack } from '@chakra-ui/react';

const ProviderChakra = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
};

export default ProviderChakra;
