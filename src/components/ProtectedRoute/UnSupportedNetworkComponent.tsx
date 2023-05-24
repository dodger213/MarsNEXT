import React from 'react'
import { Heading, VStack } from '@chakra-ui/react'
import { ConnectWalletButton } from '../ConnectWalletButton'
import SwitchNetworkButton from '../SwitchNetworkButton'

function UnSupportedNetworkComponent() {
  return (
    <VStack spacing={5}>
      <VStack>
        <Heading color="red" textAlign="center">UnSupported Network!</Heading>
        <Heading size="md" textAlign="center">Please switch to supported network.</Heading>
      </VStack>
      <SwitchNetworkButton />
    </VStack>
  )
}

export default UnSupportedNetworkComponent