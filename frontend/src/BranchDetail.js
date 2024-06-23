import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Home from './Home'

export default function BranchDetail() {
    const { bankCode, branchCode, branchName } = useParams()
    const [branchDetail, setBranchDetail] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const storedBranchDetail = localStorage.getItem("branchDetail")
        if(storedBranchDetail){
            setBranchDetail(JSON.parse(storedBranchDetail))
        }else{
            const fetchBranchDetail = async () => {
                const response = await axios.get(`http://127.0.0.1:8000/api/${ bankCode }/${ branchCode }/${ branchName }/`)
                setBranchDetail(response.data)
                localStorage.setItem("branchDetail", JSON.stringify(response.data))
            }
            fetchBranchDetail()
        }
    }, [bankCode, branchCode, branchName])
    
    const handleBranchSelect = (bankCode, branchCode, branchName) => {
        setBranchDetail(null)
        navigate(`http://127.0.0.1:8000/api/${bankCode}/${branchCode}/${branchName}/`)
    }

    if (!branchDetail) {
        return <div>Loading...</div>
    }

    return (
        
        <div>
            <Home onHome={ handleBranchSelect } />
            <div>
                <h1>{ bankCode }{ branchDetail.name }</h1>
                <p>分行代碼: { branchDetail.code }</p>
                <p>地址: {branchDetail.address}</p>
                <p>電話: {branchDetail.phone}</p>
            </div>
        </div>
        
    )
}