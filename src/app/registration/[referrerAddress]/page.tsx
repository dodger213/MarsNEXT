'use client';
import RegistrationUI from '@/components/RegistrationUI/RegistrationUI';
import { AddressZero } from '@/constants/ContractAddress';
import { useGetPlansCount } from '@/hooks/VariablesHooks';
import {
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { FcGoodDecision } from 'react-icons/fc';
import Slider from 'react-slick';

export default function RegistrationUIPage({
  params,
}: {
  params?: {
    referrerAddress: `0x${string}` | undefined;
  };
}) {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const plansCount = useGetPlansCount();
  console.log(plansCount)
  const plansCountArray = () => {
    let count = [];

    for (let i = 0; i < plansCount; i++) {
      count.push(i);
    }

    return count;
  };

  return (
    <Flex
      overflow="hidden"
      w="full"
      minH="100vh"
      direction="column"
      align="center"
      justify="center"
      py={100}
      bgImage="/backgroundSolarSystem.png"
      bgAttachment="fixed"
      backdropFilter="auto"
    >
      <VStack>
        <HStack>
          <Icon as={FcGoodDecision} boxSize={10}></Icon>
          <Heading color="orange.500">Register</Heading>
        </HStack>
        <Divider />
      </VStack>
      <Stack w={1000} overflow="hidden" px={7} py={10}>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <Slider
          dots={true}
          slidesToShow={3}
          ref={(slider) => setSlider(slider)}
          slidesToScroll={1}
          arrows={false}
          className="center"
          centerMode={true}
          centerPadding="-10px"
          swipeToSlide={true}
        >
          {plansCountArray().map((planId, index) => (
            <RegistrationUI
              planId={planId}
              referrerAddress={params?.referrerAddress}
              isLarge={true}
              key={index}
            ></RegistrationUI>
          ))}
        </Slider>
      </Stack>
      <HStack w="full" maxW={600} justify="space-between" px={20} pt={10}>
        <IconButton
          aria-label="left-arrow"
          bgColor="orange.500"
          colorScheme="orange"
          borderRadius="full"
          transform={'translate(0%, -50%)'}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          bgColor="orange.500"
          colorScheme="orange"
          borderRadius="full"
          transform={'translate(0%, -50%)'}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt />
        </IconButton>
      </HStack>
    </Flex>
  );
}
