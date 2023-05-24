import RegistrationUI from '@/components/RegistrationUI/RegistrationUI';
import React from 'react';

function RegistrationUIPage({
  params,
}: {
  params?: {
    referrerAddress: string;
  };
}) {
  return (
    <RegistrationUI referrerAddress={params?.referrerAddress} isLarge={true} planId={0}></RegistrationUI>
  );
}

export default RegistrationUIPage;
