import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { createCompany } from '../../data/fetchCompany_refactored'
import { login } from '../../data/App'
import DynamicAlert from '../login/DynamicAlert'
import RegisterCompanyForm from '../login/RegisterCompanyForm'
import RegisterAdminForm from '../login/RegisterAdminForm'
import UploadCompanyLogo from '../login/UploadCompanyLogo'
import CompanySelection from '../login/CompanySelection'
import { registerProfile } from '../../data/fetchProfile_refactored'
import { companyWho } from '../../data/fetchCompany_refactored'
import { ProfileContext } from '../context/ProfileContextProvider'

function AuthPage() {
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [showRegisterCompany, setShowRegisterCompany] = useState(false)
    const [showRegisterAdmin, setShowRegisterAdmin] = useState(false)
    const [showUploadLogo, setShowUploadLogo] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [alertMessage, setAlertMessage] = useState(null)
    const navigate = useNavigate()
    const { token, setToken, userInfo, setUserInfo } = useContext(ProfileContext)

    const handleLogin = async (e) => {
        e.preventDefault();
       
        const response = await login({ ...formData, company: selectedCompany })
    
        if (response.status === 200 && response.data && response.data.token) {
           
            localStorage.setItem('token', response.data.token) // salviamo il token nel localStorage
            setToken(response.data.token) // aggiorniamo il token nello stato del contesto

            setAlertMessage("✅ Login succesful, laoding dashboard..")
            setTimeout(() => navigate('/dashboard'), 3000)
        } else {
            setAlertMessage("❌ Wrong credentials, try again.")
        }
    }

    const handleCompanySelect = async (companyId) => {
    
        setSelectedCompany(companyId)
        setShowRegisterCompany(false)
    
        const response = await companyWho(companyId)
    
        if (response?.error) {
            setAlertMessage(`⚠️ Select your company to log in.`)
            return;
        }
    
        const company = response.data || response 
    
        if (company?.admins?.length === 0) {
            setShowRegisterAdmin(true)
            setShowLoginForm(false)
        } else {
            setShowRegisterAdmin(false)
            setShowLoginForm(true)
        }

    }

    const handleRegisterCompany = async (companyData) => {
        const response = await createCompany(companyData)
        console.log(response)
        if (response.status === 200) {
            setAlertMessage("✅ New company created.")
            setSelectedCompany(response.data._id)
            setShowRegisterCompany(false)
            setShowRegisterAdmin(true)
            setShowLoginForm(false)
        } else {
            setAlertMessage("❌ Check company's data and try again.")
        }
    }

    const handleRegisterAdmin = async (adminData) => {

        const response = await registerProfile(adminData)
        if (response.status === 201) {
            const loginR = await login({ ...adminData, company: adminData.companyId })
            if (loginR.data && loginR.data.token) {
                localStorage.setItem('token', loginR.data.token) // salviamo il token nel localStorage
                setToken(loginR.data.token) // aggiorniamo il token nello stato del contesto
            }
            setAlertMessage("✅ You are first admin, soon be in your dashboard.")
            setShowUploadLogo(true)
        } else {
            setAlertMessage("⚠️ Check your data and try again.")
        }

    }

    return (
        <Row className="justify-content-center mt-5">
            <Col md={5}>
                {alertMessage && <DynamicAlert message={alertMessage} onClose={() => setAlertMessage(null)} />}

                {!showRegisterCompany && !showRegisterAdmin && (
                    <>
                        <CompanySelection onSelectCompany={handleCompanySelect} onRegisterCompany={() => setShowRegisterCompany(true)} />
                        {showLoginForm && (
                            <form onSubmit={handleLogin}>
                                <input type="email" placeholder="Email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                <input type="password" placeholder="Password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                <button type="submit">Login</button>
                            </form>
                        )}
                    </>
                )}

                {showRegisterCompany && <RegisterCompanyForm onSubmit={handleRegisterCompany} />}
                {showRegisterAdmin && (
                    <RegisterAdminForm
                        companyId={selectedCompany}
                        onSubmit={handleRegisterAdmin}
                    />
                )}
            </Col>

            {showUploadLogo && selectedCompany && (
                <UploadCompanyLogo
                    show={showUploadLogo}
                    onHide={() => {
                        setShowUploadLogo(false)
                        setTimeout(() => navigate('/dashboard'), 1000) // Naviga sempre alla dashboard
                    }}
                    companyId={selectedCompany}
                />
            )}

        </Row>
    )
}

export default AuthPage











