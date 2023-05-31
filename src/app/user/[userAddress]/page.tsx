import React from 'react'

function User({params}:{params:{
    userAddress: string | undefined
}}) {
  return (
    <div>{params.userAddress}</div>
  )
}

export default User;