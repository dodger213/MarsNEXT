import React from 'react'
import User from './[userAddress]/page'

function page() {
  return (
    <User params={{
        userAddress: undefined
    }}></User>
  )
}

export default page