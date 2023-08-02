import React, { useState ,useContext,useEffect} from 'react'
import '../styles/home.css'
import Mycard from '../shared/Mycard'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'

const Myrides = () => {
   const [rides,setRides]=useState([])
   const {user}=useContext(AuthContext)
   useEffect(()=>{
      const getRides=async()=>{
         const res=await fetch(`${BASE_URL}/rides/driverrides?id=${user}`)
         const {data}=await res.json()
         setRides(data)
      }
      getRides()
   },[])
   console.log(rides)
   return (
   <>
    <h1 className='text-center mt-16 mb-4 font-bold text-4xl text-slate-700'>Your rides</h1>
    {rides[0]?rides.map((ride,index)=>{
      return <Mycard key={index} ride={ride}/>
    }):
      <h1 className='text-5xl text-center font-bold mt-32 mr-auto ml-auto text-blue-600 w-[1000px] ml-auto mr-auto'>There is no rides published yet.Please try to publish rides</h1>
    }
    
   </>
   )
}

export default Myrides
