import React from 'react'
import Order from '../common/Order'
import Search from './Search'

const UserOrder = () => {
  return (
    <div>
      <Order isUserPage={true}><Search/></Order>
    </div>
  )
}

export default UserOrder
