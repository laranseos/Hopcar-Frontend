import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

 const Name = () => {

  const location=useLocation();
  const [credentials, setCredentials] = useState({
    firstname: "",
    lastname: "",
    email:location.state
  });

   const { dispatch } = useContext(AuthContext);
   const navigate = useNavigate();

   const handleChange1 = (e) => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const handleChange2 = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
 }

  
  const handleSubmitClick = (e) => {
    e.preventDefault();
   
      navigate('/register/birthyear',{state:credentials})
  };


   return (
      <>
        <div className='text-center'>
            <form onSubmit={handleSubmitClick}>
               <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>What's your name?</h1>
               <div>
                  <input type='text' name='firstname' id='firstname' value={credentials.firstname} onChange={handleChange1} className='rounded-xl text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full w-[500px] lg:w-[600px] xl:w-[700px] mt-12  bg-slate-200 font-semibold h-16' placeholder='First name'></input>
               </div>
               <div>
                  <input type='text' name='lastname' id='lastname' value={credentials.lastname} onChange={handleChange2} className='rounded-xl text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full w-[500px] lg:w-[600px] xl:w-[700px] mt-3  bg-slate-200 font-semibold h-16' placeholder='Last name'></input>
               </div>
               
               <br></br>
               {credentials.firstname&&credentials.lastname?(<button type='submit' className='mt-16 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500'>Continue</button>):null}
            </form>
        </div>
      </>
   )
}

export default Name
