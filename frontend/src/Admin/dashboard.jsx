import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Dash = () => {
  const [crochet, setCrochet] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [inputs, setInputs] = useState({
    crochet_name: '',
    crochet_deets: '',
    image: '',
    price: null,
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const d =location.pathname.split("/")[2]


  const cartNavigate =() =>{
    navigate('/shop')
  };
  

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await axios.get('http://localhost:8000/crochet');
        setCrochet(res.data);
      } catch (err) {
        console.log('Error fetching crochet items', err);
      }
    };
    fetchAllItems();
  }, []);

  const openUpdateModal = (item) => {
    setSelectedItem(item);
    setInputs({
      crochet_name: item.crochet_name,
      crochet_deets: item.crochet_deets,
      image: item.image,
      price: item.price,
    });
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedItem(null);
    setInputs({
      crochet_name: '',
      crochet_deets: '',
      image: '',
      price: null,
    });
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  

  const handleUpdate = async () => {
    try {
      const updateItem = {
        crochet_name: inputs.crochet_name,
        crochet_deets: inputs.crochet_deets,
        image: inputs.image,
        price: inputs.price,
      };

      if (inputs.image instanceof File) {
        const formData = new FormData();
        formData.append('crochet_name', inputs.crochet_name);
        formData.append('crochet_deets', inputs.crochet_deets);
        formData.append('price', inputs.price);
        formData.append('image',  inputs.image);

        await axios.put(`http://localhost:8000/crochet/${selectedItem.idcrochet}`, formData);
      } else {
        await axios.put(`http://localhost:8000/crochet/${selectedItem.idcrochet}`, updateItem);
      }

      // Refresh the crochet items after update
      const updatedItems = await axios.put('http://localhost:8000/crochet'+ d, crochet);
      setCrochet(updatedItems.data);
      navigate("/dash");

      // Close the update modal
      closeUpdateModal();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/crochet/${id}`);

      // Update the crochet state by filtering out the deleted item
      const updatedCrochet = crochet.filter((item) => item.idcrochet !== id);
      setCrochet(updatedCrochet);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (

  <div>
      <section id="header">
        <h1><i>Dashboard</i></h1>
        <div>
          <ul id="navbar">
            <li><a className="active" href="Home.jsx">Home</a></li>
            <li><a onClick={cartNavigate}>Shop</a></li>
          </ul>
          <ul id="icon-cart">
            <li><a href="cart.html" style={{color: "black"}}><FontAwesomeIcon icon={faCartShopping} /></a></li>
            <li><a style={{color: "black"}}><FontAwesomeIcon icon={faUser} /></a></li>
           
          </ul>   
        </div>

      </section>
      <div className="marketplacemainpage">
      <div className="marketplacecontainer">
        <h1 className="h1-marketplace">Marketplace</h1>
        <div className="section-marketplace">
          <table className="table-crochet">
            <thead>
              <tr>                   
                <th>Crochet Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {crochet.map((item) => (
                <tr key={item.idcrochet}>
                  <td>{item.idcrochet}</td>
                  <td>{item.crochet_name}</td>
                  <td>{item.crochet_deets}</td>
                  <td>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.image}
                        style={{ width: '50px', height: '50px' }}
                      />
                    )}
                  </td>
                  <td>{item.price}</td>
                  <td className="actionbtntd">
                    <button className="update" onClick={() => openUpdateModal(item)}>
                      Update
                    </button>
                    <button className="delete" onClick={() => handleDelete(item.idcrochet)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Update */}
        {isUpdateModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="close-button" onClick={closeUpdateModal}>
                &times;
              </span>
              <form onSubmit={(e) => e.preventDefault()}>
                <h2>Update Item</h2>
                <input
                  className="addinputfield"
                  type="text"
                  placeholder="crochet name"
                  value={inputs.crochet_name}
                  onChange={(e) => handleChange(e)}
                  name="crochet_name"
                />
                <input
                  className="addinputfield"
                  type="text"
                  placeholder="crochet description"
                  value={inputs.crochet_deets}
                  onChange={(e) => handleChange(e)}
                  name="price"
                />
                  <input
                  className="addinputfield"
                  type="text"
                  placeholder="crochet photo"
                  value={inputs.image}
                  onChange={(e) => handleChange(e)}
                  name="image"
                />

                  <input
                  className="addinputfield"
                  type="text"
                  placeholder="crochet price"
                  value={inputs.price}
                  onChange={(e) => handleChange(e)}
                  name="price"
                />
              
                <button className="subbtn" onClick={handleUpdate} type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        <button className="addnewprod">
          <Link to="/add" className="addtext" > Add new product</Link>
        </button>
      </div>
    </div>

  </div>
    
  );
};

export default Dash;
