import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


const Shop = () => {


  const navigate= useNavigate();


  const cartNavigate =() =>{
    navigate('/shop')
  }
  const homeNavigate =() =>{
    navigate('/home')
  }

  const [prods, setprods] = useState([]);
  
  
  useEffect(() => {
    const fetchAllCrochets = async() => {
    try {
      const res = await axios.get("http://localhost:8000/crochet");
      setprods(res.data)
    } catch (error) {
      console.error(error)
    }
  };

  fetchAllCrochets();
}, []);


  return (

    <div>
           <section id="header">
        <h1><i>Looptique</i></h1>

        <div>
          <ul id="navbar">
            <li><a onClick={homeNavigate}>Home</a></li>
            <li><a className='active' onClick={cartNavigate}>Shop</a></li>
          </ul>
          <ul id="icon-cart">
            <li><a href="cart.html" style={{color: "black"}}><FontAwesomeIcon icon={faCartShopping}/></a></li>
            <li><a href="user.html" style={{color: "black"}}><FontAwesomeIcon icon={faUser} /></a></li>
          </ul>   
        </div>

      </section>

      <div className="shopmainpage">
      <div className="products">
        {prods.map((prod) => (
          <div className="product">
            <h1>{prod.crochet_name}</h1>
            <p>{prod.crochet_deets}</p>
            <div>{prod.image}</div>
            <p className='price'>{prod.price}</p>
          </div>
    ))}
  </div>
</div>

    </div>

    
    

  )
}

export default Shop