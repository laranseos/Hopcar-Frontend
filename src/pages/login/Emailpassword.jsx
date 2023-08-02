import React, { useState, useContext} from 'react'
import { useNavigate} from 'react-router-dom'
import { BASE_URL } from '../../utils/config'
import './shake.css'
import { AuthContext } from '../../context/AuthContext'

 const Emailpassword = () => {

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const {dispatch} = useContext(AuthContext)
  const [error, setError] = useState(null);
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const navigate = useNavigate();
   const handleChange = (e) => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
      console.log(credentials)
      setError('');
   }
 
  
  const handleSubmitClick = async(e) => {
    e.preventDefault()
    if (!validateEmail(credentials.email)) {
      setError('This email doesn’t look right. Make sure it includes the @ and . characters.');
    } else {
      try{
        const res=await fetch(`${BASE_URL}/auth/login`,{
          method:'post',
          headers:{
            "content-type":"application/json",
          },
          body:JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const result=await res.json()
        if(!res.ok){
          setError(result.message)
        }else{
          alert(result.message)
          console.log(result.accessToken)
          dispatch({type:"LOGIN_SUCCESS",payload:result.id,token:result.accessToken})
          navigate('/')
        }
      }catch(err){
        setError(err)
      }
    }
  };


  return (
      <>
        <div className='text-center'>
              <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>Log In</h1>
              <div>
                  {error?<input type='text' id='email' name='email' value={credentials.email} onChange={handleChange} className='shake bg-red-200 rounded-xl w-[500px] lg:w-[600px] xl:w-[700px] text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-min-full  mt-12 font-semibold h-16' placeholder='Email'></input>
                  :<input type='text' id='email' name='email' value={credentials.email} onChange={handleChange} className='rounded-xl w-[500px] lg:w-[600px] xl:w-[700px] text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full mt-12 bg-slate-200 font-semibold h-16' placeholder='Email'></input>}
              </div>
              {error && <div className='font-medium text-red-600'>{error}</div>}
              <div>
                  <input type='password' name='password' id='password' value={credentials.password} onChange={handleChange} className='rounded-xl text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full w-[500px] lg:w-[600px] xl:w-[700px] mt-3  bg-slate-200 font-semibold h-16' placeholder='Password'></input>
              </div>
              <br></br>
              <button type="button" onClick={handleSubmitClick} className='mt-16 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500'>Log In</button>
        </div>
      </>
  )
}

export default Emailpassword
