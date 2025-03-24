import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { fetchGetCompanies, createCompany } from '../../data/fetchCompany'
import { login } from '../../data/App'
import DynamicAlert from '../login/DynamicAlert'
import RegisterCompanyForm from '../login/RegisterCompanyForm'
import RegisterAdminForm from '../login/RegisterAdminForm'
import UploadCompanyLogo from '../login/UploadCompanyLogo'
import CompanySelection from '../login/CompanySelection'
import { registerProfile } from '../../data/fetchProfile_refactored'
import { companyWho } from '../../data/fetchCompany_refactored'

function AuthPage() {
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [companies, setCompanies] = useState([])
    const [showRegisterCompany, setShowRegisterCompany] = useState(false)
    const [showRegisterAdmin, setShowRegisterAdmin] = useState(false)
    const [showUploadLogo, setShowUploadLogo] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [alertMessage, setAlertMessage] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchGetCompanies().then(data => setCompanies(data || []))
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!selectedCompany) {
            setAlertMessage("⚠️ Select your company to log in.")
            return;
        }
        const response = await login({ ...formData, companyId: selectedCompany })

        if (response?.token) {
            setAlertMessage("✅ Login succesful, laoding dashboard..")
            setTimeout(() => navigate('/dashboard'), 1000)
        } else {
            setAlertMessage("❌ Wrong credentials, try again.")
        }
    }

    const handleCompanySelect = async (companyId) => {
        if (!companyId) {
            setAlertMessage("⚠️ Select your company to log in.")
            return
        }
    
        setSelectedCompany(companyId)
        setShowRegisterCompany(false)
    
        const response = await companyWho(companyId)
    
        if (response?.error) {
            setAlertMessage(`❌ ${response.error}`)
            return
        }
    
        const company = response.data || response // a seconda di come risponde il backend
    
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
        if (response.status === 201 && response.status === 200) {
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
        if (response.status === 201 && response.status === 200) {
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











