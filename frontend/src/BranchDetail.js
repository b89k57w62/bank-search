import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select'


export default function BranchDetail() {
    const navigate = useNavigate()
    const { bankCode, branchCode, branchName } = useParams()
    const [branchDetail, setBranchDetail] = useState(null)
    const [allBanks, setAllBanks] = useState([])
    const [allBranches, setAllBranches] = useState([])
    const [branches, setBranches] = useState([])
    const [selectedBank, setSelectedBank] = useState(null)
    const [selectedBranch, setSelectedBranch] = useState(null)

    useEffect(() => {
            const fetchBranchDetail = async () => {
                const response = await axios.get(`http://127.0.0.1:8000/api/${ bankCode }/${ branchCode }/${ branchName }/`)
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
            const response = await axios.get(`http://127.0.0.1:8000/api/${ bankCode }/${ branchCode }/${ branchName }/`)
            setBranchDetail(response.data.branch)
            navigate(`/api/${selectedBank.value}/${selectedOption.value}/${selectedOption.label}`)
        }
        fetchBranchDetail()
    }

    if (!branchDetail)  return

    return (
        
        <div>
                <h1>銀行和分行查詢</h1>
                <div>
                    <label>選擇銀行</label>
                    <Select
                        options={allBanks.map(bank => ({ value: bank.code, label: `${bank.code} ${bank.name}` }))}
                        value={selectedBank}
                        onChange={handleBankChange}
                        placeholder="選擇銀行..."
                    />
                </div>
                <div>
                    <label>選擇分行</label>
                    <Select
                        options={branches.map(branch => ({ value: branch.code, label: branch.name }))}
                        value={selectedBranch}
                        onChange={handleBranchChange}
                        placeholder="選擇分行..."
                        isDisabled={!selectedBank}
                    />
                </div>

                {branchDetail && (
                <div>
                    <h2>{branchDetail.name}</h2>
                    <p>分行代碼: {branchDetail.code}</p>
                    <p>地址: {branchDetail.address}</p>
                    <p>電話: {branchDetail.phone}</p>
                </div>
                )}
        </div>
        

        
    )
}