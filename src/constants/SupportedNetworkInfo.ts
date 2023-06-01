import { BUSDLogoSVG, USDTLogoSVG } from '@/assets';
import { MyVeeMainnet } from '@/lib/chains';
import { Chain, bsc, localhost, polygon } from 'wagmi/chains';
import {
  BUSD,
  ContractObject,
  CoreMembersV1ContractObject,
  ReferralV1ContractObject,
  USDT,
  VariablesV1ContractObject,
} from './ContractAddress';
import { Interface } from 'ethers/lib/utils';

export const projectName = 'MarsNext';
export const tagLine =
  'A reward centric decentralized protocol only made for community.';
export const AddressZero: `0x${string}` =
  '0x0000000000000000000000000000000000000000';
export const AddressDead: `0x${string}` =
  '0x000000000000000000000000000000000000dEaD';

export const supportedCurrencyIcons = [
  '/token-icons/usdt.svg',
  '/token-icons/busd.svg',
];

interface Token {
  contractAddress: `0x${string}`;
  contractABI: any; // Replace `any` with the actual ABI type
  name: string;
  symbol: string;
  decimals: number;
  logo: string; // Assuming `USDTLogoSVG` and `BUSDLogoSVG` are strings representing the SVGs
}

interface NetworkInfo {
  variablesContractAddress?: `0x${string}`;
  referralContractAddress?: `0x${string}`;
  coreMembersContractAddress?: `0x${string}`;
  USDT: Token;
  BUSD: Token;
  native: any; // Replace `any` with the type representing the `polygon` object
  logo: string;
}

interface SupportedNetworkInfo {
  [key: number]: NetworkInfo;
}

export const useSupportedNetworkInfo: SupportedNetworkInfo = {
  [polygon.id]: {
    variablesContractAddress: VariablesV1ContractObject.polygonAddress,
    referralContractAddress: ReferralV1ContractObject.polygonAddress,
    coreMembersContractAddress: CoreMembersV1ContractObject.polygonAddress,
    ['USDT']: {
      contractAddress: USDT.polygonAddress,
      contractABI: USDT.abi,
      name: 'USDT',
      symbol: 'USDT',
      decimals: 6,
      logo: USDTLogoSVG,
    },
    ['BUSD']: {
      contractAddress: USDT.polygonAddress,
      contractABI: BUSD.abi,
      name: 'BUSD',
      symbol: 'BUSD',
      decimals: 18,
      logo: BUSDLogoSVG,
    },
    native: polygon,
    logo: "/chainIcons/polygonChainLogo.svg"
  },
  [bsc.id]: {
    variablesContractAddress: VariablesV1ContractObject?.bscAddress,
    referralContractAddress: ReferralV1ContractObject?.bscAddress,
    coreMembersContractAddress: CoreMembersV1ContractObject?.bscAddress,
    ['USDT']: {
      contractAddress: USDT.bscAddress,
      contractABI: USDT.abi,
      name: 'USDT',
      symbol: 'USDT',
      decimals: 18,
      logo: USDTLogoSVG,
    },
    ['BUSD']: {
      contractAddress: BUSD.bscAddress,
      contractABI: BUSD.abi,
      name: 'BUSD',
      symbol: 'BUSD',
      decimals: 18,
      logo: BUSDLogoSVG,
    },
    native: bsc,
    logo: "/chainIcons/bscSmartChainLogo.svg"
  },
  [MyVeeMainnet.id]: {
    variablesContractAddress: VariablesV1ContractObject?.myveeAddress,
    referralContractAddress: ReferralV1ContractObject?.myveeAddress,
    coreMembersContractAddress: CoreMembersV1ContractObject?.myveeAddress,
    ['USDT']: {
      contractAddress: USDT.myveeAddress,
      contractABI: USDT.abi,
      name: 'Tether',
      symbol: 'USDT',
      decimals: 18,
      logo: USDTLogoSVG,
    },
    ['BUSD']: {
      contractAddress: BUSD.myveeAddress,
      contractABI: BUSD.abi,
      name: 'BUSD',
      symbol: 'BUSD',
      decimals: 18,
      logo: BUSDLogoSVG,
    },
    native: MyVeeMainnet,
    logo: "/chainIcons/MyVeemainnet.svg"
  },
};
