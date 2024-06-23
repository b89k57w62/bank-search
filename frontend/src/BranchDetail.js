import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function BranchDetail() {
    const { bankCode, branchCode, branchName } = useParams()
    const [branchDetail, setBranchDetail] = useState(null)
    
    useEffect(() => {
        const storedBranchDetail = localStorage.getItem("branchDetail")
        if(storedBranchDetail){
            setBranchDetail(JSON.parse(storedBranchDetail))
        }else{
            const fetchBranchDetail = async () => {
                const response = await axios.get(`http://127.0.0.1:8000/api/${bankCode}/${branchCode}/${branchName}/`)
                setBranchDetail(response.data)
                localStorage.setItem("branchDetail", JSON.stringify(response.data))
            }
            fetchBranchDetail()
        }
    }, [bankCode, branchCode, branchName])
    
    if (!branchDetail) {
        return <div>Loading...</div>
    }

    return (
        <div>
          <h1>{branchDetail.name}</h1>
          <p>Code: {branchDetail.code}</p>
          <p>Address: {branchDetail.address}</p>
          <p>Phone: {branchDetail.phone}</p>
        </div>
    )
}