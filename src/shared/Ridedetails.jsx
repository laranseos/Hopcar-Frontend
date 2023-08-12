import React ,{useState,useEffect, useContext} from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
import Avatars from '../assets/images/avatars.png'
import '../pages/shake.css'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'

 const Ridedetails = () => {
  const navigate=useNavigate()
  const location = useLocation()
  const [driverName,setDriverName]=useState('')
  const [driverAvatar,setDriverAvatar]=useState('')
  const [driverInfo,setDriverInfo]=useState({})
  useEffect(()=>{
    const fetchNames = async () => {
      const res = await fetch(`${BASE_URL}/users/getNames?email=${location.state.driveremail}`);
      const {name}=await res.json()
      setDriverName(name) 
    };
    fetchNames();
  },[])
  useEffect(()=>{
    const fetchAvatars = async () => {
        const res = await fetch(`${BASE_URL}/rides/results/getavatar?email=${location.state.driveremail}`);
        if(!res.ok){
          setDriverAvatar("")
        }else{
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          setDriverAvatar(url)
        }
        
    };
    fetchAvatars();
  },[])
  useEffect(()=>{
    const fetchDriverInfo=async () =>{
      const res = await fetch(`${BASE_URL}/users/getDriverInfo?email=${location.state.driveremail}`);
      const {driverInfo}=await res.json()
      setDriverInfo(driverInfo) 
    }
    fetchDriverInfo()
  },[])
  let avatarNumber=0
  let nameNumber=0
  const [avatarUrl, setAvatarUrl] = useState([]);
  const [name,setName]=useState([])
  useEffect(()=>{
    if(location.state.bookedEmail[0]){
      const fetchAvatars = async () => {
        for (const email of location.state.bookedEmail) {
          const res = await fetch(`${BASE_URL}/rides/results/getavatar?email=${email}`);
          if(!res.ok){
            setAvatarUrl((prev)=>[...prev," "]);
          }else{
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            setAvatarUrl((prev)=>[...prev,url]);
          }
        }
      };
      fetchAvatars();
    }
  },[])
  useEffect(()=>{
    if(location.state.bookedEmail[0]){
      const fetchNames = async () => {
        for (const email of location.state.bookedEmail) {
          const res = await fetch(`${BASE_URL}/users/getNames?email=${email}`);
          const {name}=await res.json()
          setName((prev)=>[...prev,name])  
        }
      };
      fetchNames();
    }
  },[])
  const dateString = location.state.date;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", { weekday: 'short', day: 'numeric', month: 'long' });
  const {user, accessToken}=useContext(AuthContext)
  const handleClick=async()=>{
    const res=await fetch(`${BASE_URL}/rides/results/booking/create?id=${user}&token=${accessToken}&rideId=${location.state._id}`)
    const result=await res.json()
    if(!res.ok){
      alert(result.message)
    }else{
      navigate('/rides/booked')
    }
    
  }
  return (
    <div className='text-center mr-auto ml-auto mt-12 w-[400px] lg:w-[500px] xl:w-[600px]'>
      <div className='font-bold text-3xl mb-2 ml-4'>{formattedDate}</div>
      <div className="max-w-3xl mt-3">
        <div>
            <div className="relative pl-4 sm:pl-32 py-2 group">
                <div className=" mb-6 flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-600 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-green-300 after:border-2 after:box-content after:border-slate-600 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                    <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">{location.state.time}</time>
                    <div className="text-xl font-semibold">{location.state.from}</div>
                </div>
            </div>
            <div className="relative">
                <time className="sm:absolute -translate-y-8 left-0 items-center justify-center text-s font-bold w-20 h-6 mb-3 sm:mb-0 text-slate-500 rounded-full">{location.state.hours}</time>
            </div>
            <div className="relative pl-4 sm:pl-32 py-2 group">
                <div className="mb-2 flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-600 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-green-300 after:border-2 after:box-content after:border-slate-600 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                    <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">{location.state.uptime}</time>
                    <div className="text-xl font-semibold">{location.state.to}</div>
                </div>
            </div>
        </div>
        <div>
          <hr className='border-8 text-slate-400'></hr>
          <div className='flex pl-4 text-center items-center'>
            <div className='text-slate-500 text-left text-lg font-semibold mt-3 mb-3'>Total price for 1 passenger</div>
            <div className='text-2xl font-semibold ml-auto mr-6'>&euro;{location.state.price}</div>
          </div>
          <hr className='border-8 text-slate-400'></hr> 
        </div>
        <div className='text-center'>
            <div className='flex pl-4 items-center'>
              <div className='text-xl font-semibold'>{driverName}</div>
              <img src={driverAvatar||Avatars}  className="mt-3 ml-auto mr-4 mb-3 w-12 h-12 rounded-full" alt="Avatar"/>
            </div>
            <div className='w-[380px] lg:w-[480px] xl:w-[580px] mr-auto ml-auto'>
              <hr></hr>
              <button className='mt-1 mb-1 flex items-center hover:bg-slate-200 w-[380px] lg:w-[480px] xl:w-[580px] h-12 rounded-xl'>
                <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 mr-4 text-green-400' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2H3C1.89543 2 1 2.89543 1 4V20L4 17H21C22.1046 17 23 16.1046 23 15V4C23 2.89543 22.1046 2 21 2Z" />
                </svg>
                <div className='text-left text-lg font-semibold text-green-400'>Contact {driverName}</div>
              </button>     
              <hr></hr>
              <div className='text-slate-500 text-left text-lg font-semibold mt-3 mb-3'>{location.state.info}</div>
              <hr></hr>
              <div className='text-left text-lg font-semibold mt-3'>{driverInfo.vehicle_brand+driverInfo.vehicle_model}</div>
              <div className=' text-slate-500 text-left text-md font-semibold mb-3'>{driverInfo.vehicle_color}</div>
            </div>
            <hr className='border-8 text-slate-400'></hr>
        </div>
        {location.state.bookedEmail[0] ? avatarUrl.map((avatar, index) => {
            avatarNumber++
            return(
              <div key={index} className=' ml-auto mr-auto w-[380px] lg:w-[480px] xl:w-[580px]'>
              <div className='flex pl-4 text-center items-center'>
                  <div className='text-xl font-semibold'>{name[nameNumber++]}</div>
                  <img src={avatarUrl[avatarNumber-1]||Avatars}  className="mt-3 ml-auto mr-4 mb-3 w-12 h-12 rounded-full" alt="Avatar"/>
              </div>
              <hr></hr>
            </div>)}): 
            <div>
              <div className='flex pl-4 text-center items-center'>
                <div className='text-slate-500 text-left text-lg font-semibold mt-3 mb-3'>No other passengers</div>
              </div>
            </div>  
        }
        <hr className='border-8 text-slate-400'></hr>
        <button onClick={handleClick} className='mt-10 bg-green-400 text-white font-bold rounded-full h-12 w-44 hover:bg-green-500'>Make Reservation</button>
      </div>
    </div>
  )
}

export default Ridedetails
