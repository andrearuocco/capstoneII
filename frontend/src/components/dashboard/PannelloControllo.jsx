import React, { useContext } from 'react'
import DashBSComp from './DashBSComp'
import { ProfileContext } from '../context/ProfileContextProvider'
import './PannelloControllo.css'

function PannelloControllo () {
    const { userInfo } = useContext(ProfileContext)

    if (!userInfo?.data) return <div className='d-flex justify-content-center align-items-center'>Loading..</div>

    return (
        <div className='dashboard-container'><DashBSComp user={userInfo.data} /></div>
    )
}

export default PannelloControllo
