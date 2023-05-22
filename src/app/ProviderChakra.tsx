'use client';

import Footer from '@/components/Footer';
import { Nav } from '@/components/Nav/Nav';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, Text, VStack, theme } from '@chakra-ui/react';

const ProviderChakra = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <VStack w="full" spacing={0}>
          {/* <VStack w="full" bgColor="twitter.500">
            <Text fontSize="sm">For a very limited time every registration will get some MARTIAN tokens as reward.</Text>
          </VStack> */}
          <Nav></Nav>
          {children}
          <Footer/>
        </VStack>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default ProviderChakra;
