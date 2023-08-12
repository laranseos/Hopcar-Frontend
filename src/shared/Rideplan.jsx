import React ,{useState,useEffect} from 'react'
import Avatars from '../assets/images/avatars.png'
import '../pages/shake.css'
import { useLocation ,useNavigate} from 'react-router-dom'
import { BASE_URL } from '../utils/config'

 const Rideplan = () => {
  const navigate=useNavigate()
  const location = useLocation();
  let avatarNumber=0
  let nameNumber=0
  const [avatarUrl, setAvatarUrl] = useState([]);
  const [name,setName]=useState([])
  useEffect(()=>{
    if(location.state.bookedEmail[0]){
      const fetchAvatars = async () => {
        for (const email of location.state.bookedEmail) {
          const res = await fetch(`${BASE_URL}/rides/results/getavatar?email=${email}`);
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          setAvatarUrl((prev)=>[...prev,url]);
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
  const handleClick=()=>{
    navigate('/ride/edit/pickup')
    localStorage.setItem('rideID',location.state._id)
  }
  const handleClose=()=>{
    navigate('/ride/delete',{state:location.state._id})
  }
  const dateString = location.state.date;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", { weekday: 'short', day: 'numeric', month: 'long' });

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
          <hr className='border-8 text-slate-400'></hr>
          {avatarUrl[0]?<div className='text-black text-3xl mt-3'>passengers who booked your ride</div>:<></>}
          {avatarUrl[0] ? avatarUrl.map((item, index) => (
            <div key={index} className=' ml-auto mr-auto w-[380px] lg:w-[480px] xl:w-[580px]'>
              <div className='flex pl-4 text-center items-center'>
                  <div className='text-xl font-semibold'>{name[nameNumber++]}</div>
                  <img src={avatarUrl[avatarNumber++]}  className="mt-3 ml-auto mr-4 mb-3 w-12 h-12 rounded-full" alt="Avatar"/>
              </div>
              <hr></hr>
            </div>)) : 
            <div>
              <div className='flex pl-4 text-center items-center'>
                <div className='text-slate-500 text-left text-lg font-semibold mt-3 mb-3'>No other passengers</div>
              </div>
            </div>
          }
          <hr className='border-8 text-slate-400'></hr>
          <div className='w-[380px] lg:w-[480px] xl:w-[580px] mr-auto ml-auto'>
            <button className='mt-1 mb-1 flex items-center hover:bg-slate-200 w-[380px] lg:w-[480px] xl:w-[580px] h-12 rounded-xl'>
              <svg xmlns="http://www.w3.org/2000/svg" className='text-green-500 mb-auto mt-auto mr-1 w-6 h-6 feather feather-edit-3' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              <div onClick={handleClick} className='text-left text-lg font-semibold text-green-400'>Reset your publication</div>
            </button>     
            <button className='mt-1 mb-1 flex items-center hover:bg-slate-200 w-[380px] lg:w-[480px] xl:w-[580px] h-12 rounded-xl'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="green"> <path d="M0 0h24v24H0z" fill="none" /> <path d="M16.59 6L12 10.59 7.41 6 6 7.41 10.59 12 6 16.59 7.41 18 12 13.41 16.59 18 18 16.59 13.41 12 18 7.41 16.59 6zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
              <div onClick={handleClose} className='text-left text-lg font-semibold text-green-400'>&nbsp;Close your ride</div>
            </button>   
          </div>
        </div>
      </div>
  )
}

export default Rideplan