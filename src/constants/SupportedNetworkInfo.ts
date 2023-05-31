import { BUSDLogoSVG, USDTLogoSVG } from '@/assets';
import { MyVeeMainnet } from '@/lib/chains';
import { bsc, localhost, polygon } from 'wagmi/chains';
import {
  BUSD,
  CoreMembersV1ContractObject,
  ReferralV1ContractObject,
  USDT,
  VariablesV1ContractObject,
} from './ContractAddress';

export const projectName = 'MarsNext';
export const tagLine =
  'A reward centric decentralized protocol only made for community.';

export const supportedNetworkInfo = {
  [polygon.id]: {
    variablesContractAddress: VariablesV1ContractObject?.polygonAddress,
    referralContractAddress: ReferralV1ContractObject?.polygonAddress,
    coreMembersContractAddress: CoreMembersV1ContractObject?.polygonAddress,
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
    native: bsc,
  },
  [localhost.id]: {
    variablesContractAddress: VariablesV1ContractObject?.ganacheAddress,
    referralContractAddress: ReferralV1ContractObject?.ganacheAddress,
    coreMembersContractAddress: CoreMembersV1ContractObject?.ganacheAddress,
    ['USDT']: {
      contractAddress: USDT.ganacheAddress,
      contractABI: USDT.abi,
      name: 'Tether',
      symbol: 'USDT',
      decimals: 18,
      logo: USDTLogoSVG,
    },
    ['BUSD']: {
      contractAddress: BUSD.ganacheAddress,
      contractABI: BUSD.abi,
      name: 'BUSD',
      symbol: 'BUSD',
      decimals: 18,
      logo: BUSDLogoSVG,
    },
    native: bsc,
  },
};
