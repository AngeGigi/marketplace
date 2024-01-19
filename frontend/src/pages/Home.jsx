import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import { useNavigate } from "react-router-dom";
import top from "../images/prod-img/Sand Top.jpg";
import flower from "../images/prod-img/Handmade Tulip Flowers Bouquet,.jpg";
import bloom from "../images/prod-img/crochet bolossoms.jpg";
import keychain from "../images/prod-img/Crochet Daisy Keychain.jpg";
import jacket from "../images/prod-img/crochet pattern for girls jacket.jpg";
import clip from "../images/clip.jpg";
import hat from "../images/hat.jpg";
import bag from "../images/prod-img/Crochet Minimalist Hobo Bag.jpg";


const Home = () => {
  const navigate= useNavigate();


  const cartNavigate =() =>{
    navigate('/shop')
  };
 
  return(
    <div>
       <div>
      <section id="header">
        <h1><i>Looptique</i></h1>
        <div>
          <ul id="navbar">
            <li><a className="active" href="Home.jsx">Home</a></li>
            <li><a onClick={cartNavigate}>Shop</a></li>
          </ul>
          <ul id="icon-cart">
            <li><a href="cart.html"style={{color: "black"}}><FontAwesomeIcon icon={faCartShopping} /></a></li>
            <li><a href="user.html"style={{color: "black"}}><FontAwesomeIcon icon={faUser} /></a></li>
          </ul>   
        </div>

      </section>

      <section id="hero">
          <h4><i>Handcraft</i></h4>
          <h2> DIY embroidery crochet</h2>
          <h1>On all Products</h1>
          <p><i>Dive into the art of embroidery, and explore a collection that weaves together style,
              <br/> warmth, and the joy of crafting.</i></p>
        
      
      </section>

      <section>
      <section id="product1" class="section-p1">
        <h2>Feature Collection</h2>
        <p>Summer Collection New Modern Design</p>
        <div class="pro-container">
          <div class="pro" onclick="window.location.href='https://codepen.io/Motun/full/OJBwbrQ'">
            <img src={top} alt=""/>
            <div class="des">
              <h5>Carton Astronault Tshirts</h5>
            </div>
          </div>
    
          <div class="pro">
            <img src={flower} alt=""/>
            <div class="des">
              
              <h5>Carton Leave Tshirts</h5>
              
            </div>
    
          </div>
    
          <div class="pro">
            <img src={bag} alt=""/>
            <div class="des">
             
              <h5>Rose Multicolor Tshirts</h5>
            
            </div>
            
          </div>
    
          <div class="pro">
            <img src={keychain} alt=""/>
            <div class="des">
             
              <h5>Pink Flower Tshirts</h5>
              
            </div>
           
          </div>
    
          <div class="pro">
            <img src={bloom} alt=""/>
            <div class="des">
              
              <h5>Purple Flowering Tshirts</h5>
             
            </div>
          </div>
    
          <div class="pro">
            <img src={jacket} alt=""/>
            <div class="des">
              
              <h5>Short Knicker </h5>
             
            </div>
            
          </div>
    
          <div class="pro">
            <img src={clip} alt=""/>
            <div class="des">
             
              <h5>2 in 1 Double Routed</h5>
              
            </div>
            
          </div>
    
          <div class="pro">
            <img src={hat} alt=""/>
            <div class="des">
             
              <h5>Ash Short</h5>
          
            </div>
          
          </div>
    
        </div>
    </section>
      </section>

      <section id="banner3" className="section-p1">
          <div className="banner-box">
      
            <h2>MONTHLY SALES</h2>
            <h3>January Collection -50% OFF</h3>
      
          </div>
      
          <div className="banner-box banner-img2">
      
            <h2>MONTHLY SALES</h2>
            <h3>January Collection -50% OFF</h3>
      
          </div>
      
          <div className="banner-box banner-img3">
      
            <h2>MONTHLY SALES</h2>
            <h3>January Collection -50% OFF</h3>
      
          </div>
      
      </section>

      <section id="newsletter" className="section-p1">
          <div className="newstext">
            <h4>Sign up for updates</h4>
            <p>Get Email updates about your purchased and <span> our latest product.</span> </p>
          </div>
          <div className="form">
            <input type="text" placeholder="Your email address"/>
            <button className="btn normal">Sign Up</button>
          </div>
      </section>        
  </div>
    </div>
  )
}


export default Home