import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

 const Gender = () => {

   const location=useLocation();
   const [credentials, setCredentials] = useState({
    birthday: location.state.birthday,
    firstname: location.state.firstname,
    lastname: location.state.lastname,
    email:location.state.email,
    gender: ""
  });


   const { dispatch } = useContext(AuthContext);
   const navigate = useNavigate();
  
   const handleClick = (e) => {
      setCredentials(prev => ({ ...prev, gender : e.target.value }));
   };

   useEffect(() => {
      if(credentials.gender){
         console.log(credentials.gender);
  
         navigate('/register/password',{state:credentials})
      }
    }, [credentials.gender]);


   return (
      <>
         <div className='text-center'>
            <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>How would you like to be addressed?</h1>
            <div className='w-[500px] lg:w-[600px] xl:w-[700px] ml-auto mr-auto'>
               <button value='Ms' onClick={handleClick} className='mt-12 h-16 w-[500px] lg:w-[600px] xl:w-[700px] hover:rounded-2xl hover:bg-slate-200 font-semibold text-lg'>Mrs. / Ms.</button>
               <hr></hr>
               <button value='Mr' onClick={handleClick} className='h-16 w-[500px] lg:w-[600px] xl:w-[700px] hover:rounded-2xl hover:bg-slate-200 font-semibold text-lg'>Mr</button>
               <hr></hr>
               <button value='No' onClick={handleClick} className='h-16 w-[500px] lg:w-[600px] xl:w-[700px] hover:rounded-2xl hover:bg-slate-200 font-semibold text-lg'>I'd rather not say</button>
            </div>
         </div>
      </>
   )
}

export default Gender
