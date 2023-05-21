"use client"
import { Heading, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { Header } from './Header'

export const Home = () => {
  return (
    <VStack w="full">
      <Header/>
    </VStack>
  )
}
