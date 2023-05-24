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
    >
      <VStack w="full" spacing={2}>
        <Icon as={icon} boxSize={10}></Icon>
        <Tag colorScheme="orange">{heading}</Tag>
        <Heading color="orange.500">{value}%</Heading>
        <Text textAlign="center">{text}</Text>
      </VStack>
    </Tag>
  );
};

const features = [
  {
    heading: 'Earn Upto',
    icon: FaUserFriends,
    text: 'When you refer a friend.',
    value: 50,
  },
  {
    heading: 'Levels',
    icon: FaChartLine,
    text: 'Rewards upto 20% of each registration when you achieve different levels. Yet to open.',
    value: 20,
  },
  {
    heading: 'Global Rewards',
    icon: BsFire,
    text: 'A random user will get 10% of earch registration amount randmonly.',
    value: 10,
  },
  {
    heading: 'Weekly Rewards',
    icon: BsFillCalendar2HeartFill,
    text: 'A random user will get 10% of weekly value of total registrations.',
    value: 10,
  },
  {
    heading: 'Core Membership',
    icon: FaUsers,
    text: 'Users who are working dedicately will be included in core member list. Will get upto 20% of company profits or max 2% of registration.',
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
