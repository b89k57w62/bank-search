import { useNavigate } from 'react-router-dom'

export const copyBranchCode = (branchCode) => {
    navigator.clipboard.writeText(branchCode).then(() =>{
        alert("分行代碼已複製")
    })
}

export const copyUrl = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
        alert("已複製連結")
    })
}