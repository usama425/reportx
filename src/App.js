import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Auth/index";
import Header from "./Components/Body/Header";
import Table from "./Components/DataSets/Table";

function App() {
  const [login, setLogin] = useState(true);
  const SetLocalLogin = async () => {
    try {
      let userLogin = await localStorage.getItem("Count_me-in");
      let parsed = JSON.parse(userLogin);
      if (parsed !== null) {
        setLogin(parsed);
      }
    } catch {
      return null;
    }
  };

  useEffect(() => {
    SetLocalLogin();
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent default behavior (context menu)
  };

  return (
    <div onContextMenu={handleContextMenu}>
      {/* <div>
        {login === false ? (
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </Router>
        ) : (
          <div>
            <Main />
          </div>
        )}
      </div> */}

      <Header />
      <Table />
    </div>
  );
}

export default App;
