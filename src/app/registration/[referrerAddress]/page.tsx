'use client';
import RegistrationUI from '@/components/RegistrationUI/RegistrationUI';
import { VStack } from '@chakra-ui/react';

function RegistrationUIPage({
  params,
}: {
  params?: {
    referrerAddress: string | undefined;
  };
}) {
  return (
    <VStack w="full" p={5}>
      <RegistrationUI
        referrerAddress={params?.referrerAddress}
        isLarge={true}
        planId={0}
      ></RegistrationUI>
    </VStack>
  );
}

export default RegistrationUIPage;
