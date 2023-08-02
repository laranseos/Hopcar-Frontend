import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import '../shake.css'
import { BASE_URL } from '../../../utils/config'
const Password = () => {

  const location=useLocation();
  const [error, setError] = useState(null)
  const [errorNew,setErrorNew]=useState(null)
  const navigate = useNavigate();
  const {user,accessToken}=useContext(AuthContext)
  const [credentials, setCredentials] = useState({
    birthday: location.state.birthday,
    firstname: location.state.firstname,
    lastname: location.state.lastname,
    email:location.state.email,
    gender: location.state.gender,
    password: null,
    newpassword:null
  });
  const handleChange = (e) => {
  setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value}));
  setError('')
  setErrorNew('')
  }  
  const validatePassword = (password) => {
  // Check for at least 8 characters
  if (password.length < 8) {
    return false;
  }
  // Check for at least 1 letter 
  const hasLetter = /[a-zA-Z]/.test(password);
  if (!hasLetter) {
    return false;
  } 
  // Check for at least 1 number  
  const hasNumber = /[0-9]/.test(password);
  if (!hasNumber) {
    return false;   
  }
  // Check for at least 1 special character
  const hasSpecialChar = /[!@#$%^&*()]/.test(password); 
  if (!hasSpecialChar) {
    return false;
  }
  return true;  
  }
  const handleSubmitClick = async(e) => {
    e.preventDefault();
    if (!validatePassword(credentials.password)) {
      setError('Your password must have at least 8 characters, 1 letter, 1 number and 1 special character.');
    }
    if (!validatePassword(credentials.newpassword)) {
      setErrorNew('Your password must have at least 8 characters, 1 letter, 1 number and 1 special character.');
    }
    else {
      const res=await fetch(`${BASE_URL}/users?id=${user}&token=${accessToken}`, {
        method: 'put',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({password:credentials.password,newpassword:credentials.newpassword})
     })
     if(!res.ok){
        setError(res.json().message)
        setErrorNew(res.json().message)
     }else{
        navigate('/profile/details',{state:credentials})
        console.log(credentials);
     }
    }
  };
   return (
      <>
        <div className='text-center w-full'>
            <form onSubmit={handleSubmitClick}>
               <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>Define your password</h1>
               <div className='mt-6'>
                  {error?<input type='password' name='password' id='password' value={credentials.password} onChange={handleChange} className='shake bg-red-200 rounded-xl w-[500px] lg:w-[600px] xl:w-[700px] text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-min-full  mt-0 font-semibold h-16' placeholder='Current password'></input>
                  :<input type='password' name='password' id='password' value={credentials.password} onChange={handleChange} className='rounded-xl w-[500px] lg:w-[600px] xl:w-[700px] text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full mt-0 bg-slate-200 font-semibold h-16' placeholder='Current password'></input>}
               </div>
               <div className='mt-4'>
                  {errorNew?<input type='password' name='newpassword' id='newpassword' value={credentials.newpassword} onChange={handleChange} className='shake bg-red-200 rounded-xl w-[500px] lg:w-[600px] xl:w-[700px] text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-min-full  mt-0 font-semibold h-16' placeholder='New password'></input>
                  :<input type='password' name='newpassword' id='newpassword' value={credentials.newpassword} onChange={handleChange} className='rounded-xl w-[500px] lg:w-[600px] xl:w-[700px] text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full mt-0 bg-slate-200 font-semibold h-16' placeholder='New password'></input>}
               </div>
               {(error||errorNew) && <div className='font-medium text-red-600'>{error}</div>}
               <br></br>
               <button type='submit' className='mt-16 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500'>Save</button>
            </form>
        </div>
      </>
   )
}

export default Password
