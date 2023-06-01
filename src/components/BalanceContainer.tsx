import { supportedCurrencyIcons } from '@/constants/SupportedNetworkInfo';
import {
  Avatar,
  AvatarGroup,
  HStack,
  Hide,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';

export const BalanceContainer = ({
  heading,
  value,
  currencySymbol,
  showIcon = true,
  icons,
}: {
  heading: string;
  value: string | number;
  currencySymbol?: string;
  showIcon?: boolean;
  icons?: string[];
}) => {
  return (
    <VStack>
      <Tag size="lg" borderRadius="xl" fontWeight="bold" fontSize="md">
        {heading}
      </Tag>
      <HStack>
        <Text fontSize="lg" fontWeight="black" textAlign="center" color="twitter.500">
          {value} {currencySymbol && currencySymbol.toUpperCase()}
        </Text>
        {showIcon ? (
          icons ? (
            <AvatarGroup size="xs" max={2}>
              {icons?.map((url, key) => {
                return <Avatar name="Currency Icons" src={url} key={key} />;
              })}
            </AvatarGroup>
          ) : (
            <AvatarGroup size="xs" max={2}>
              {supportedCurrencyIcons?.map((url, key) => {
                return <Avatar name="Currency Icons" src={url} key={key} />;
              })}
            </AvatarGroup>
          )
        ) : null}
      </HStack>
    </VStack>
  );
};
