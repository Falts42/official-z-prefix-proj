import { useEffect, useState } from "react";
import { Button, Container, Heading, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import './GuestView.css';

function ManagerView() {
  const [data, setData] = useState([]);

  let navigate = useNavigate();

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

  const handleDelete = async (item_name) => {
    try {
      await fetch(`http://localhost:8080/inventory/${item_name}`, {
        method: 'DELETE',
      });
      // Remove the item from the UI
      setData(data.filter(item => item.item_name !== item_name));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
       <Button onClick={() => navigate('/')} justifyContent="right">Logout</Button>
      <Heading className="header">
        Welcome Manager!
      </Heading>
      <div>
        <Container display="flex" justifyContent="center">
        <Button onClick={() => navigate('/createItem')}>Create New Item</Button>
        </Container>
        {data.map((item) => (
          <ul >
            <li key={item.id} className="item">
              <Link href={`/managerView/${item.item_name}`} color="teal.500">
                {item.item_name}
              </Link>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(item.item_name)}
                ml={4}
              >
                Delete
              </Button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default ManagerView;