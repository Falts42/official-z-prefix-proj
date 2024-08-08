import './App.css';
import { Routes, Route } from "react-router-dom";
import AuthProvider from "./AuthUser";
import NotFound from "./NotFound";
import GuestView from './GuestView';
import LoginPage from './LoginPage';
import ManagerView from './ManagerView';
import { useEffect, useState } from 'react';


function App() {

  return (
    <>
    <AuthProvider>
      <Routes>
        <Route path="*" element={<NotFound />}/>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/guestView" element={<GuestView />}/>
        <Route path="/managerView" element={<ManagerView />}/>
      </Routes>
      </AuthProvider>
      </>
      );
}

export default App;



      // function GetCode() {
      //   const [data, setData] = useState([]);

      //   useEffect(() => {

      //     const fetchData = async () => {
      //       let result
      //       try {
      //         // const res = await fetch("http://172.17.0.2/")
      //         const res = await fetch("http://localhost:8080/inventory")
      //         result = await res.json()
      //         //setStudents(res)
      //       } catch (error) {
      //         console.log(error)

      //       }

      //       return result
      //     }

      //     fetchData().then((result) => {
      //       setData(result);

      //     })

      //   }, [])

      //   let renderElement

      //   renderElement = data.map((e) => {
      //     let key = e.id
      //     let name = e.item_name
      //     return <>{name}, {key}<br /> </>
      //   })
      //   return <>{renderElement}</>
      // }

      // <div className="App">
      //   <header className="App-header">
      //     Welcome to Kruger!
      //   </header>
      // </div>
      // <AuthProvider>
      // <Routes>
      //   <Route path="*" element={<NotFound />}/>
      //   <Route path="/" element={<LoginPage />}/>
      //   <Route path="/" element={<GuestView />} />
      //   <Route path="/inventory/" element={<GuestView />}/>
      // </Routes>
      // </AuthProvider>