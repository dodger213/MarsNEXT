'use client';
import NavUser from '@/components/Nav/NavUser/NavUser';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import {
  Flex,
  HStack,
  Hide,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    userAddress: string;
  };
}) {
  return (
    <ProtectedRoute>
      <HStack w="full" flex={1} py={100} spacing={5} px={5} align="flex-start">
        <Hide below="md">
          <VStack
            h="90vh"
            minH={600}
            w={250}
            borderWidth="0.5px"
            borderBottomWidth={5}
            borderRadius="50px"
            p={2}
            bgColor={useColorModeValue('gray.100', 'transparent')}
          >
            <NavUser userAddress={params.userAddress}></NavUser>
          </VStack>
        </Hide>
        <VStack
          w="full"
          minH="80vh"
          borderWidth="0.5px"
          borderBottomWidth={5}
          borderRadius="50px"
          p={[5, 10]}
          bgColor={useColorModeValue('gray.100', 'transparent')}
        >
          {children}
        </VStack>
      </HStack>
    </ProtectedRoute>
  );
}

export default Layout;
