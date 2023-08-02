import React,{useContext,useState} from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import { BASE_URL } from '../../utils/config';
import { AuthContext } from '../../context/AuthContext';
 const PublishAlert = () => {
  const location = useLocation();
  const {user,accessToken}=useContext(AuthContext)
  const from=location.state.from.slice(1,-1)
  const to=location.state.to.slice(1,-1)
  const id=localStorage.getItem('rideID')
  const [ride,setRide] = useState({
    from : from,
    to : to,

    hours: location.state.hours,
    distance: location.state.distance,
    routeindex: location.state.routeindex,

    date: location.state.date,
    time: location.state.time,
    uptime : location.state.uptime,

    passengers: location.state.passengers,
    price: location.state.price,
    info : location.state.info,
    });

  const navigate = useNavigate();
  const handleSubmitClick = async(e) => {
    e.preventDefault();
    const res=await fetch(`${BASE_URL}/rides/update?id=${id}`,{
      method:'put',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify({ride:ride})
    })
    console.log('frometo:', ride.from, ride.to, 'route', ride.hours, ride.distance,ride.routeindex,'price,passenger', ride.price, ride.passengers,'date, time',ride.date, ride.time, ride.uptime,'info', ride.info);
    navigate('/myrides')
  };

   return (
      <>
        <div className='text-center'>
            <h1 className='text-5xl font-bold mt-52 text-blue-600 w-[1000px] ml-auto mr-auto'>Your ride is successfully updated</h1>
            <button type='submit' onClick={handleSubmitClick} className='mt-24 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500'>See my ride</button>
        </div>
      </>
   )
}

export default PublishAlert
