"use client"
import { Config, DAppProvider, Mainnet } from '@usedapp/core'
import React, { ReactNode } from 'react'



export const ProviderDapp = ({children}:{children: ReactNode}) => {
    const config: Config = {
        readOnlyChainId: Mainnet.chainId
    }
  return (
    <DAppProvider config={config}>
        {children}
    </DAppProvider>
  )
}
