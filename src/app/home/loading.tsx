"use client"
import { Spinner, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const Loading = () => {
  return (
    <VStack w="full" minH="100vh" justify="center">
      <Text>Loading...</Text>
      <Spinner />
    </VStack>
  );
};
