import { Chain } from 'wagmi'
 
export const MyVeeMainnet = {
  id: 50_000,
  name: 'MyVee Mainnet',
  network: 'myvee',
  nativeCurrency: {
    decimals: 18,
    name: 'MyVee',
    symbol: 'MYVEE',
  },
  rpcUrls: {
    public: { http: ['https://rpc.blockchain.myveex.com'] },
    default: { http: ['https://rpc.blockchain.myveex.com'] },
  },
  blockExplorers: {
    etherscan: { name: 'MyVeeScan', url: 'https://myveescan.com' },
    default: { name: 'MyVeeScan', url: 'https://myveescan.com' },
  },
  contracts: {
    multicall3: {
      address: '0x8170370626037450070E0023F82420F428891214',
      blockCreated: 10_000,
    },
  },
} as const satisfies Chain