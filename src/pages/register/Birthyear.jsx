import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import validator from 'validator'
import './shake.css'

 const Birthyear = () => {

  const location=useLocation();
  const [credentials, setCredentials] = useState({
    birthday: "",
    firstname: location.state.firstname,
    lastname: location.state.lastname,
    email:location.state.email
  });

   const { dispatch } = useContext(AuthContext);
   const navigate = useNavigate();

   const [errorMessage, setErrorMessage] = useState('')

   const handleChange = (e) => {
         setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
         setErrorMessage('');
   }
  
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if(validator.isDate(credentials.birthday)){

      navigate('/register/gender',{state:credentials})
   }
   else { 
      setErrorMessage('The date is invalid.');
   }
  };


   return (
      <>
        <div className='text-center'>
            <form onSubmit={handleSubmitClick}>
               <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>What's your date of birth?</h1>
               <div>
                  {
                     errorMessage?<input type='date' name='birthday' id='birthday' value={credentials.birthday} onChange={handleChange} className='shake datepicker rounded-xl text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full w-[500px] lg:w-[600px] xl:w-[700px] mt-12  bg-red-200 font-semibold h-16'></input>:
                     <input type='date' name='birthday' id='birthday' value={credentials.birthday} onChange={handleChange} className='datepicker rounded-xl text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full w-[500px] lg:w-[600px] xl:w-[700px] mt-12  bg-slate-200 font-semibold h-16'></input>
                  }
                  {/* <input type='date' name='birthday' id='birthday' value={credentials.birthday} onChange={handleChange} className='datepicker rounded-xl text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full w-[500px] lg:w-[600px] xl:w-[700px] mt-12  bg-slate-200 font-semibold h-16'></input> */}
               </div>
               {errorMessage && <div className='font-medium text-red-600'>{errorMessage}</div>}
               {credentials.birthday&&!errorMessage?(<button type='submit' className='mt-16 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500'>Continue</button>):null}
            </form>
        </div>
      </>
   )
}

export default Birthyear
