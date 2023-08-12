import react, { useContext } from 'react'
import { useNavigate ,useLocation,Navigate} from 'react-router-dom'
import { BASE_URL } from '../../utils/config'
import { AuthContext } from '../../context/AuthContext'
const ReservationDelete=()=>{
    const location=useLocation()
    const {user}=useContext(AuthContext)
    const navigate=useNavigate()
    const id=location.state
    const onClick=async(e)=>{
        if(e.target.id==="yes"){
            const res=await fetch(`${BASE_URL}/rides/deleteBooking?rideId=${id}&userId=${user}`,{
                method:'delete',
                headers:{
                    'content-type':'application/json'
                }
            })
            const {message}=await res.json()
            alert(message)
            navigate('/')
        }else{
            navigate('/myrides')
        }
    }
    return (
    <div className='text-center' >
        <h1 className='text-6xl font-bold text-green-500 mt-52'>Do you really want to delete your reservation? </h1>
        <button id="yes" onClick={onClick} className='mt-24  bg-blue-600 text-white font-bold rounded-full h-12 w-28 hover:bg-blue-800'>Yes</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button id="no" onClick={onClick} className='mt-24  bg-blue-600 text-white font-bold rounded-full h-12 w-28 hover:bg-blue-800'>No</button>
    </div>
    )
}
export default ReservationDelete