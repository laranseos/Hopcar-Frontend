import React, { useState, useContext} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

 const Details = () => {

   const location=useLocation();
   const [credentials, setCredentials] = useState({
    birthday: location.state.birthday,
    firstname: location.state.firstname,
    lastname: location.state.lastname,
    email:location.state.email,
    gender: location.state.gender,
    phonenumber:location.state.phonenumber
  });

   const navigate = useNavigate();
   const handleClick = (e) => {

      let str=`/profile/details/${e.target.id}`;
      navigate(str,{state:credentials});
   };


   return (
      <>
         <div className='text-center'>
            <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>Personal details</h1>
            <div className='mt-12 w-[500px] lg:w-[600px] xl:w-[700px] ml-auto mr-auto'>
               
               <button id='name' onClick={handleClick} className='text-left h-16 w-[500px] lg:w-[600px] xl:w-[700px] hover:rounded-2xl hover:bg-slate-200 font-semibold text-lg'>
                  <label className=' ml-4 text-slate-500'>Full name</label>
                  <br></br>
                  <label className='ml-4 text-green-500'>{credentials.firstname} {credentials.lastname}</label>
               </button>

               <button id='gender' onClick={handleClick} className='text-left h-16 w-[500px] lg:w-[600px] xl:w-[700px] hover:rounded-2xl hover:bg-slate-200 font-semibold text-lg'>
                  <label className=' ml-4 text-slate-500'>Gender</label>
                  <br></br>
                  <label className='ml-4 text-green-500'>{credentials.gender}</label>
               </button>

               <button id='birthday' onClick={handleClick} className='text-left h-16 w-[500px] lg:w-[600px] xl:w-[700px] hover:rounded-2xl hover:bg-slate-200 font-semibold text-lg'>
                  <label className=' ml-4 text-slate-500'>Date of Birth</label>
                  <br></br>
                  <label className='ml-4 text-green-500'>{credentials.birthday}</label>
               </button>

               <button id='phonenumber' onClick={handleClick} className='text-left h-16 w-[500px] lg:w-[600px] xl:w-[700px] hover:rounded-2xl hover:bg-slate-200 font-semibold text-lg'>
                  <label className=' ml-4 text-slate-500'>Phone Number</label>
                  <br></br>
                  <label className='ml-4 text-green-500'>{credentials.phonenumber}</label>
               </button>

               <button id='password' onClick={handleClick} className='text-left h-16 w-[500px] lg:w-[600px] xl:w-[700px] hover:rounded-2xl hover:bg-slate-200 font-semibold text-lg'>
                  <label className=' ml-4 text-slate-500'>Password</label>
                  <br></br>
                  <label className='ml-4 text-green-500'>********</label>
               </button>
            </div>
         </div>
      </>
   )
}

export default Details