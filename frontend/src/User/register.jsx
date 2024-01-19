import React from 'react'
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate= useNavigate();

    const logNavigate =() =>{
      navigate('/login')
    };
  return (
    <div className="reg-container">
        <form class="reg-form">
            <p class="reg-title">Sign Up </p>
            <p class="reg-message">Signup now and get full access to our shop. </p>
            <div class="reg-flex">
                <label>
                    <input required="" placeholder="Firstname" type="text" class="reg-input"/>
                    </label>
                    <label>
                        <input required="" placeholder="Lastname" type="text" class="reg-input"/>
                        </label>
            </div>
            <label>
                <input required="" placeholder="Email" type="email" class="reg-input"/>
        
                </label> 
                <label>
                    <input required="" placeholder="Password" type="password" class="reg-input"/>
                    
                    </label>
                    <label>
                        <input required="" placeholder="Confirm password" type="password" class="reg-input"/>
                        
                        </label>
                        
                        <button className="submit">
                        <Link to="/Home" className="text" > Add new product</Link>
                        </button>
                <p class="signin">Already have an acount ? <a onClick={logNavigate}>Signin</a> </p>
        </form>
    </div>
  )
 
}

export default Register