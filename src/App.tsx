import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/layout";
import Login from "./components/pages/Login/login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
