import VariablesV1ContractInterface from '../contracts/artifacts/contracts/VariablesV1Upgradeable.sol/VariablesV1Upgradeable.json';
import ReferralV1ContractInterface from '../contracts/artifacts/contracts/ReferralV1Upgradeable.sol/ReferralV1Upgradeable.json';
import StakingUpgradeableInterface from '../contracts/artifacts/contracts/StakingUpgradeable.sol/StakingUpgradeable.json';
import CoreMembersV1ContractInterface from '../contracts/artifacts/contracts/CoreMembersV1Upgradeable.sol/CoreMembersV1Upgradeable.json';
import { ERC20Interface } from '@usedapp/core';
import { erc20ABI } from 'wagmi';

export const AddressZero: `0x${string}` =
  '0x0000000000000000000000000000000000000000';
export const AddressDead: `0x${string}` =
  '0x000000000000000000000000000000000000dEaD';

export type ContractObject = {
  abi: any;
  polygonAddress: `0x${string}`;
  bscAddress: `0x${string}`;
  myveeAddress: `0x${string}`;
};

export type TokenContractObject = {
  abi: any;
  polygonAddress: `0x${string}`;
  bscAddress: `0x${string}`;
  myveeAddress: `0x${string}`;
};

export const VariablesV1ContractObject: ContractObject = {
  abi: VariablesV1ContractInterface?.abi,
  polygonAddress: '0x494549e00FE6598E3DC93254c5377c406dDA8579',
  bscAddress: AddressZero,
  myveeAddress: '0x5a7530Ee130E38487561032B9571F4EC41AB69AB',
};

export const ReferralV1ContractObject: ContractObject = {
  abi: ReferralV1ContractInterface?.abi,
  polygonAddress: '0xDd0B6A7E5c27AAf44CaEb3602DeB4929E050cC58',
  bscAddress: AddressZero,
  myveeAddress: '0x1F3B7E45aC44Ba98D73b59Dc796d269281b053d8',
};

export const StakingContractObject: ContractObject = {
  abi: StakingUpgradeableInterface?.abi,
  polygonAddress: '0x601Cb0299ab53e67e25c9e7C329Db8684a963E7C',
  bscAddress: AddressZero,
  myveeAddress: AddressZero,
};

export const CoreMembersV1ContractObject: ContractObject = {
  abi: CoreMembersV1ContractInterface?.abi,
  polygonAddress: '0xC88F39aE7b4a9B636DD2Ceb08c9aE3ca322A6CaB',
  bscAddress: AddressZero,
  myveeAddress: '0xefb61c43C70b60563c1a2a835663C63Ecc93F6bA',
};

export const USDT: TokenContractObject = {
  abi: erc20ABI,
  polygonAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  bscAddress: '0x55d398326f99059fF775485246999027B3197955',
  myveeAddress: '0x3bcBA4C6223D98B9265601b6129A9436F810669B',
};

export const BUSD: TokenContractObject = {
  abi: erc20ABI,
  polygonAddress: '0x9C9e5fD8bbc25984B178FdCE6117Defa39d2db39',
  bscAddress: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  myveeAddress: '0xc84837B0b1Ea22A831Cf000aFB4E2D88BDE8c1E7',
};
