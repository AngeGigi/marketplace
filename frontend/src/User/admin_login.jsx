import axios from 'axios';
import React, { useEffect, useState } from 'react'


const Adminlog = ({ onLogin}) => {
  const [inputAds, setInputAds] = useState({
    username: "",
    password:""
  })

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchAdminlog = async () =>{
      try {
        const res = await axios.get("http://localhost:8000/adminuser")
        setUsers(res.data);
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchAdminlog();
  },[])

  const handleChange = (e) => {
    setInputAds((prev) => ({...prev, [e.target.name]: e.target.value}))
  }
    
  const handleLogin = (e) =>{
    e.preventDefault();

    const m = users.find(
      (user) =>
      user.uname === inputAds.username && user.pword === inputAds.password
    )
    if(m) {
      setTimeout(()=>{
        window.location.href = '/home'
      }, 1000)
    }else{
      alert("Incorrect username or password!")
    }
  }



  return (
    <div className='adminloginpage'>
      <div className="adminlogincontainer">
      </div>
      
      <input type="text" placeholder='Username' name='username' value={inputAds.username} onChange={handleChange} />
      <input type="password" placeholder='Password' name='password' value={inputAds.password} onChange={handleChange} />
    
    <button typeof='submit' onClick={handleLogin}>Login</button>
    </div>
  )
 
}

export default Adminlog