import React, { useContext } from 'react'
import DashBSComp from './DashBSComp'
import { ProfileContext } from '../context/ProfileContextProvider'
import './PannelloControllo.css'

function PannelloControllo () {
    const { userInfo } = useContext(ProfileContext)

    if (!userInfo?.data) return <div>Loading...</div>

    return (
        <DashBSComp user={userInfo.data} />
    )
}

export default PannelloControllo
