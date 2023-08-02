import React, { createRef, useState, useContext } from "react";
import {  useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Avatars from '../../assets/images/avatars.png'
import { BASE_URL } from "../../utils/config";
import { useEffect } from "react";

const Avatar = () => {
  const [image, _setImage] = useState(null);
  const inputFileRef = createRef(null);
  const [newImage,setNewImage]=useState(null)
  const navigate = useNavigate();
  const {user,accessToken,dispatch}=useContext(AuthContext)

  const handleOnChange = async(event) => {

    const file = event.target.files[0];
    
    const reader = new FileReader();

    reader.onload = () => {
      _setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    setNewImage(file)
  };

  const handleClick = async(e) =>  {
    e.preventDefault()
    const formData = new FormData();
    formData.append('avatar', newImage);
    await fetch(`${BASE_URL}/profile/upload-avatar?id=${user}`, {
      method: 'POST',
      body: formData,
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    }).then((res)=>res.json()).then((result)=>{
      console.log(result.message)
    })
    dispatch({type:"REGISTER_SUCCESS"})
    setTimeout(()=>{
      dispatch({type:"LOGIN_SUCCESS",payload:user,token:accessToken})
      navigate('/profile/menu',{state:image});
    },10)
    //dispatch({type:"LOGIN_SUCCESS",payload:user,token:accessToken})
    //dispatch({type:"LOGOUT"})
    
  }


  return (
    
    <div className="text-center">
      <h1 className='text-center mt-24 font-bold text-4xl text-slate-700'>Don't wear sunglasses, look straight ahead and make sure you're alone.</h1>
      <input
        ref={inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type="file"
        onChange={handleOnChange}
      />
      <label htmlFor="avatar-image-upload">
          {image?(<img src={image}  className="w-44 mt-8 ml-auto mr-auto rounded-full hover:cursor-pointer" alt="Avatar"/>):(<img src={Avatars}  className="w-44 mt-8 ml-auto mr-auto rounded-full hover:cursor-pointer" alt="Avatar"/>)}
      </label>
      <br></br>
      {image&&<button type="submit" onClick={handleClick} className='mt-16 bg-green-400 text-white font-bold rounded-full h-10 w-28 hover:bg-green-500'>Save</button>}
    </div>
  );
};

export default Avatar;