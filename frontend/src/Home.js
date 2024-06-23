import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
    const [banks, setBanks] = useState([])
    const [branches, setBranches] = useState([])
    const [selectedBank, setSelectedBank] = useState("")
    const [selectedBranch, setSelectedBranch] = useState("")
    const [isBranchDisabled, setIsBranchDisabled] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
      axios.get("api/").then(response => {
        setBanks(response.data)
      })
    }, [])
    
    useEffect(() => {
      if(selectedBank){
        axios.get(`api/${selectedBank}/branches/`)
        .then(response => {
          setBranches(response.data)
          setIsBranchDisabled(false)
        })
      }
    }, [selectedBank])
  
  
    const handleBankChange = (event) => {
      setSelectedBank(event.target.value)
      setSelectedBranch("")
      setIsBranchDisabled(true)
    }
  
    const handleBranchChange = (event) => {
      const branchCode = event.target.value
      setSelectedBranch(branchCode)
    }
  
    const selectedBankDetails = banks.find(bank => bank.code == selectedBank)
    const selectedBranchDetails = branches.find(branch => branch.code == selectedBranch)
    
    if (selectedBankDetails && selectedBranchDetails) {
      const branchName = selectedBranchDetails.name
      const path = `api/${selectedBankDetails.code}/${selectedBranchDetails.code}/${branchName}/`
      navigate(path)
    }
  
    return (
      <div>
        <h1>台灣銀行代碼查詢</h1>
        <div>
            <label>銀行名稱：</label>
            <select onChange={ handleBankChange } value={ selectedBank }>
                <option value="">請輸入關鍵字或選擇銀行代碼...</option>
                {banks.map(bank => (
                    <option key={bank.code} value={bank.code}>
                        {bank.code} {bank.name}
                    </option>
                ))}
            </select>
        </div>
        <div>
            <label>分行名稱：</label>
            <select onChange={ handleBranchChange } value={ selectedBranch } disabled={ isBranchDisabled }>
                <option value="">請選擇分行名稱...</option>
                {branches.map(branch => (
                    <option key={branch.code} value={branch.code}>
                        {branch.name}
                    </option>
                ))}
            </select>
        </div>
      </div>
    )
  }