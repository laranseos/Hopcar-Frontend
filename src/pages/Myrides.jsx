import React, { useState ,useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/home.css'
import Mycard from '../shared/Mycard'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'
import BookCard from '../shared/BookCard'
const Myrides = () => {
   const navigate=useNavigate()
   const [rides,setRides]=useState([''])
   const [bookedRides,setBookedRides]=useState([''])
   const [isRide,setIsRide]=useState(true)
   const [isBookedRide,setIsBookedRide]=useState(true)
   const {user}=useContext(AuthContext)
   useEffect(()=>{
      const getRides=async()=>{
         const res=await fetch(`${BASE_URL}/rides/driverrides?id=${user}`)
         if(res.ok){
            const {data}=await res.json()
            setRides(data)
         }else{
            setIsRide(false)
         }
         
      }
      getRides()
   },[])
   useEffect(()=>{
      const getBookedRides=async()=>{
         const res=await fetch(`${BASE_URL}/rides/bookedrides?id=${user}`)
         if(res.ok){
            const {bookedRides}=await res.json()
            setBookedRides(bookedRides)
         }else{
            setIsBookedRide(false)
         }
         
      }
      getBookedRides()
   },[])
   console.log(rides)
   return (
   <>
    <h1 className='text-center mt-16 mb-4 font-bold text-4xl text-slate-700'>Your rides</h1>
    {bookedRides[0]&&bookedRides.map((bookedRide,index)=>{
      return <BookCard key={index} ride={bookedRide}/>
    })}
    {rides[0]&&rides.map((ride,index)=>{
      return <Mycard key={index} ride={ride}/>
    })
    }
    {!isRide&&!isBookedRide&&<div className='text-center'>
         <h1 className='text-5xl text-center font-bold mt-32 mr-auto ml-auto text-blue-600 w-[1000px]'>There is no rides published yet.Please try to publish rides</h1>
         <button onClick={()=>navigate('/home')} className='mt-20 bg-green-400 text-white font-bold rounded-full h-12 w-44 hover:bg-green-500 mr-auto ml-auto'>Continue</button>
      </div>}
   </>
   )
}

export default Myrides
