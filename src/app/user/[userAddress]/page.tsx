import React from 'react'
import Dashboard from './dashboard/page';
import { useAccount } from 'wagmi';

function User({params}:{params:{
    userAddress: `0x${string}` | undefined
}}) {
  return (
    <Dashboard params={params}/>
  )
}

export default User;