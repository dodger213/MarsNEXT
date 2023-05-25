'use client';
import RegistrationUI from '@/components/RegistrationUI/RegistrationUI';
import { Box, HStack, VStack } from '@chakra-ui/react';
import { AnimatePresence, MotionProps, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const MotionRegistrationUI = motion(RegistrationUI);

const SlidShowVariants = {
  enter: {
    x: 200,
    opacity: 0,
  },
  exit: {
    x: -200,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};

function RegistrationUIPage({
  params,
}: {
  params?: {
    referrerAddress: string;
  };
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [0, 1, 2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <HStack w="full" p={5}>
      <AnimatePresence>
        <MotionRegistrationUI
          referrerAddress={params?.referrerAddress}
          isLarge={true}
          planId={0}
          key={images[currentIndex]}
          variants={SlidShowVariants}
          animate="animate"
        ></MotionRegistrationUI>
      </AnimatePresence>
    </HStack>
  );
}

export default RegistrationUIPage;
