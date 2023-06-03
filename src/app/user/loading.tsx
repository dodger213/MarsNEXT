'use client';
import { Flex, Spinner, Text, VStack } from '@chakra-ui/react';

function loading() {
  return (
    <VStack w="full" minH="100vh" justify="center">
      <Text>Loading...</Text>
      <Spinner />
    </VStack>
  );
}

export default loading;
