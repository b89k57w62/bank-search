import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select'
import useBanks from './useBanks'


export default function Home() {
    const banks = useBanks()
    const [branches, setBranches] = useState([])
    const [selectedBank, setSelectedBank] = useState(null)
    const [selectedBranch, setSelectedBranch] = useState(null)
    const [isBranchDisabled, setIsBranchDisabled] = useState(true)
    const navigate = useNavigate()
    
    useEffect(() => {
      if(selectedBank){
        axios.get(`${process.env.REACT_APP_API_BASE_URL}${selectedBank.value}/branches/`)
        .then(response => {
          setBranches(response.data.map(branch => ({
            value: branch.code, label: branch.name
          })))
          setIsBranchDisabled(false)
        })
      }
    }, [selectedBank])
  
    const handleBankChange = (selectedOption) => {
        setSelectedBank(selectedOption)
        setSelectedBranch(null)
        setIsBranchDisabled(true)
    }
  
    const handleBranchChange = (selectedOption) => {
      setSelectedBranch(selectedOption)
      if(selectedOption){
        const selectedBranchName = branches.find(branch => branch.value === selectedOption.value).label
        const path = `api/${selectedBank.value}/${selectedOption.value}/${selectedBranchName}`
        navigate(path)
      }
    }
  
    return (
      <div>
         <span>
            powered by
            <a href="https://github.com/b89k57w62"> Hao Sheng Wu</a>
        </span>
        <h1>台灣銀行代碼查詢</h1>
        <div>
            <label>銀行名稱：</label>
            <Select 
                options={ banks }
                value={ selectedBank } 
                onChange={ handleBankChange }
                placeholder="請輸入關鍵字或選擇銀行..."
            />
        </div>
        <div>
            <label>分行名稱：</label>
            <Select 
                options={ branches }
                value={ selectedBranch }
                onChange={ handleBranchChange }
                isDisabled={ isBranchDisabled }
                placeholder="請輸入關鍵字或選擇分行名稱..." 
            />
        </div>
        <small>可使用下拉選單或直接輸入關鍵字查詢</small>
      </div>
    )
  }