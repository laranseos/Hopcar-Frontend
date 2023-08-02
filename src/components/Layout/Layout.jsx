import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from './../Header/Header'
import Routers from '../../router/Routers'
import bg from '../../assets/images/background.jpeg'

const Layout = () => {

   return (
      <>
         <div>
            <Header />
            <Routers />    
         </div>
      </>
   )
}

export default Layout