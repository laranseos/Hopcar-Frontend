import React from 'react'
import '../pages/shake.css'
import { useNavigate } from 'react-router-dom'
 const BookCard = ({ride}) => {

  const navigate = useNavigate();
  const dateString = ride.date;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", { weekday: 'short', day: 'numeric', month: 'long' });

   const handleClick = () => {
      navigate('/bookplan',{state:ride})
   }

   return (
      <div className='text-center'>
        <button onClick={handleClick} className='mt-4 hover:translate-y-1 hover:scale-105 w-[300px] lg:w-[400px] xl:w-[500px]'>
          <div className="relative py-2 px-3 rounded-xl bg-pink-50 bg-clip-border text-slate-700 shadow-md">
            <div className='font-bold text-xl mb-2 ml-4 text-left'>{formattedDate} <span className=' font-md text-sm rounded-full bg-pink-200 animate-pulse p-1 shadow-md shadow-slate-400 text-red-700'>new book</span></div>
            <div className="max-w-3xl">
              <div>
                  <div className="relative pl-4 sm:pl-32 py-2 group">
                      <div className="flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-600 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-pink-300 after:border-2 after:box-content after:border-slate-600 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                          <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 sm:mb-0 text-pink-600 bg-pink-200 rounded-full">{ride.time}</time>
                          <div className="text-xl font-semibold">{ride.from}</div>
                      </div>
                  </div>
                  <div className="relative">
                      <time className="sm:absolute -translate-y-4 left-0 items-center justify-center mt-2 text-xs font-bold w-20 h-6 mb-3 sm:mb-0 text-slate-500 rounded-full">{ride.hours}</time>
                  </div>
                  <div className="relative pl-4 sm:pl-32 py-2 group">
                      <div className="flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-600 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-pink-300 after:border-2 after:box-content after:border-slate-600 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                          <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-pink-600 bg-pink-200 rounded-full">{ride.uptime}</time>
                          <div className="text-xl font-semibold">{ride.to}</div>
                      </div>
                  </div>
              </div>
            </div>        
          </div>
        </button>
      </div>
   )
}

export default BookCard
