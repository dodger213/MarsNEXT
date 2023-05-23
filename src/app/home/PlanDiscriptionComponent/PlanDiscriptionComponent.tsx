import { HeadingComponent, bgGradient } from '@/util/Ui';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Heading,
  Icon,
  Tag,
  Text,
  VStack,
  Wrap,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaChartLine, FaUserFriends, FaUsers } from 'react-icons/fa';
import { BsFillCalendar2HeartFill, BsFire } from 'react-icons/bs';
import { GiCube } from 'react-icons/gi';
import { IconType } from 'react-icons';
import { ChevronRightIcon } from '@chakra-ui/icons';

const TagComponent = ({
  icon,
  heading,
  value,
  text,
}: {
  icon: IconType;
  heading: string;
  value: number;
  text: string;
}) => {
  return (
    <Tag w={250} h={350} borderRadius="50px" borderBottomWidth="thick">
      <VStack w="full" spacing={2}>
        <Icon as={icon} boxSize={10}></Icon>
        <Tag colorScheme="orange">{heading}</Tag>
        <Heading color="orange.500">{value}%</Heading>
        <Text textAlign="center">{text}</Text>
      </VStack>
    </Tag>
  );
};

export const PlanDiscriptionComponent = () => {
  return (
    <VStack
      w="full"
      minH="80vh"
      py="10vh"
      spacing={10}
      bgColor={useColorModeValue('white', 'blackAlpha.900')}
    >
      <HeadingComponent
        heading="A protocol made for"
        gradientHeading="EVERYONE"
      ></HeadingComponent>
      <Wrap spacing={10} align="center" justify="center">
        <TagComponent
          heading="Earn Upto"
          icon={FaUserFriends}
          text="When you refer a friend."
          value={50}
        ></TagComponent>
        <TagComponent
          heading="Levels"
          icon={FaChartLine}
          text="Rewards upto 20% of each registration when you achieve different levels. Yet to open."
          value={20}
        ></TagComponent>
        <TagComponent
          heading="Global Rewards"
          icon={BsFire}
          text="A random user will get 10% of earch registration amount randmonly."
          value={10}
        ></TagComponent>
        <TagComponent
          heading="Weekly Rewards"
          icon={BsFillCalendar2HeartFill}
          text="A random user will get 10% of weekly value of total registrations."
          value={10}
        ></TagComponent>
        <TagComponent
          heading="Core Membership"
          icon={FaUsers}
          text="Users who are working dedicately will be included in core member list. Will get upto 20% of company profits or max 2% of registration."
          value={2}
        ></TagComponent>
        {/* <TagComponent
          heading="Ownership"
          icon={GiCube}
          text="Everything is on decentralized smart contracts verified on block
              explorers. Completely transparent & secure."
          value={100}
        ></TagComponent> */}
      </Wrap>
      <Box maxW={500} minW={250} w="full" px={10}>
        <Button
          w="full"
          rightIcon={<ChevronRightIcon />}
          fontSize="lg"
          colorScheme="orange"
          bg="orange.500"
          _hover={{
            bg: 'orange.600',
          }}
          h={20}
          borderRadius={20}
        >
          Enter the app now
        </Button>
      </Box>
    </VStack>
  );
};
