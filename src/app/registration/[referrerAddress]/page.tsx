'use client';
import RegistrationUI from '@/components/RegistrationUI/RegistrationUI';
import { HStack } from '@chakra-ui/react';

function RegistrationUIPage({
  params,
}: {
  params?: {
    referrerAddress: string;
  };
}) {
  return (
    <HStack w="full" p={5}>
      <RegistrationUI
        referrerAddress={params?.referrerAddress}
        isLarge={true}
        planId={0}
      ></RegistrationUI>
    </HStack>
  );
}

export default RegistrationUIPage;
