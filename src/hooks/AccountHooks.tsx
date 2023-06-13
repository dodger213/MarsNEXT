import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export const useCurrentAccount = () => {
  const { address } = useAccount();
  const [currentAccount, setCurrentAccount] = useState<
    `0x${string}` | undefined
  >(undefined);

  useEffect(() => {
    setCurrentAccount(address);
  }, [address, currentAccount]);

  return currentAccount;
};
