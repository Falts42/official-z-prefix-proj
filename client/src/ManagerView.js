import { useEffect, useState } from "react";
import { Box, Heading, Text, Link } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import './GuestView.css';

function ManagerView() {
  const [data, setData] = useState([]);

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
    <div className="item-grid">
      <header className="header">
        Welcome Manager!
      </header>
      <div>
        {data.map((e) => (
          <div key={e.id} className="item">
            {e.item_name}
          </div>

        ))}
      </div>
    </div>
  );
}

export default ManagerView;