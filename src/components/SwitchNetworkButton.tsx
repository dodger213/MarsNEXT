import { WalletConnectLogoSVG } from '@/assets';
import { Button } from '@chakra-ui/react';
import { useWeb3Modal } from '@web3modal/react';
import Image from 'next/image';
import React from 'react';

function SwitchNetworkButton() {
    const { isOpen, open, close, setDefaultChain } = useWeb3Modal();
  return (
    <Button
      leftIcon={
        <Image
          src={WalletConnectLogoSVG}
          alt="Wallet Connect Logo"
          width={30}
        ></Image>
      }
      borderRadius="full"
      onClick={async () => {
        await open({route: 'SelectNetwork'});
      }}
    >
      Switch Network
    </Button>
  );
}

export default SwitchNetworkButton;
