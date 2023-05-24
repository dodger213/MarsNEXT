import { Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { ConnectWalletButton } from '../ConnectWalletButton'

function NoWalletComponent() {
  return (
    <VStack spacing={5}>
      <VStack>
        <Heading color="red" textAlign="center">You are not connected!</Heading>
        <Heading size="md" textAlign="center">Please connect Wallet to continue.</Heading>
      </VStack>
      <ConnectWalletButton />
    </VStack>
  )
}

export default NoWalletComponent