import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddItem =()=>{

    const navigate = useNavigate();

    const [items, setItems]= useState({
        crochet_name:"",
        crochet_deets:"",
        price: null,
        image:"",
    });
   
    const handleFileChange=(e)=>{
        setItems((prev)=>({...prev, image: e.target.files[0]}))
    };

    const handleChange=(e)=>{
            setItems((prev)=>({...prev, [e.target.name]: e.target.value}))
        };

    const handleClick= async e=>{
        e.preventDefault()
        try{

        const formdata = new FormData();

        formdata.append('crochet_name', items.crochet_name)
        formdata.append('crochet_deets', items.crochet_deets)
        formdata.append('image', items.image)
        formdata.append('price', items.price)

        
        await axios.post("http://localhost:8000/add/crochet/",formdata)

    }catch(err){
        console.log(err)
    }
}
    return(
    
        <div className='add-content'>
            <div className='form'>
                <h1>Add new Items</h1>
                <input type='text' placeholder='name' onChange={handleChange} name="crochet_name" /> 
                <input  type='text' placeholder='description' onChange={handleChange} name="crochet_deests"/> 
                <input type='file' placeholder='image' style={{width:'172px'}} onChange={handleFileChange} name="image"/>
                <input type='number' placeholder='price' onChange={handleChange} name="price"/>   

                <button onClick={handleClick} >
                <Link to = '/dash'>Add item</Link>
                </button>
            </div>
        
        </div>
        
    )

}
export default AddItem
