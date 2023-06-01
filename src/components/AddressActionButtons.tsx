import { CheckIcon, CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  ButtonGroupProps,
  ButtonProps,
  HStack,
  IconButton,
  IconButtonProps,
  IconProps,
  useClipboard,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { useChainId, useNetwork } from 'wagmi';

export const AddressActionButtons = ({ address }: { address: string }) => {
  const { onCopy, hasCopied } = useClipboard(address);
  const { chain } = useNetwork();

  return (
    <HStack>
      <IconButton
        aria-label="Address copy button"
        icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
        onClick={onCopy}
        size="sm"
        borderRadius="xl"
      ></IconButton>
      <Link
        href={`${chain?.blockExplorers?.default.url}/address/${address}`}
        target="_blank"
      >
        <IconButton
          aria-label="Open in explorer button"
          icon={<ExternalLinkIcon />}
          size="sm"
          borderRadius="xl"
        ></IconButton>
      </Link>
    </HStack>
  );
};
