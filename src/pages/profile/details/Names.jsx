import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { BASE_URL } from '../../../utils/config'
 const Names = () => {
   const {user,accessToken}=useContext(AuthContext)
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

   const handleChange = (e) => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }
  
  const handleSubmitClick = async(e) => {
    e.preventDefault();
      await fetch(`${BASE_URL}/users?id=${user}&token=${accessToken}`, {
         method: 'put',
         headers: {
         'content-type': 'application/json'
         },
         body: JSON.stringify({firstname:credentials.firstname,lastname:credentials.lastname})
      })
      navigate('/profile/details',{state:credentials})
  };


   return (
      <>
        <div className='text-center'>
            <form onSubmit={handleSubmitClick}>
               <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>What's your name?</h1>
               <div>
                  <input type='text' name='firstname' id='firstname' value={credentials.firstname} onChange={handleChange} className='rounded-xl text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full w-[500px] lg:w-[600px] xl:w-[700px] mt-12  bg-slate-200 font-semibold h-16' placeholder='First name'></input>
               </div>
               <div>
                  <input type='text' name='lastname' id='lastname' value={credentials.lastname} onChange={handleChange} className='rounded-xl text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full w-[500px] lg:w-[600px] xl:w-[700px] mt-3  bg-slate-200 font-semibold h-16' placeholder='Last name'></input>
               </div>
               
               <br></br>
               {credentials.firstname&&credentials.lastname?(<button type='submit' className='mt-16 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500'>Save</button>):null}
            </form>
        </div>
      </>
   )
}

export default Names
