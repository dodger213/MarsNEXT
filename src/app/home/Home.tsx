"use client"
import { Heading, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { Header } from './Header'
import { PlanDiscriptionComponent } from './PlanDiscriptionComponent/PlanDiscriptionComponent'

export const Home = () => {
  return (
    <VStack w="full" spacing={0}>
      <Header/>
     <PlanDiscriptionComponent/>
    </VStack>
  )
}
