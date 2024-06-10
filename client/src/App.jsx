import React from "react";
import BountyForm from "./components/BountyForm.jsx";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import BountyList from "./components/BountyList.jsx";
import BountyListDetail from "./components/BountyListDetail.jsx";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<BountyForm />} />
        <Route path="/bounties" element={<BountyList />} />
        <Route path="/bounties/:detailId" element={<BountyListDetail />} />
      </Routes>
    </div>
  )
}

export default App
