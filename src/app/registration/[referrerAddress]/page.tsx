"use client"
import React from 'react';
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Stack,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import RegistrationUI from '@/components/RegistrationUI/RegistrationUI';
import { AddressZero } from '@/constants/ContractAddress';
import { FcGoodDecision } from 'react-icons/fc';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  slidesToShow: 3,
  slidesToScroll: 1,
};

export default function RegistrationUIPage({
  params,
}: {
  params?: {
    referrerAddress: `0x${string}` | undefined;
  };
}) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  // These are the images used in the slide
  const cards = [0, 1, 2, 3, 4, 5, 6];

  return (
    <Flex
      overflow="hidden"
      w="full"
      minH="100vh"
      direction="column"
      align="center"
      justify="center"
      py={100}
      
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
 
        >
          {cards.map((url, index) => (
            <RegistrationUI
              planId={index}
              referrerAddress={params?.referrerAddress ?? AddressZero}
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
          colorScheme='orange'
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
          colorScheme='orange'
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
