import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Layout from "./layout/layout";
import Dashboard from "./pages/Dashboard/dasboard";
import Login from "./pages/Login/login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
