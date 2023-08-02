import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PhoneInput from 'react-phone-number-input/input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { AuthContext } from '../../../context/AuthContext'
import '../shake.css'
import { BASE_URL } from '../../../utils/config'

 const Phonenumber = () => {

  const location = useLocation();
  const [credentials, setCredentials] = useState({
    birthday: location.state.birthday,
    firstname: location.state.firstname,
    lastname: location.state.lastname,
    email:location.state.email,
    gender: location.state.gender,
    phonenumber:location.state.phonenumber
  });

  const {user,accessToken}=useContext(AuthContext)
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, phonenumber : document.getElementById("phonenumber").value }));
    setError('');
 }

  const handleSubmitClick = async(e) => {
    e.preventDefault();
    if(!isValidPhoneNumber(credentials.phonenumber)){
      setError('Double check the phone number format and try again.');
    } 
    else {
      await fetch(`${BASE_URL}/users?id=${user}&token=${accessToken}`, {
        method: 'put',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({phonenumber:credentials.phonenumber})
     })
     navigate('/profile/details',{state:credentials})
    }
  };

   return (
      <>
        <div className='text-center w-full'>
            <form onSubmit={handleSubmitClick}>
               <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>Verify your phone number</h1>
            
               <div>
                  {error?<PhoneInput id='phonenumber' className='shake bg-red-200 rounded-xl w-[500px] lg:w-[600px] xl:w-[700px] text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500 focus:border-2 w-min-full  mt-12 font-semibold h-16' placeholder='Phone number'
                      international
                      value={credentials.phonenumber}
                      onChange={handleChange} />:
                      <PhoneInput id='phonenumber' className='bg-slate-200 rounded-xl w-[500px] lg:w-[600px] xl:w-[700px] text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500 focus:border-2 w-min-full  mt-12 font-semibold h-16' placeholder='Phone number'
                      international
                      value={credentials.phonenumber}
                      onChange={handleChange} />}
               </div>
               {error && <div className='font-medium text-red-600'>{error}</div>}
              
               <br></br>
               {credentials.phonenumber?(!error &&<button type='submit' className='mt-12 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500'>Save</button>):null}
            </form>
        </div>
      </>
   )
}
 
export default Phonenumber
 