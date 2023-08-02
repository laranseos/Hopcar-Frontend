import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'
import './shake.css'
 const Emailverify = () => {

   const location=useLocation();
   const [email, setEmail] = useState(location.state);
  

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [number, setNumber] = useState("");
  const [error, setError] = useState(null);
  const [isEmailVerified,setIsEmailVerified]=useState(false)
  function handleChange(e) {
    setError('');
    const input = e.target.value;
    const numbersOnly = input.replace(/[^0-9]/g, "");
    if(numbersOnly.length<=6){
      setNumber(numbersOnly);      

  }
  }

  function handleDelete(e) {
    if(e.keyCode === 8 || e.keyCode === 46) {
      setNumber(number.slice(0,-1));
    }
  }
  

  const handleSubmitClick = async(e) => {
    e.preventDefault();
    if(number.length<6){
      setError('Input 6-digit number');
    } 
    else {
      try {
        const res = await fetch(`${BASE_URL}/auth/verifyEmail`, {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({verificationCode:number})
        })
        
        const result =await res.json()
        
        if (!res.ok) {
          //navigate('/register/name',{state:isEmailVerified})
          setError(result.message)
        }
        else{

          navigate('/register/name',{state:email})
        }
      } catch (err) {
        setError(err)
      }
    } 
          // dispatch({ type: 'REGISTER_SUCCESS' },{state:email})
          // navigate('/register/name')
    }

  

   return (
      <>
        <div className='text-center w-full'>
            <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>Enter the code we sent you by email</h1>
            <div>
              <h2 className='mt-12 mb-2 font-bold text-lg text-slate-500'>We've sent a code to : {email}</h2>
              {error?<input type='text' name='number' id='number' value={number} onChange={handleChange} onKeyDown={handleDelete} className='shake bg-red-200 rounded-xl w-[500px] lg:w-[600px] xl:w-[700px] text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-min-full  mt-0 font-semibold h-16' placeholder='6-digit code'></input>
              :<input type='text' name='number' id='number' value={number} onChange={handleChange} onKeyDown={handleDelete} className='rounded-xl w-[500px] lg:w-[600px] xl:w-[700px] text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full mt-0 bg-slate-200 font-semibold h-16' placeholder='6-digit code'></input>}
            </div>
            {error && <div className='font-medium text-red-600'>{error}</div>}
            <div className='w-[500px] lg:w-[600px] xl:w-[700px] ml-auto mr-auto'>
              <button className=' text-left mt-1 h-12 w-[500px] lg:w-[600px] xl:w-[700px] hover:rounded-2xl hover:bg-slate-200 font-semibold text-lg text-cyan-400'>Resend code</button>                
            </div>
            <br></br>
            {!error &&<button type='submit' onClick={handleSubmitClick} className='mt-12 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500'>Validate</button>}
        </div>
      </>
   )
}
 
export default Emailverify
 