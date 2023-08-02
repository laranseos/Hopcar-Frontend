import React, { useState,useContext,useEffect} from 'react'
import Avatars from '../../assets/images/avatars.png'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'

const Menu = () => {
   const {user,accessToken,dispatch}=useContext(AuthContext)
   const [credentials,setCredentials]=useState({})
   useEffect(() => {
      const getAvatar=async()=>{
         try{
            fetch(`${BASE_URL}/profile/download-avatar?id=${user}&token=${accessToken}`)
            .then(res=>res.blob())
            .then(blob=>URL.createObjectURL(blob))
            .then(avatarUrl=>setAvatarUrl(avatarUrl))
            console.log(avatarUrl)
            //credentials=JSON.stringify(data)
            dispatch({type:"LOGIN_SUCCESS",payload:user,token:accessToken})
         }catch(err){
            console.log(err)
         }
      }            
      getAvatar()

   }, []);
   useEffect(()=>{
      const getData=async()=>{
         try{
            const res=await fetch(`${BASE_URL}/users/getone?id=${user}&token=${accessToken}`,{
               method: 'get',
               headers: {
               'content-type': 'application/json'
               }
            })
            const {data}=await res.json()
            setCredentials(data)
            //credentials=JSON.stringify(data)
         }catch(err){
            console.log(err)
         }
      }            
      getData()
   },[])
   const [avatarUrl, setAvatarUrl] = useState('');

   
   
   const navigate = useNavigate();

   const handleProfile = () => {
      navigate('/profile/details',{state:credentials});
   };
   const handleAvatar = () => {
      navigate('/profile/avatar',{state:credentials});
   };
   const handleBio = () => {
      navigate('/profile/bio',{state:credentials});
   };
   const handleVehicle = () => {
      navigate('/profile/vehicle/licensenum',{state:credentials});
   };

   if(!credentials){
      return <div className='mr-auto ml-auto mt-36'>Loading...</div>
   }
   return (
      <>
         <div>
            <div className='w-[500px] lg:w-[500] xl:w-[600px] ml-auto mr-auto'>
               <button value='Ms' className='flex mt-12 mb-4 h-24 w-[500px] lg:w-[500] xl:w-[600px] hover:rounded-2xl hover:bg-slate-200 font-semibold text-lg'> 
                  
                  <div className='ml-4'>
                     <h1 className='mt-auto mb-3 text-5xl text-left ml-2 font-md text-slate-600'>{credentials.firstname}</h1>
                     <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='text-green-500 w-6 h-6 mb-auto mt-auto mr-1 feather feather-check-circle' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        <button value='' className='h-8 text-green-500 text-left hover:rounded-lg hover:bg-slate-200 font-semibold text-lg'>{credentials.email}</button>
                     </div>
                  </div>
                  {credentials.isavatar ? <img src={avatarUrl} alt='avatar' className="w-24 mr-4 ml-auto rounded-full" /> : <img src={Avatars}  className="w-24 mr-4 ml-auto rounded-full" alt="Avatar"/>}
               </button>
               <hr></hr>
               {credentials.avatar ? <div className='flex mt-2 ml-4'>
                     <svg xmlns="http://www.w3.org/2000/svg" className='text-green-500 mb-auto mt-auto mr-1 w-6 h-6 feather feather-edit-3' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                     <button value='' onClick={handleAvatar} className='h-8 text-green-500 text-left w-[500px] lg:w-[500] xl:w-[600px] hover:rounded-lg hover:bg-slate-200 font-semibold text-lg'>Edit Profile Picture</button>
                  </div> : <div className='flex mt-2 ml-4'>
                     <svg xmlns="http://www.w3.org/2000/svg" className='text-green-500 mb-auto mt-auto mr-1 w-6 h-6 feather feather-plus' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                     <button value='' onClick={handleAvatar} className='h-8 text-green-500 text-left w-[500px] lg:w-[500] xl:w-[600px] hover:rounded-lg hover:bg-slate-200 font-semibold text-lg'>Add Profile Picture</button>
                  </div>
               }
               <div className='flex mt-2 ml-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-green-500 mb-auto mt-auto mr-1 w-6 h-6 feather feather-edit-3' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                  <button value='' onClick={handleProfile} className='mb-2 h-8 text-green-500 text-left w-[500px] lg:w-[500] xl:w-[600px] hover:rounded-lg hover:bg-slate-200 font-semibold text-lg'>Edit Personal details</button>
               </div>
               {/* <h1 className='mt-2 mb-2 text-xl text-left ml-2 font-semibold text-slate-600'>Verify your profile</h1> */}
               {credentials.bio ? <div className='flex mb-2 ml-4'>
                     <svg xmlns="http://www.w3.org/2000/svg" className='text-green-500 w-6 h-6 mb-auto mt-auto mr-1 feather feather-check-circle' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                     <button onClick={handleBio} className='h-8 text-green-500 text-left w-[500px] lg:w-[500] xl:w-[600px] hover:rounded-lg hover:bg-slate-200 font-semibold text-lg'>Edit mini bio</button>
                  </div> : <div className='flex mb-2 ml-4'>
                     <svg xmlns="http://www.w3.org/2000/svg" className='text-green-500 mb-auto mt-auto mr-1 w-6 h-6 feather feather-plus' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                     <button  onClick={handleBio}  className='h-8 text-green-500 text-left w-[500px] lg:w-[500] xl:w-[600px] hover:rounded-lg hover:bg-slate-200 font-semibold text-lg'>Add mini bio</button>
                  </div>
               }
               {credentials.isvehicle ? <div className='flex mb-2 ml-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-green-500 w-6 h-6 mb-auto mt-auto mr-1 feather feather-check-circle' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <button value='' onClick={handleVehicle} className='h-8 text-green-500 text-left w-[500px] lg:w-[500] xl:w-[600px] hover:rounded-lg hover:bg-slate-200 font-semibold text-lg'>Edit vehicle</button>
               </div> : <div className='flex mb-2 ml-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-green-500 mb-auto mt-auto mr-1 w-6 h-6 feather feather-plus' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                  <button value='' onClick={handleVehicle}  className='h-8 text-green-500 text-left w-[500px] lg:w-[500] xl:w-[600px] hover:rounded-lg hover:bg-slate-200 font-semibold text-lg'>Add vehicle</button>
               </div>
               }
            </div>
         </div>
      </>
   )
}

export default Menu
