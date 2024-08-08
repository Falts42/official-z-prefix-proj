import React, { useState } from 'react';
import {
  Button,
  Input,
  Container,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom'

export default function CreateItem() {

  const [data, setData] = useState({
    user_id: '',
    item_name: '',
    description: '',
    quantity: ''
  });

  let navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="user_id">User ID:</label>
        <Input
          type="number"
          id="user_id"
          name="user_id"
          value={data.user_id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="item_name">Item Name:</label>
        <Input
          type="text"
          id="item_name"
          name="item_name"
          value={data.item_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <Input
          type="text"
          id="description"
          name="description"
          value={data.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <Input
          type="number"
          id="quantity"
          name="quantity"
          value={data.password}
          onChange={handleChange}
          required
        />
      </div>
      <Container>
      <Button type="submit">Submit</Button>
      <Button  onClick={() => navigate('/managerView')} type="submit">Go Back to your Inventory</Button>
      </Container>
    </form>
  );
}