import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home'
import BranchDetail from './BranchDetail'

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="api/:bankCode/:branchCode/:branchName" element={<BranchDetail />} />
      </Routes>
    </Router>
  )
}

