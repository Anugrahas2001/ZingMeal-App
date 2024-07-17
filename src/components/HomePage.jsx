import React from 'react'
import Header from './common/Header'
import TabOptions from './TabOptions'
import Footer from './common/Footer'
import Hotels from './Hotels'

const HomePage = () => {
  return (
    <div>
      <Header/>
      <TabOptions/>
      <Hotels/>
      <Footer/>
    </div>
  )
}

export default HomePage
