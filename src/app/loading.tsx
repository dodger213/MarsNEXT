'use client';
import { Flex, Spinner, Text, VStack } from '@chakra-ui/react';

function loading() {
  return (
    <VStack w="min-content">
      <Text>Loading...</Text>
      <Spinner />
    </VStack>
  );
}

export default loading;
