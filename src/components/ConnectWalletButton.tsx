import { WalletConnectLogoSVG } from '@/assets';
import { Button, useBreakpointValue } from '@chakra-ui/react';
import { shortenAddress } from '@usedapp/core';
import { useWeb3Modal } from '@web3modal/react';
import Image from 'next/image';
import React from 'react';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { useAccount } from 'wagmi';

export const ConnectWalletButton = () => {
  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();
  const { address } = useAccount();
  const conectWalletText = useBreakpointValue([
    'Conect',
    'Conect',
    'Connect Wallet',
  ]);
  return (
    <Button
      onClick={async () => {
        await open();
      }}
      leftIcon={
        address ? (
          <Jazzicon seed={jsNumberForAddress(`${address}`)}></Jazzicon>
        ) : (
          <Image
            src={WalletConnectLogoSVG}
            alt="Wallet Connect Icon"
            width={30}
          ></Image>
        )
      }
      variant="solid"
      rounded="full"
    >
      {address ? shortenAddress(address) : conectWalletText}
    </Button>
  );
};
