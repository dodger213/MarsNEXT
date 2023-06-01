import React from 'react'
import Dashboard from './dashboard/page';
import { useAccount } from 'wagmi';

function User({params}:{params:{
    userAddress: string | undefined
}}) {
  return (
    <Dashboard params={params}/>
  )
}

export default User;