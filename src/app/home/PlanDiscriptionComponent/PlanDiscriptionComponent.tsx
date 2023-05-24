import { HeadingComponent } from '@/util/Ui';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  Icon,
  Tag,
  Text,
  VStack,
  Wrap,
  useColorModeValue
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { BsFillCalendar2HeartFill, BsFire } from 'react-icons/bs';
import { FaChartLine, FaUserFriends, FaUsers } from 'react-icons/fa';

const TagComponent = ({
  icon,
  heading,
  value,
  text,
  key,
}: {
  icon: IconType;
  heading: string;
  value: number;
  text: string;
  key: number;
}) => {
  return (
    <Tag
      w={250}
      h={350}
      borderRadius="50px"
      borderBottomWidth="thick"
      key={key}
      backdropFilter="blur(10px)"
      px={5}
    >
      <VStack w="full" spacing={4}>
        <Icon as={icon} boxSize={14}></Icon>
        <Tag colorScheme="orange" fontWeight={900}>{heading}</Tag>
        <Heading color="orange.500" size="3xl" fontWeight={900}>{value}%</Heading>
        <Heading textAlign="center" fontWeight={500} size="md">{text}</Heading>
      </VStack>
    </Tag>
  );
};

const features = [
  {
    heading: 'Earn Upto',
    icon: FaUserFriends,
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
      <Wrap
        spacing={10}
        align="center"
        justify="center"
        p={5}
        borderRadius="50px"
      >
        {features.map((featuresBbject, key) => {
          return <TagComponent {...featuresBbject} key={key}></TagComponent>;
        })}
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
          borderBottomWidth="thick"
        >
          Enter the app
        </Button>
      </Box>
    </VStack>
  );
};
