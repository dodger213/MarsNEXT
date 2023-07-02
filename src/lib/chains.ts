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
      address: '0x9667b2B6B9E1490E9DddAa774cF8800cC79d4555',
      blockCreated: 1,
    },
  },
} as const satisfies Chain

export const PolygonMainnetTenderly = {
  id: 137,
  name: 'Polygon Mainnet',
  network: 'POLYGON',
  nativeCurrency: {
    decimals: 18,
    name: 'MATIC',
    symbol: 'MATIC',
  },
  rpcUrls: {
    public: { http: ['https://rpc.tenderly.co/fork/f98b9155-c895-41d8-a676-0a84fb5230ca'] },
    default: { http: ['https://rpc.tenderly.co/fork/f98b9155-c895-41d8-a676-0a84fb5230ca'] },
  },
  blockExplorers: {
    etherscan: { name: 'PolygonScan', url: 'https://polygonscan.com' },
    default: { name: 'PolygonScan', url: 'https://polygonscan.com' },
  },
  contracts: {
    multicall3: {
      address: '0x9667b2B6B9E1490E9DddAa774cF8800cC79d4555',
      blockCreated: 1,
    },
  },
} as const satisfies Chain