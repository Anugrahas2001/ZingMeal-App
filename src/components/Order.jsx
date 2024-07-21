import React from 'react'
import Header from './common/Header'
import { useParams } from 'react-router-dom'

const Order = () => {
    const {item}=useParams();
    
  return (
    <div>
     <Header/>
    </div>
  )
}

export default Order
