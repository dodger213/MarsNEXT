import React from 'react'
import UserAddress from './[userAddress]/page'

function Dashboard({params}:{params: {
  userAddress: string | undefined
}}) {
  return (
    <UserAddress params={params}></UserAddress>
  )
}

export default Dashboard