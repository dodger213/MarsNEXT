import {
  Button,
  HStack,
  Heading,
  Icon,
  IconButton,
  Show,
  Tooltip,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import {
  FcAreaChart,
  FcConferenceCall,
  FcGoodDecision,
  FcHome,
  FcReadingEbook,
} from 'react-icons/fc';
import { GoHome } from 'react-icons/go';

// @ts-ignore
const MotionIconButton = motion(IconButton);

function NavUserMenu({
  userAddress,
  onClick,
}: {
  userAddress: string;
  onClick?: () => void;
}) {
  const menuObject = [
    {
      icon: GoHome,
      name: 'Home',
      link: '/',
    },
    {
      icon: FcAreaChart,
      name: 'Dashboard',
      link: `/user/${userAddress}/dashboard`,
    },
    {
      icon: FcConferenceCall,
      name: 'Team',
      link: `/user/${userAddress}/team`,
    },
    // {
    //   icon: FcConferenceCall,
    //   name: 'Staking',
    //   link: `/user/${userAddress}/staking`,
    // },
    {
      icon: FcGoodDecision,
      name: 'Register',
      link: `/registration`,
    },
  ];
  return (
    <Wrap
      w="full"
      align="center"
      justify="center"
      direction={['row', 'row', 'column']}
    >
      {menuObject.map((menuObject, key) => {
        return (
          <Tooltip
            key={key}
            label={menuObject?.name}
            borderRadius="xl"
            placement="right"
            fontSize="xl"
            hasArrow
          >
            <VStack>
              <MotionIconButton
                aria-label={`Icon button for nav user ${menuObject?.name}`}
                icon={<Icon as={menuObject?.icon} boxSize={8} />}
                boxSize={70}
                borderRadius="3xl"
                whileHover={{
                  borderRadius: '40%',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 700,
                }}
                as={Link}
                href={menuObject?.link}
                onClick={onClick}
              ></MotionIconButton>
              <Show below="md">
                <Heading size="sm">{menuObject?.name}</Heading>
              </Show>
            </VStack>
          </Tooltip>
        );
      })}
    </Wrap>
  );
}

export default NavUserMenu;
