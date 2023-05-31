import VariablesV1ContractInterface from '../contracts/artifacts/contracts/VariablesV1Upgradeable.sol/VariablesV1Upgradeable.json';
import ReferralV1ContractInterface from '../contracts/artifacts/contracts/ReferralV1Upgradeable.sol/ReferralV1Upgradeable.json';
import CoreMembersV1ContractInterface from '../contracts/artifacts/contracts/CoreMembersV1Upgradeable.sol/CoreMembersV1Upgradeable.json';
import { ERC20Interface } from '@usedapp/core';

export const VariablesV1ContractObject = {
  abi: VariablesV1ContractInterface?.abi,
  polygonAddress: '',
  bscAddress: '',
  ganacheAddress: '',
  myveeAddress: '0x5a7530Ee130E38487561032B9571F4EC41AB69AB',
};

export const ReferralV1ContractObject = {
  abi: ReferralV1ContractInterface?.abi,
  polygonAddress: '',
  bscAddress: '',
  ganacheAddress: '',
  myveeAddress: '0x1F3B7E45aC44Ba98D73b59Dc796d269281b053d8',
};

export const CoreMembersV1ContractObject = {
  abi: CoreMembersV1ContractInterface?.abi,
  polygonAddress: '',
  bscAddress: '',
  ganacheAddress: '',
  myveeAddress: '0xefb61c43C70b60563c1a2a835663C63Ecc93F6bA',
};

export const USDT = {
  abi: ERC20Interface,
  polygonAddress: '',
  bscAddress: '',
  ganacheAddress: '',
  myveeAddress: '0x3bcBA4C6223D98B9265601b6129A9436F810669B',
};

export const BUSD = {
  abi: ERC20Interface,
  polygonAddress: '',
  bscAddress: '',
  ganacheAddress: '',
  myveeAddress: '0xc84837B0b1Ea22A831Cf000aFB4E2D88BDE8c1E7',
};
