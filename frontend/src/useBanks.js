import { useState, useEffect } from 'react'
import axios from 'axios'


export default function useBanks(){
    const [banks, setBanks] = useState([])

    useEffect(() => {
        const fetchBanks = async () => {
            const response = await axios.get("api/")
            setBanks(response.data.map(bank => ({
                value: bank.code, label: `${bank.code} ${bank.name}`
            })))
        }
        fetchBanks()
    }, [])
    return banks
}