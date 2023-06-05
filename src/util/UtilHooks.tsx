import { shortenIfAddress } from '@usedapp/core';
import { utils } from 'ethers';

export const shortenAddress = () => {};

export const getExplorerLink = () => {};

export function useGetRandomColor() {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export function formatNumberWithMaxDecimals(value: any, maxDecimals?: number) {
  const formattedNumber = Number(value).toFixed(maxDecimals ?? 2);
  return formattedNumber.replace(/\.?0+$/, ''); // Removes trailing zeros
}

export const isAddressValid = (address: string) => {
  if (!utils.isAddress(address)) {
    return false;
  }
  return true;
};

export const sliceTransactionHash = (transactionHash: string): string => {
  const prefix = transactionHash.slice(0, 4);
  const body = '...';
  const suffix = transactionHash.slice(-4);

  return `${prefix}${body}${suffix}`;
};
