'use client';
import {
  Divider,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';
import { FcConferenceCall } from 'react-icons/fc';

function page({
  params,
}: {
  params: {
    userAddress: string | undefined;
  };
}) {
  return (
    <VStack w="full" direction="column" gap={10}>
      <VStack>
        <HStack>
          <Icon as={FcConferenceCall} boxSize={10}></Icon>
          <Heading color="orange.500">Team</Heading>
        </HStack>
        <Divider></Divider>
      </VStack>
      <Wrap w="full" justify="center" spacing={5}></Wrap>
    </VStack>
  );
}

export default page;
