import React, { useState } from 'react';
import { Button, Input, Container, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: ''
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Performs a POST to the API with the newly created item submitted by the manager
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/userData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('There was a problem with the network');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Simple form that takes in the user's first name, last name, username, and password"
  return (
    <form onSubmit={handleSubmit}>
      <Heading className="header">
        Fill out the fields below to create your Account!
      </Heading>
      <div>
        <label htmlFor="first_name">First Name:</label>
        <Input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="last_name">Last Name:</label>
        <Input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <Input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {/* Contains a button that submits the data to the api as well as takes the user back to the login page */}
      <Container>
        <Button type="submit">Submit</Button>
        <Button onClick={() => navigate('/')} type="submit">Go Home</Button>
      </Container>
    </form>
  );
}