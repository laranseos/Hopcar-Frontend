import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './shake.css'
import {BASE_URL} from '../../utils/config'
import loading from "../../assets/images/loading.gif"
const Email = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [isloading,setIsloading]=useState(false)
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (event) => {
          setEmail(event.target.value);
          console.log(email)
          setError('');
          setIsloading(false)
    }

   

    const validateEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    const handleSubmitClick = async(e) => {
      setError('')
      setIsloading(true)
      console.log(email)
      e.preventDefault();
      if (!validateEmail(email)) {
        setError('That’s not valid, try again!');
      } else{
          try {
            const res = await fetch(`${BASE_URL}/auth/sendEmail`, {
                method: 'post',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({email:email})
            })
            
            const result =await res.json()
            console.log(result.message)
            if (!res.ok) {
              navigate('/register/emailverify',{state:email})
              setError(result.message)
            }
            else{

              navigate('/register/emailverify',{state:email})
              setIsloading(false)
            }
          } catch (err) {
            setError(err)
          }
        } 
    };

    return (
      <>
        <div className='text-center w-full'>
            <form onSubmit={handleSubmitClick}>
                <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>What is your email?</h1>
                <div>
                  {error?<input type='text' name='email' value={email} onChange={handleChange} className='shake bg-red-200 rounded-xl w-[500px] lg:w-[600px] xl:w-[700px] text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-min-full  mt-12 font-semibold h-16' placeholder='Email'></input>
                  :<input type='text' name='email' value={email} onChange={handleChange} className='rounded-xl w-[500px] lg:w-[600px] xl:w-[700px] text-lg appearance-nonen border-gray-200 focus:outline-none focus:border-green-500  focus:border-2 w-max-full mt-12 bg-slate-200 font-semibold h-16' placeholder='Email'></input>}
                </div>
                {error && <div className='font-medium text-red-600'>{error}</div>}
                <br></br>
                {email?(!error&&isloading?<img className='mt-16 mr-auto ml-auto w-14 h-14' src={loading}></img>:<button type='submit' className='mt-16 bg-green-400 text-white font-bold rounded-full h-12 w-28 hover:bg-green-500'>Continue</button>):null}
            </form>
        </div>
      </>
    )
}

export default Email
