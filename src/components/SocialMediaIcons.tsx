import {
  Button,
  Icon,
  IconButton,
  VisuallyHidden,
  Wrap,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { FaDiscord, FaGithub, FaTelegram, FaTwitter } from 'react-icons/fa';

const iconsObject = [
  {
    label: 'Twitter',
    icon: FaTwitter,
    href: 'https://twitter.com/letstothemars',
  },
  {
    label: 'Telegram',
    icon: FaTelegram,
    href: "https://t.me/letstothemars",
  },
//   {
//     label: 'Discord',
//     icon: FaDiscord,
//     href: '',
//   },
  {
    label: 'Github',
    icon: FaGithub,
    href: 'https://github.com/martianacademy',
  },
];

const SocialMediaIconsButton = ({
  icon,
  label,
  href,
}: {
  icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  label: string;
  href: string;
}) => {
  return (
    <IconButton
      aria-label="Social Media Icons Button"
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      target="_blank"
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
      icon={icon}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
    </IconButton>
  );
};

export const SocialMediaIcons = () => {
  return (
    <Wrap spacing={3} align="center" justify="center">
      {iconsObject?.map((iconsObject, key) => {
        return (
          <SocialMediaIconsButton
            key={key}
            label={iconsObject?.label}
            icon={<Icon as={iconsObject?.icon}></Icon>}
            href={iconsObject?.href}
          ></SocialMediaIconsButton>
        );
      })}
    </Wrap>
  );
};

export default SocialMediaIcons;
