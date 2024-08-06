import './App.css';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          Welcome to Kruger!
        </header>
      </div>
      <Routes>
        <Route path="*" />
        <Route path="/" />
        <Route path="/inventory/" />
      </Routes>
    </>
  );
}

export default App;
