import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { Helmet } from 'react-helmet'
import Home from './Home'
import BranchDetail from './BranchDetail'

export default function App(){
  return (
    <Router>
      
      <Helmet>
        <meta name="description" content="台灣銀行代碼查詢（3碼 / 7碼）" />
        <meta name="keywords" content="銀行代碼查詢,銀行代碼表,銀行,代碼,查詢,銀行代碼一覽表,3碼,7碼" />
        <title>台灣銀行代碼查詢</title>
      </Helmet>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="api/:bankCode/:branchCode/:branchName" element={<BranchDetail />} />
      </Routes>
    
    </Router>
  )
}

