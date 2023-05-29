'use client';
import { MyVeeMainnet } from '@/lib/chains';
import {
  ChakraProvider,
  ColorModeScript,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { bsc, mainnet, polygon, localhost } from 'wagmi/chains';

const chains = [MyVeeMainnet, polygon, bsc, mainnet, localhost];
const projectId = 'e6458f63d191bf405c8476be38ec031e';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export const ProviderWeb3Modal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        defaultChain={polygon}
        chainImages={{
          50000: '/chainIcons/MyVeeMainnet.svg',
        }}
        tokenImages={{
          MYVEE: '/chainIcons/MyVeeMainnet.svg',
        }}
        themeMode={useColorModeValue('light', 'dark')}
      />
    </>
  );
};
