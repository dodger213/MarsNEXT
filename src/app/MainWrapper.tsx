'use client';
import Footer from '@/components/Footer';
import { Nav } from '@/components/Nav/Nav';
import { VStack, useColorModeValue } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

function MainWrapper({ children }: { children: ReactNode }) {
  return (
    <VStack w="full" spacing={0}>
      <Nav />
      <VStack
        w="full"
        spacing={0}
        minH="100vh"
        align="center"
        justify="center"
      >
        {children}
      </VStack>
      <Footer></Footer>
    </VStack>
  );
}

export default MainWrapper;
