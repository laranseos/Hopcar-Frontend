import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
 const Time = () => {
    
  const location = useLocation();
  const [ride, setRide] = useState({
    from : location.state.from,
    to : location.state.to,
    hours: location.state.hours,
    distance: location.state.distance,
    routeindex: location.state.routeindex,
    time:"8.0",
    uptime : "",
    date: location.state.date,
    });
   const navigate = useNavigate();

   const timelist = [
    {time:'8.0', display:'8:00'},{time:'8.1', display:'8:10'},{time:'8.2', display:'8:20'},{time:'8.3', display:'8:30'},{time:'8.4', display:'8:40'},{time:'8.5', display:'8:50'},
    {time:'9.0', display:'9:00'},{time:'9.1', display:'9:10'},{time:'9.2', display:'9:20'},{time:'9.3', display:'9:30'},{time:'9.4', display:'9:40'},{time:'9.5', display:'9:50'},
    {time:'10.0', display:'10:00'},{time:'10.1', display:'10:10'},{time:'10.2', display:'10:20'},{time:'10.3', display:'10:30'},{time:'10.4', display:'10:40'},{time:'10.5', display:'10:50'},
    {time:'11.0', display:'11:00'},{time:'11.1', display:'11:10'},{time:'11.2', display:'11:20'},{time:'11.3', display:'11:30'},{time:'11.4', display:'11:40'},{time:'11.5', display:'11:50'},
    {time:'12.0', display:'12:00'},{time:'12.1', display:'12:10'},{time:'12.2', display:'12:20'},{time:'12.3', display:'12:30'},{time:'12.4', display:'12:40'},{time:'12.5', display:'12:50'},
    {time:'13.0', display:'13:00'},{time:'13.1', display:'13:10'},{time:'13.2', display:'13:20'},{time:'13.3', display:'13:30'},{time:'13.4', display:'13:40'},{time:'13.5', display:'13:50'},
    {time:'14.0', display:'14:00'},{time:'14.1', display:'14:10'},{time:'14.2', display:'14:20'},{time:'14.3', display:'14:30'},{time:'14.4', display:'14:40'},{time:'14.5', display:'14:50'},
    {time:'15.0', display:'15:00'},{time:'15.1', display:'15:10'},{time:'15.2', display:'15:20'},{time:'15.3', display:'15:30'},{time:'15.4', display:'15:40'},{time:'15.5', display:'15:50'},
    {time:'16.0', display:'16:00'},{time:'16.1', display:'16:10'},{time:'16.2', display:'16:20'},{time:'16.3', display:'16:30'},{time:'16.4', display:'16:40'},{time:'16.5', display:'16:50'},
    {time:'17.0', display:'17:00'},{time:'17.1', display:'17:10'},{time:'17.2', display:'17:20'},{time:'17.3', display:'17:30'},{time:'17.4', display:'17:40'},{time:'17.5', display:'17:50'},
    {time:'18.0', display:'18:00'},{time:'18.1', display:'18:10'},{time:'18.2', display:'18:20'},{time:'18.3', display:'18:30'},{time:'18.4', display:'18:40'},{time:'18.5', display:'18:50'},
    {time:'19.0', display:'19:00'},{time:'19.1', display:'19:10'},{time:'19.2', display:'19:20'},{time:'19.3', display:'19:30'},{time:'19.4', display:'19:40'},{time:'19.5', display:'19:50'},
    {time:'20.0', display:'20:00'},{time:'20.1', display:'20:10'},{time:'20.2', display:'20:20'},{time:'20.3', display:'20:30'},{time:'20.4', display:'20:40'},{time:'20.5', display:'20:50'},
    {time:'21.0', display:'21:00'},{time:'21.1', display:'21:10'},{time:'21.2', display:'21:20'},{time:'21.3', display:'21:30'},{time:'21.4', display:'21:40'},{time:'21.5', display:'21:50'},
    {time:'22.0', display:'22:00'},{time:'22.1', display:'22:10'},{time:'22.2', display:'22:20'},{time:'22.3', display:'22:30'},{time:'22.4', display:'22:40'},{time:'22.5', display:'22:50'},
    {time:'23.0', display:'23:00'},{time:'23.1', display:'23:10'},{time:'23.2', display:'23:20'},{time:'23.3', display:'23:30'},{time:'23.4', display:'23:40'},{time:'23.5', display:'23:50'},
    {time:'0.0', display:'0:00'},{time:'0.1', display:'0:10'},{time:'0.2', display:'0:20'},{time:'0.3', display:'0:30'},{time:'0.4', display:'0:40'},{time:'0.5', display:'0:50'},
    {time:'1.0', display:'1:00'},{time:'1.1', display:'1:10'},{time:'1.2', display:'1:20'},{time:'1.3', display:'1:30'},{time:'1.4', display:'1:40'},{time:'1.5', display:'1:50'},
    {time:'2.0', display:'2:00'},{time:'2.1', display:'2:10'},{time:'2.2', display:'2:20'},{time:'2.3', display:'2:30'},{time:'2.4', display:'2:40'},{time:'2.5', display:'2:50'},
    {time:'3.0', display:'3:00'},{time:'3.1', display:'3:10'},{time:'3.2', display:'3:20'},{time:'3.3', display:'3:30'},{time:'3.4', display:'3:40'},{time:'3.5', display:'3:50'},
    {time:'4.0', display:'4:00'},{time:'4.1', display:'4:10'},{time:'4.2', display:'4:20'},{time:'4.3', display:'4:30'},{time:'4.4', display:'4:40'},{time:'4.5', display:'4:50'},
    {time:'5.0', display:'5:00'},{time:'5.1', display:'5:10'},{time:'5.2', display:'5:20'},{time:'5.3', display:'5:30'},{time:'5.4', display:'5:40'},{time:'5.5', display:'5:50'},
    {time:'6.0', display:'6:00'},{time:'6.1', display:'6:10'},{time:'6.2', display:'6:20'},{time:'6.3', display:'6:30'},{time:'6.4', display:'6:40'},{time:'6.5', display:'6:50'},
    {time:'7.0', display:'7:00'},{time:'7.1', display:'7:10'},{time:'7.2', display:'7:20'},{time:'7.3', display:'7:30'},{time:'7.4', display:'7:40'},{time:'7.5', display:'7:50'},
];

const durationToFloat = (durationString) => {
  const [hours, minutes] = durationString.split('h ');
  const hoursFloat = parseFloat(hours);
  const minutesFloat = parseFloat(minutes) / 60;
  return hoursFloat + minutesFloat;
}

const calculateArrivalTime = (startTime, duration) => {
  // Separate the integer and decimal parts of the start time
  const startHours = Math.floor(startTime);
  const startMinutes = (startTime % 1) * 100;

  // Extract the hours and minutes from the duration
  const durationHours = Math.floor(duration);
  const durationMinutes = (duration % 1) * 60;

  // Add the duration hours and minutes to the start time
  let totalHours = startHours + durationHours;
  let totalMinutes = startMinutes + durationMinutes;

  // Adjust hours and minutes if necessary


  if (totalMinutes >= 60) {
    totalMinutes -= 60;
    totalHours += 1;
  }
  if(totalMinutes<10) {
    totalMinutes = '0'+totalMinutes.toFixed(0);
  } else totalMinutes = totalMinutes.toFixed(0);

  if(totalHours >= 24) totalHours = totalHours - 24;
  // Format the arrival time
  const arrivalTime = totalHours +'.'+ totalMinutes;

  return arrivalTime;
}


  
  const handleSubmitClick = (e) => {
    e.preventDefault();
    navigate('/ride/edit/passengers',{state:ride});
  };

  const handleSelect = () => {
    console.log(ride.date);
    setRide(prev => ({ ...prev, time : document.getElementById("pickuptime").value }));
  }

  useEffect(() => {
    let time = parseFloat(ride.time);
    let hours = durationToFloat(ride.hours).toFixed(3);
    let uptime = calculateArrivalTime(time, hours);

    setRide(prev => ({ ...prev, uptime : uptime }));
    
  }, [ride]);

   return ( 
      <>
        <div className='text-center'>
            <form onSubmit={handleSubmitClick}>
               <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>At what time will you pick passengers up?</h1>
               <div>
                  <select onChange={handleSelect} id='pickuptime' name='pickuptime' className='mt-24 text-center rounded-full font-bold w-96 h-24 text-7xl bg-slate-200 border-slate-200 focus:outline-none focus:border-green-500  focus:border-2'>
                    {timelist.map((item, index) => (<option value={item.time} className=' font-semibold text-xl'>{item.display}</option>))}
                  </select>
                </div>
               
               <br></br>
               <button type='submit' className='mt-16 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500'>Continue</button>
            </form>
        </div>
      </>
   )
}

export default Time
