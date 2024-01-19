import axios from 'axios';
import React, { useState } from 'react';

const AddItem =()=>{

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
    console.log(items)
    try{

        const formdata = new FormData();

        formdata.append('crochet_name', items.crochet_name)
        formdata.append('crochet_deets', items.crochet_deets)
        formdata.append('image', items.image)
        formdata.append('price', items.price)

        
        await axios.post("http://localhost:8000/add/crochet",formdata)

    }catch(err){
        console.log(err)
    }
}

    console.log(items)
    return(
        <div className='form'>
        <h1>Add new Items</h1>
        <input type='text' placeholder='name' onChange={handleChange} name="crochet_name" /> 
        <input type='text' placeholder='description' onChange={handleChange} name="crochet_deests"/> 
        <input type='file' placeholder='image' onChange={handleChange} name="image"/>
        <input type='number' placeholder='price' onChange={handleFileChange} name="price"/>   

        <button onClick={handleClick}>Add</button>
        </div>
        
    )

}
export default AddItem
