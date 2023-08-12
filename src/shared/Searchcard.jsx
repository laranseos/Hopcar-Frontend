import React,{useState,useEffect} from 'react'
import { useNavigate ,useLocation,Navigate} from 'react-router-dom'
import { Container, Row} from 'reactstrap'
import Avatars from '../assets/images/avatars.png'
import '../pages/shake.css'
import SearchBar from './../shared/SearchBar'
import { BASE_URL } from '../utils/config'
const Searchcard = () => {
  const location=useLocation()
  const ridesData=location.state
  const [avatarUrl, setAvatarUrl] = useState([]);
  const [name,setName]=useState([])
  const navigate = useNavigate();
  const onClick=()=>{
    navigate('/searchcarsharing')
  }
  let avatarNumber=0
  let nameNumber=0
  useEffect(()=>{
    const fetchAvatars = async () => {
      for (const ride of ridesData) {
        const res = await fetch(`${BASE_URL}/rides/results/getavatar?email=${ride.driveremail}`);
        if(!res.ok){
          setAvatarUrl((prev)=>[...prev,""]);
        }else{
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          setAvatarUrl((prev)=>[...prev,url]);
        }
        
      }
    };
    fetchAvatars();
  },[ridesData])
  useEffect(()=>{
    const fetchNames = async () => {
      for (const ride of ridesData) {
        const res = await fetch(`${BASE_URL}/users/getNames?email=${ride.driveremail}`);
        const {name}=await res.json()
        setName((prev)=>[...prev,name])  
      }
    };
    fetchNames();
  },[ridesData])
  return (
    <>
      <Container >
              <Row>
                <h1 className='text-center mt-4 mb-4 font-bold text-4xl text-slate-700'>Where do you want to go?</h1>
                <SearchBar pos="mt-2"/>
              </Row>
      </Container>
      {ridesData?ridesData.map( (ride,index)=>{
        avatarNumber++
        return(
        <div key={index} className='text-center'>
          <button onClick={()=>{navigate('/rides/details',{state:ride})}} className='mt-4 hover:translate-y-1 hover:scale-105 w-[300px] lg:w-[400px] xl:w-[500px]'>
            <div className="relative py-2 px-3 rounded-xl bg-green-50 bg-clip-border text-slate-700 shadow-md">
              <div className="max-w-3xl">
                <div>
                    <div className="relative pl-4 sm:pl-32 py-2 group">
                        <div className="flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-600 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-green-300 after:border-2 after:box-content after:border-slate-600 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                            <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">{ride.time}</time>
                            <div className="text-xl font-semibold">{ride.from}</div>
                            <div className='text-2xl font-semibold ml-auto mr-4'>&euro;{ride.price}</div>
                        </div>
                    </div>
                    <div className="relative pl-4 sm:pl-32 py-2 group">
                        <div className="flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-600 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-green-300 after:border-2 after:box-content after:border-slate-600 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                            <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">{ride.hours}</time>
                            <div className="text-xl font-semibold">{ride.to}</div>
                        </div>
                    </div>
                </div>
              </div>
              <div className='flex ml-4 items-center'>
                  <img src={avatarUrl[avatarNumber-1] || Avatars}  className="w-12 h-12 rounded-full" alt="Avatar"/>
                  <div className='text-lg font-medium ml-2'>{name[nameNumber++]}</div>
              </div>        
            </div>
          </button>
        </div>
        )
        
      }):
        <div className='text-center'>
            <h1 className='text-6xl font-bold text-green-500 mt-52'>There is no results matched.Try again</h1>
            <button onClick={onClick} className='mt-24 bg-blue-600 text-white font-bold rounded-full h-12 w-28 hover:bg-blue-800'>Continue</button>
        </div>
      }
    </>
  )
}

export default Searchcard
