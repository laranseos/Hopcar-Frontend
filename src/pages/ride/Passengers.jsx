import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

 const Passengers = () => {

  const location = useLocation();
  const [ride, setRide] = useState({
    from : location.state.from,
    to : location.state.to,
    hours: location.state.hours,
    distance: location.state.distance,
    uptime : location.state.uptime,
    date: location.state.date,
    routeindex: location.state.routeindex,
    time: location.state.time,
    passengers: 1,
    });

   const navigate = useNavigate();
  
  const handleSubmitClick = (e) => {
    e.preventDefault();
      navigate('/ride/price',{state:ride})
  };

  const plusPassenger = () => {
    if(ride.passengers<4){
    setRide(prev => ({ ...prev, passengers : ride.passengers+1 }));}
  }
  const minusPassenger = () => {
    if(ride.passengers>1){
    setRide(prev => ({ ...prev, passengers : ride.passengers-1 }));}
  }

  useEffect(() => {
    console.log("passengers:", ride.uptime, ride.passengers);
  }, [ride]);

   return (
      <>
        <div className='text-center'>
               <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>How many passengers can you take?</h1>
               <div className='flex mt-16 w-[500px] lg:w-[600px] xl:w-[700px] ml-auto mr-auto'>
                    {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 12l-10 10-10-10"/>  </svg> */}
                    <button onClick={minusPassenger} className=' mb-auto mt-auto ml-1 mr-auto'><svg xmlns="http://www.w3.org/2000/svg" class="text-green-500 w-16 h-16 feather feather-minus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg></button>
                    <label className=' ml-auto mr-auto text-8xl font-semibold text-slate-700'>{ride.passengers}</label>
                    <button onClick={plusPassenger} className=' mb-auto mt-auto ml-auto mr-1'><svg xmlns="http://www.w3.org/2000/svg" className="text-green-500 w-16 h-16 feather feather-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></button>
                </div>
               <br></br>
               <button className='mt-16 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500' onClick={handleSubmitClick}>Continue</button>
        </div>
      </>
   )
}

export default Passengers
