import { useEffect, useState } from "react";
import { Heading, Link } from "@chakra-ui/react";
import { Button } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import './GuestView.css';

function GuestView() {
  const [data, setData] = useState([]);

  let navigate = useNavigate();

  // Fetches all of the data from the inventory API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/inventory");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Navigates the user back home */}
      <Button onClick={() => navigate('/')} justifyContent="right">Back to Home Page</Button>
      <Heading className="header">
        Welcome to Kruger! The BETTER supermarket!
      </Heading>
      <div>
        {data.map((item) => (
          <ul >
            <li key={item.id} className="item">
              {/* Displays all of the items from the API and the ones input by the manager */}
              <Link href={`/guestView/${item.item_name}`} color="teal.500">
                {item.item_name}
              </Link>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default GuestView;