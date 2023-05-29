import { bsc, localhost, polygon } from 'wagmi/dist/chains';
import {
  ReferralV1ContractObject,
  VariablesV1ContractObject,
} from './ContractAddress';
import { ERC20MockInterface } from '@usedapp/core';
import { BUSDLogoSVG, USDTLogoSVG } from '@/assets';

export const projectName = "MarsNext";
export const tagLine =
  'A reward centric decentralized protocol only made for community.';

export const supportedNetworkInfo = {
  [polygon.id]: {
    variablesContractAddress: VariablesV1ContractObject?.polygonAddress,
    referralContractAddress: ReferralV1ContractObject?.polygonAddress,
    ['USDT']: {
      contractAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      contractABI: ERC20MockInterface,
      name: 'USDT',
      symbol: 'USDT',
      decimals: 6,
      logo: USDTLogoSVG,
    },
    ['BUSD']: {
      contractAddress: '0x9C9e5fD8bbc25984B178FdCE6117Defa39d2db39',
      contractABI: ERC20MockInterface,
      name: 'BUSD',
      symbol: 'BUSD',
      decimals: 18,
      logo: BUSDLogoSVG,
    },
    native: polygon
  },
  [bsc.id]: {
    variablesContractAddress: VariablesV1ContractObject?.bscAddress,
    referralContractAddress: ReferralV1ContractObject?.bscAddress,
    ['USDT']: {
      contractAddress: '0x55d398326f99059fF775485246999027B3197955',
      contractABI: ERC20MockInterface,
      name: 'USDT',
      symbol: 'USDT',
      decimals: 18,
      logo: USDTLogoSVG,
    },
    ['BUSD']: {
      contractAddress: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      contractABI: ERC20MockInterface,
      name: 'BUSD',
      symbol: 'BUSD',
      decimals: 18,
      logo: BUSDLogoSVG,
    },
    native: bsc
  },
  [localhost.id]: {
    variablesContractAddress: VariablesV1ContractObject?.bscAddress,
    referralContractAddress: ReferralV1ContractObject?.bscAddress,
    ['USDT']: {
      contractAddress: '0x494549e00FE6598E3DC93254c5377c406dDA8579',
      contractABI: ERC20MockInterface,
      name: 'Tether',
      symbol: 'USDT',
      decimals: 18,
      logo: USDTLogoSVG,
    },
    ['BUSD']: {
      contractAddress: '0x821Fc84646f9a8502F12f805fe23D26d999c2403',
      contractABI: ERC20MockInterface,
      name: 'BUSD',
      symbol: 'BUSD',
      decimals: 18,
      logo: BUSDLogoSVG,
    },
    native: bsc
  },
};
