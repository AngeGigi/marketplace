import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AddItem =()=>{
    
    const [items, setItems]= useState({
        crochet_name:"",
        crochet_deets:"",
        image:"",
        price: null,
    });

    const handleFileChange=(e)=>{
        setItems((prev)=>({...prev, image: e.target.files[0]}))
    };
    const handleChange=(e)=>{
            setItems((prev)=>({...prev, [e.target.name]: e.target.value}))
        };
    const handleClick= async e =>{
        e.preventDefault()
        console.log(items)
        
        const formdata = new FormData();

        formdata.append('crochet_name', items.crochet_name)
        formdata.append('crochet_deets', items.crochet_deets)
        formdata.append('image', items.image)
        formdata.append('price', items.price)

        try{
        await axios.post("http://localhost:8000/addcrochet",formdata)
        const res = await axios.get("http://localhost:8000/crochet")
        const u = res.data
        setItems(u)
        alert("Updated Successfully")
    }catch(err){
        console.log(err)
    }
}

    console.log(items)
    return(
    
        <div className='add-content'>
            <div className='form'>
                <h1>Add new Items</h1>
                <input type='text' placeholder='name' onChange={handleChange} name="crochet_name" /> 
                <input  type='text' placeholder='description' onChange={handleChange} name="crochet_deets"/> 
                <input type='file' placeholder='image'  onChange={handleFileChange} name="image"/>
                <input type = 'number' placeholder='price' onChange={handleChange} name="price"/>  

                <button onClick={handleClick} >
                <Link to = '/dash'>Add item</Link>
                </button>
            </div>
        
        </div>
        
    )

}
export default AddItem
