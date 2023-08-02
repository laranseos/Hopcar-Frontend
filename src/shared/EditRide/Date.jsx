import React, { useState, useEffect ,useRef} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

 const Dates = () => {

  const location = useLocation();
  const dateRef=useRef(new Date())
  const [ride, setRide] = useState({
    from : location.state.from,
    to : location.state.to,
    hours: location.state.hours,
    distance: location.state.distance,
    routeindex: location.state.routeindex,
    date: '',    
    });

  const navigate = useNavigate();
  
  const handleSubmitClick = (e) => {
    e.preventDefault();
    navigate('/ride/edit/time',{state:ride})
  };
  const handleChange=()=>{
    setRide(prev=>({...prev,date:dateRef.current.value}))
  }
   return (
      <>
        <div className='text-center'>
            <form onSubmit={handleSubmitClick}>
                {/* <DateCalendar value={ride.date} onChange={(newdate) => setRide(prev => ({ ...prev, date : newdate }))} /> */}
                <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>When are you going?</h1>
                <div className='mt-24 font-semibold ml-auto mr-auto'>
                    <input type="date" id='mydate' ref={dateRef} className=' text-center rounded-full font-bold w-96 h-24 text-4xl bg-slate-200 border-slate-200 focus:outline-none focus:border-green-500  focus:border-2'
                      onChange={handleChange} />
                </div>
                <br></br>
                <button type='submit' className='mt-16 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500' >Continue</button>
            </form>
        </div>
      </>
   )
}

export default Dates
