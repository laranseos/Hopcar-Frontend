import React from 'react'
import { useNavigate} from 'react-router-dom'

 const ReservationAlert = () => {

  const navigate = useNavigate();
  const handleSubmitClick = (e) => {
    e.preventDefault();
    navigate('/myrides')
  };

   return (
      <>
        <div className='text-center'>
            <h1 className='text-5xl font-bold mt-52 text-blue-600 w-[1000px] ml-auto mr-auto'>Your Reservation is applied! &#10;You can now contact with driver!</h1>
            <button type='submit' onClick={handleSubmitClick} className='mt-24 bg-green-400 text-white font-bold rounded-full h-12 w-40 hover:bg-green-500'>See my reservation</button>
        </div>
      </>
   )
}

export default ReservationAlert
