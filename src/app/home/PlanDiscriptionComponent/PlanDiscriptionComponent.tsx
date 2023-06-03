import { useGetPlanById } from '@/hooks/VariablesHooks';
import { CenterComponent, HeadingComponent } from '@/util/Ui';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Tag,
  Text,
  VStack,
  Wrap,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { BsFillCalendar2HeartFill, BsFire } from 'react-icons/bs';
import { FaChartLine, FaUserFriends, FaUsers } from 'react-icons/fa';
import { MdGroups3 } from 'react-icons/md';

const BoxComponent = ({
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
    <CenterComponent
      style={{
        w: 250,
        h: 350,
      }}
    >
      <VStack w="full" spacing={4}>
        <Icon as={icon} boxSize={14}></Icon>
        <Tag colorScheme="orange" fontWeight={900}>
          {heading}
        </Tag>
        <Heading color="orange.500" size="3xl" fontWeight={900}>
          {value}%
        </Heading>
        <Heading textAlign="center" fontWeight={500} size="md">
          {text}
        </Heading>
      </VStack>
    </CenterComponent>
  );
};

const features = [
  {
    heading: 'Earn Upto',
    icon: MdGroups3,
    text: 'Community Spreading Rewards.',
    value: 50,
  },
  {
    heading: 'Levels',
    icon: FaChartLine,
    text: 'Achieve Level Rewards.',
    value: 20,
  },
  {
    heading: 'Global Rewards',
    icon: BsFire,
    text: 'Random Global Rewards.',
    value: 10,
  },
  {
    heading: 'Weekly Rewards',
    icon: BsFillCalendar2HeartFill,
    text: 'Random Weekly Rewards.',
    value: 10,
  },
  {
    heading: 'Core Membership',
    icon: FaUsers,
    text: 'Core Member Rewards.',
    value: 2,
  },
];

export const PlanDiscriptionComponent = () => {
  return (
    <VStack w="full" minH="80vh" py="10vh" spacing={10}>
      <HeadingComponent
        heading="A protocol made for"
        gradientHeading="EVERYONE"
      ></HeadingComponent>
      <Wrap
        spacing={10}
        align="center"
        justify="center"
        p={5}
        borderRadius="50px"
      >
        {features.map((featuresBbject, key) => {
          return <BoxComponent {...featuresBbject} key={key}></BoxComponent>;
        })}
      </Wrap>
      <Box maxW={500} minW={250} w="full" px={10}>
        <Link href="/registration">
          <Button
            w="full"
            rightIcon={<ChevronRightIcon />}
            fontSize="lg"
            h={20}
            borderRadius={20}
            borderBottomWidth="thick"
          >
            Enter the app
          </Button>
        </Link>
      </Box>
    </VStack>
  );
};
