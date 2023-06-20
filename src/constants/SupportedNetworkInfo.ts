import { BUSDLogoSVG, USDTLogoSVG } from '@/assets';
import { MyVeeMainnet } from '@/lib/chains';
import { Chain, bsc, localhost, polygon } from 'wagmi/chains';
import {
  BUSD,
  ContractObject,
  CoreMembersV1ContractObject,
  ReferralV1ContractObject,
  StakingContractObject,
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

export interface SupportedTokenInterface {
  contractAddress: `0x${string}`;
  contractABI: any; // Replace `any` with the actual ABI type
  name: string;
  symbol: string;
  decimals: number;
  logo: string; // Assuming `USDTLogoSVG` and `BUSDLogoSVG` are strings representing the SVGs
}

export interface CurrentNetworkInfo {
  variablesContractAddress?: `0x${string}`;
  variablesContractInterface?: any;
  referralContractAddress?: `0x${string}`;
  referralContractInterface: any;
  stakingContractAddress: `0x${string}`;
  stakingContractInterface: any;
  coreMembersContractAddress?: `0x${string}`;
  coreMembersContractInterface?: any;

  USDT: SupportedTokenInterface;
  BUSD: SupportedTokenInterface;
  native: Chain; // Replace `any` with the type representing the `polygon` object
  logo: string;
}

export interface SupportedNetworkInfo {
  [key: number]: CurrentNetworkInfo;
}

export const supportedNetworkInfo: SupportedNetworkInfo = {
  [polygon.id]: {
    variablesContractAddress: VariablesV1ContractObject.polygonAddress,
    variablesContractInterface: VariablesV1ContractObject.abi,
    referralContractAddress: ReferralV1ContractObject.polygonAddress,
    referralContractInterface: ReferralV1ContractObject.abi,
    stakingContractAddress: StakingContractObject.polygonAddress,
    stakingContractInterface: StakingContractObject?.abi,
    coreMembersContractAddress: CoreMembersV1ContractObject.polygonAddress,
    coreMembersContractInterface: CoreMembersV1ContractObject.abi,
    ['USDT']: {
      contractAddress: USDT.polygonAddress,
      contractABI: USDT.abi,
      name: 'USDT',
      symbol: 'USDT',
      decimals: 6,
      logo: '/token-icons/usdt.svg',
    },
    ['BUSD']: {
      contractAddress: BUSD.polygonAddress,
      contractABI: BUSD.abi,
      name: 'BUSD',
      symbol: 'BUSD',
      decimals: 18,
      logo: '/token-icons/busd.svg',
    },
    native: polygon,
    logo: '/chainIcons/polygonChainLogo.svg',
  },
  [MyVeeMainnet.id]: {
    variablesContractAddress: VariablesV1ContractObject?.myveeAddress,
    variablesContractInterface: VariablesV1ContractObject?.abi,
    referralContractAddress: ReferralV1ContractObject?.myveeAddress,
    referralContractInterface: ReferralV1ContractObject.abi,
    stakingContractAddress: StakingContractObject.myveeAddress,
    stakingContractInterface: StakingContractObject?.abi,
    coreMembersContractAddress: CoreMembersV1ContractObject?.myveeAddress,
    coreMembersContractInterface: CoreMembersV1ContractObject.abi,
    ['USDT']: {
      contractAddress: USDT.myveeAddress,
      contractABI: USDT.abi,
      name: 'Tether',
      symbol: 'USDT',
      decimals: 18,
      logo: '/token-icons/usdt.svg',
    },
    ['BUSD']: {
      contractAddress: BUSD.myveeAddress,
      contractABI: BUSD.abi,
      name: 'BUSD',
      symbol: 'BUSD',
      decimals: 18,
      logo: '/token-icons/busd.svg',
    },
    native: MyVeeMainnet,
    logo: '/chainIcons/MyVeemainnet.svg',
  },
};
