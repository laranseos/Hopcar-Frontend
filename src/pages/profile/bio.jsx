import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './shake.css'
import { BASE_URL } from '../../utils/config'
 const Bio = () => {

   const [bio, setBio] = useState('');
   const {user,accessToken}=useContext(AuthContext)
   const navigate = useNavigate();

   const handleChange = (event) => {
      setBio(event.target.value);
      setError('');
   }

 const [error, setError] = useState(null);

  const handleSubmitClick = async(e) => {
    e.preventDefault();
    if (bio.length<10) {
      setError('Your mini bio must be min. 10 characters.');
    } else {
      await fetch(`${BASE_URL}/users?id=${user}&token=${accessToken}`, {
         method: 'put',
         headers: {
           'content-type': 'application/json'
         },
         body: JSON.stringify({bio:bio})
      })
    navigate('/profile/menu',{state:bio})
    }
  };


   return (
      <>
        <div className='text-center w-full'>
            <form onSubmit={handleSubmitClick}>
               <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>What would you like other members to know about you?</h1>
               <div>
                  {error?(<textarea name='email' value={bio} onChange={handleChange} className='shake rounded-xl w-[500px] lg:w-[600px] xl:w-[700px] text-lg appearance-nonen border-gray-200  focus:outline-none focus:border-green-500  focus:border-2 w-max-full mt-12 bg-red-200 font-semibold h-44' placeholder="What are your interests?&#10;Is there anywhere you travel regularly?&#10;Why should people travel with you?"></textarea>):
                  (<textarea name='email' value={bio} onChange={handleChange} className='rounded-xl w-[500px] lg:w-[600px] xl:w-[700px] text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full mt-12 bg-slate-200 font-semibold h-44' placeholder='What are your interests?&#10;Is there anywhere you travel regularly?&#10;Why should people travel with you?'></textarea>)}
               </div>
               {error && <div className='font-medium text-red-600'>{error}</div>}
               <br></br>
               <button type='submit' className='mt-16 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500'>Save</button>
            </form>
        </div>
      </>
   )
}

export default Bio
