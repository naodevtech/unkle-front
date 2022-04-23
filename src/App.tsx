import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Layout from "./layout/layout";
import Dashboard from "./pages/Dashboard/dasboard";
import Login from "./pages/Login/login";
import ContractDetails from "./pages/ContractDetails/contractDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/contract/:id" element={<ContractDetails />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
