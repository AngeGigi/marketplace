import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { animated, useSpring } from '@react-spring/web';
import axios from 'axios';

const Login = ({ isOpen, closeModal, handleLogin, handleRegister }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [logs, setLogs] = useState([]);
    useEffect(() => {
      const fetchAllLogs = async () => {
        try {
          const res = await axios.get("http://localhost:8000/crochet")
          setLogs(res.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchAllLogs();
    }, []);
  
    // ... (your other states and functions)
  
    const handleSwitchForm = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup);
    };
  
    // Use react-spring for animation
    const animation = useSpring({
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'scale(1)' : 'scale(0.8)',
    });


  return (
    <Modal isOpen={isOpen} 
            onRequestClose={closeModal}
            contentLabel="Login Modal"
            style ={{overlay: {
              background: 'rgba(0, 0, 0, 0.5)',
            },
              content:{
                border: 'none',
                borderRadius:'2em',
                padding:'0',
                maxWidth:'500px',
                margin:'auto',
                background: '#F8EBE2',
              },
            }}>
            <animated.div style={animation}>

              {isSignup ?(
                <div>
                  <div className="inputfiledcontainer">
                    <div className="usernamecontainer">
                      <div className="iconput"></div>
                          <input type="text" placeholder='Register Username' />
                    </div>
                    <div className="passwordcontainer">
                        <div className="iconinput2"></div>
                          <input type="text" Register phone number />
                    </div>
                  </div>
                </div>
              ):(
                <div className='inputfieldcontainer'>
                  <div className='usernamecontainer'>
                    <div className='iconinput'></div>
                      <input type="text" placeholder='password' />
                  </div>
                </div>
              )}
              <div className='buttonmodal'>
                <button className='switch-btn' onClick={handleSwitchForm}>
                  {isSignup ? 'Switch to login' : 'Switch to Signup'}
                  </button> 
                  <button className='signupbtn' onClick={isSignup ? handleRegister : handleLogin}></button>
                      {isSignup ? 'Sign up' : 'Log in'}
              </div>
            </animated.div>
       
    </Modal>
  );
};

export default Login