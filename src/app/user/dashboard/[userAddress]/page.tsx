import React from 'react'

function UserAddress({params}:{params: {
    userAddress: string | undefined
}}) {
  return (
    <div>{params.userAddress}</div>
  )
}

export default UserAddress