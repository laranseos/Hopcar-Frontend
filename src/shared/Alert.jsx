import React from 'react'
import { useNavigate,useLocation} from 'react-router-dom'

const Alert = () => {
  const location=useLocation()
  const navigate = useNavigate();
  const handleSubmitClick = (e) => {
    e.preventDefault();
      navigate('/home')
  };

   return (
      <d>
        <div className='text-center'>
            <h1 className='text-6xl font-bold text-green-500 mt-52'>{location.state}</h1>
            <button type='submit' onClick={handleSubmitClick} className='mt-24 bg-blue-600 text-white font-bold rounded-full h-12 w-28 hover:bg-blue-800'>Continue</button>
        </div>
      </d>
   )
}

export default Alert
