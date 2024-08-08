import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";

export default function GuestItemDetailsView() {
  const {item_name} = useParams();
  const [item, setItem] = useState([]);

  let navigate = useNavigate();

  //Fetches data from the inventory api using the item name input
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`http://localhost:8080/inventory/${item_name}`);
          const result = await res.json();
          setItem(result);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, [item_name]);

  return (
    // Displays the item's details
      <Container>
      {item ? (
        <Box>
          <Heading>{item.item_name}</Heading>
          <Text>ID: {item.id}</Text>
          <Text>Description: {item.description}</Text>
          <Text>Quantity: {item.quantity}</Text>
          {/* Adds a button to navigate back to the invnetory page*/}
          <Button  onClick={() => navigate('/guestView')} type="submit">Go Back to the Store Page</Button>
        </Box>
      ) : (
        <Text>Loading...</Text>
      )}
    </Container>
  );
}
