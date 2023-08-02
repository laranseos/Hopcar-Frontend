import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import Phonenumber from './Phonenumber';
import { BASE_URL } from '../../../utils/config';
const Gender = () => {
   const {user,accessToken}=useContext(AuthContext)
   const location=useLocation();
   const [credentials, setCredentials] = useState({
    birthday: location.state.birthday,
    firstname: location.state.firstname,
    lastname: location.state.lastname,
    email:location.state.email,
    gender: null,
    phonenumber: location.state.phonenumber
  });



   const navigate = useNavigate();
  
   const handleClick = async(e) => {
      setCredentials(prev => ({ ...prev, gender : e.target.value }));
   };

   useEffect(() => {
      if(credentials.gender){
         fetch(`${BASE_URL}/users?id=${user}&token=${accessToken}`, {
            method: 'put',
            headers: {
               'content-type': 'application/json'
            },
            body: JSON.stringify({gender:credentials.gender})
         })
         navigate('/profile/details',{state:credentials})
      }
    }, [credentials.gender]);


   return (
      <>
         <div className='text-center'>
            <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>How would you like to be addressed?</h1>
            <div className='w-[500px] lg:w-[600px] xl:w-[700px] ml-auto mr-auto'>
               <button value='female' onClick={handleClick} className='mt-12 h-16 w-[500px] lg:w-[600px] xl:w-[700px] hover:rounded-2xl hover:bg-slate-200 font-semibold text-lg'>Mrs. / Ms.</button>
               <hr></hr>
               <button value='male' onClick={handleClick} className='h-16 w-[500px] lg:w-[600px] xl:w-[700px] hover:rounded-2xl hover:bg-slate-200 font-semibold text-lg'>Mr</button>
               <hr></hr>
               <button value='not' onClick={handleClick} className='h-16 w-[500px] lg:w-[600px] xl:w-[700px] hover:rounded-2xl hover:bg-slate-200 font-semibold text-lg'>I'd rather not say</button>
            </div>
         </div>
      </>
   )
}

export default Gender
