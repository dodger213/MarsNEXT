import { Heading, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import { ConnectWalletButton } from '../ConnectWalletButton'
import { motion } from 'framer-motion'

const MotionImage = motion(Image)

function NoWalletComponent() {
  return (
    <VStack spacing={5}>
      <VStack>
        <MotionImage animate={{
          y: [1, 7, 1]
        }} transition={{
          repeat: Infinity,
          duration: 2
        }}  src="/errors-svgs/walletNotConnectedCat.svg" w={[200, 300]}></MotionImage>
        <Heading color="red" textAlign="center">You are not connected!</Heading>
        <Heading size="md" textAlign="center">Please connect Wallet to continue.</Heading>
      </VStack>
      <ConnectWalletButton />
    </VStack>
  )
}

export default NoWalletComponent