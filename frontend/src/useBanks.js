import { useState, useEffect } from 'react'
import axios from 'axios'


export default function useBanks(){
    const [banks, setBanks] = useState([])

    useEffect(() => {
        const fetchBanks = async () => {
            const response = await axios.get("process.env.BASE_URL")
            setBanks(response.data.map(bank => ({
                value: bank.code, label: `${bank.code} ${bank.name}`
            })))
        }
        fetchBanks()
    }, [])
    return banks
}