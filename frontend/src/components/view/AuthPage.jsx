import React, { useState, useEffect } from 'react'
import { fetchGetCompanies } from '../../data/fetchCompany'
import { login } from '../../data/fetchAuth'
import { useNavigate } from 'react-router-dom'
import CompanyRegistrationForm from '../login/CompanyRegistrationForm'
import AdminRegistrationForm from '../login/AdminRegistrationForm'
import CompanySelection from '../login/CompanySelection'
import LoginForm from '../login/LoginForm'
/* import LogoUpload from '../login/LogoUpload' */
import { Container, Row, Col, Alert } from 'react-bootstrap'
import { motion } from 'framer-motion'

function AuthPage() {
    const [companies, setCompanies] = useState([])
    const [selectedCompanyId, setSelectedCompanyId] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const [showCompanyRegistration, setShowCompanyRegistration] = useState(false)
    const [showAdminRegistration, setShowAdminRegistration] = useState(false)
    const [showLogoUpload, setShowLogoUpload] = useState(false)
    const [alertMessage, setAlertMessage] = useState(null)
    const [alertVariant, setAlertVariant] = useState('danger')
    const navigate = useNavigate();

    useEffect(() => {
        const loadCompanies = async () => {
            try {
                const data = await fetchGetCompanies()
                setCompanies(data?.dati || [])
            } catch (error) {
                console.error("Error to load companies", error)
            }
        };
        loadCompanies()
    }, [])

    const showAlert = (message, variant = 'danger') => {
        setAlertMessage(message)
        setAlertVariant(variant)
        setTimeout(() => setAlertMessage(null), 3000)
    }

    const handleSelectCompany = (companyId) => {
        setSelectedCompanyId(companyId)
        const selectedCompany = companies.find(c => c._id === companyId)
        
        if (selectedCompany?.users?.length === 0) {
            setShowAdminRegistration(true)
        } else {
            setShowLogin(true)
        }
    }

    const handleRegisterCompany = () => {
        setShowCompanyRegistration(true)
        setShowLogin(false)
    }

    const handleLogin = async (email, password) => {
        if (!email || !password || !selectedCompanyId) {
            showAlert('⚠️ Select your company to login.', 'danger')
            return;
        }
        try {
            const data = await login({ email, password, company: selectedCompanyId })
            if (data?.token) {
                localStorage.setItem('token', data.token)
                showAlert('✅ Wait, load dashboard...', 'success')
                setTimeout(() => navigate('/dashboard'), 2000)
            } else {
                showAlert('❌ Wrong credentials. Try again', 'danger')
            }
        } catch (error) {
            console.error("Error to login", error)
            showAlert('Error to login', 'danger')
        }
    }

    return (
        <Container className='d-flex justify-content-center align-items-center min-vh-100'>
            <Row className="bg-light shadow-lg p-4 rounded w-100">
                <Col xs={12} sm={6} className="d-flex align-items-center justify-content-center">
                    <motion.img
                        src="../lavoriedili.png"
                        alt="logo"
                        className="img-fluid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    />
                </Col>
                <Col xs={12} sm={6}>
                    {alertMessage && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <Alert variant={alertVariant}>{alertMessage}</Alert>
                        </motion.div>
                    )}
                    
                    {!showCompanyRegistration && !showAdminRegistration && !showLogoUpload && (
                        <CompanySelection
                            companies={companies}
                            onSelectCompany={handleSelectCompany}
                            onRegisterCompany={handleRegisterCompany}
                        />
                    )}
                    
                    {showLogin && (
                        <LoginForm companyId={selectedCompanyId} onLogin={handleLogin} />
                    )}
                    
                    {showCompanyRegistration && (
                        <CompanyRegistrationForm 
                            setShowCompanyRegistration={setShowCompanyRegistration} 
                            setShowAdminRegistration={setShowAdminRegistration}
                        />
                    )}
                    
                    {showAdminRegistration && (
                        <AdminRegistrationForm 
                            companyId={selectedCompanyId} 
                            setShowAdminRegistration={setShowAdminRegistration}
                            setShowLogoUpload={setShowLogoUpload}
                        />
                    )}
                    
                    {/* showLogoUpload && (
                        <LogoUpload companyId={selectedCompanyId} onSuccess={() => navigate('/dashboard')} />
                    ) */}
                </Col>
            </Row>
        </Container>
    )
}

export default AuthPage
