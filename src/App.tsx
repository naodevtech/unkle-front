import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/layout";
import Dashboard from "./components/pages/Dashboard/dasboard";
import Login from "./components/pages/Login/login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
