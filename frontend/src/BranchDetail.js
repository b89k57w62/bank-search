import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select'
import { copyUrl, copyBranchCode } from './tools'

export default function BranchDetail() {
    const navigate = useNavigate()
    const { bankCode, branchCode, branchName } = useParams()
    const [branchDetail, setBranchDetail] = useState(null)
    const [allBanks, setAllBanks] = useState([])
    const [allBranches, setAllBranches] = useState([])
    const [branches, setBranches] = useState([])
    const [selectedBank, setSelectedBank] = useState(null)
    const [selectedBranch, setSelectedBranch] = useState(null)
    const API = `http://127.0.0.1:8000/api/${ bankCode }/${ branchCode }/${ branchName }/`
    
    useEffect(() => {
            const fetchBranchDetail = async () => {
                const response = await axios.get(API)
                setBranchDetail(response.data.branch)
                setAllBranches(response.data.branches || [])
                setAllBanks(response.data.banks || [])
            }
            fetchBranchDetail()
        
    }, [bankCode, branchCode, branchName])

    useEffect(() => {
        
        if(selectedBank){
            const bankBranches = allBranches.filter(branch => branch.bank.code === selectedBank.value)
            setBranches(bankBranches)
        }else{
            setBranches([])
        }
    }, [selectedBank, allBranches])

    const handleBankChange = (selectedOption) => {
        setSelectedBank(selectedOption)
        setSelectedBranch(null)
    }

    const handleBranchChange = (selectedOption) => {
        setSelectedBranch(selectedOption)
        const fetchBranchDetail = async () => {
            const response = await axios.get(API)
            setBranchDetail(response.data.branch)
            navigate(`http://127.0.0.1:8000/api/${selectedBank.value}/${selectedOption.value}/${selectedOption.label}`)
        }
        fetchBranchDetail()
    }

    if (!branchDetail)  return

    return (
        
        <div>
            <span>
                powered by
                <a href="https://github.com/b89k57w62"> Hao Sheng Wu</a>
            </span>
            <h1>台灣銀行代碼查詢</h1>
            <div>
                <label>選擇銀行</label>
                <Select
                    options={allBanks.map(bank => ({ value: bank.code, label: `${bank.code} ${bank.name}` }))}
                    value={selectedBank}
                    onChange={handleBankChange}
                    placeholder="請輸入關鍵字或選擇銀行..."
                />
            </div>
            <div>
                <label>選擇分行</label>
                <Select
                    options={branches.map(branch => ({ value: branch.code, label: branch.name }))}
                    value={selectedBranch}
                    onChange={handleBranchChange}
                    placeholder="請輸入關鍵字或選擇分行名稱..."
                    isDisabled={!selectedBank}
                />
            </div>
            <small>可使用下拉選單或直接輸入關鍵字查詢</small>
            <div>
                <h2>{branchDetail.name}</h2>
                <p>分行代碼: {branchDetail.code}</p>
                <p>地址: {branchDetail.address}</p>
                <p>電話: {branchDetail.phone}</p>
            </div>
            <div>
                <button onClick={() => copyBranchCode(branchDetail.code)}>複製分行代碼</button>
                <button onClick={() => navigate("/")}>重新查詢</button>
                <button onClick={ copyUrl }>複製此頁面連結</button>
                <button onClick={() => window.location.href="https://data.gov.tw/dataset/6041"}>資料來源：政府資料開放平台</button>
            </div>
        </div>        
    )
}