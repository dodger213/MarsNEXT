'use client';
import Footer from '@/components/Footer';
import { Nav } from '@/components/Nav/Nav';
import { VStack, useColorModeValue } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

function MainWrapper({ children }: { children: ReactNode }) {
  return (
    <div>
      <Nav />
      <div className='w-full min-h-screen align-middle justify-center'
      >
        {children}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MainWrapper;
