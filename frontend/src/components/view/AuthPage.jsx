import React, { useState, useEffect, useContext } from 'react'
import { fetchGetCompanies } from '../../data/fetchCompany'
import { login } from '../../data/fetchAuth'
import { useNavigate } from 'react-router-dom'
import { ProfileContext } from '../context/ProfileContextProvider'
import CompanyRegistrationForm from '../login/CompanyRegistrationForm'
import LoginForm from '../login/LoginForm'
import CompanySelection from '../login/CompanySelection'
import { Container, Row, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'

function AuthPage() {
    const [companies, setCompanies] = useState([])
    const [selectedCompanyId, setSelectedCompanyId] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const [showCompanyRegistration, setShowCompanyRegistration] = useState(false)
    const { setToken } = useContext(ProfileContext)
    const navigate = useNavigate()
    const [alertMessage, setAlertMessage] = useState(null)
    const [alertVariant, setAlertVariant] = useState('danger')

    useEffect(() => {
        const loadCompanies = async () => {
            try {
                const data = await fetchGetCompanies()
                setCompanies(data?.dati || [])
            } catch (error) {
                console.log("Error loading companies:", error)
            }
        }
        loadCompanies()
    }, [])

    const handleSelectCompany = (companyId) => {
        setSelectedCompanyId(companyId)
        setShowLogin(true)
    }

    const handleRegisterCompany = () => {
        setShowCompanyRegistration(true)
        setShowLogin(false)
    }

    const handleLogin = async (email, password, companyId) => {
        if (!email || !password || !companyId) {
            return { success: false, message: 'Autentication failed.' }
        }
        try {
            const data = await login({ email, password, company: companyId })
            if (data?.token) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                setAlertVariant('warning')
                setAlertMessage("✅ Login, dashboard rederecting...")
                setTimeout(() =>navigate('/dashboard'), 2000)
                return { success: true }
            }
            else {
                setAlertVariant('danger')
                setAlertMessage("❌ Credenziali errate.")
                setTimeout(() => setAlertMessage(null), 3000)
            }
        } catch (error) {
            console.log("Error to login:", error)
            return { success: false, message: 'Error to login.' }
        }
    }

    return (
        <Container className='d-flex justify-content-center align-items-center min-vh-100'>
            <Row className="bg-dark bg-gradient bg-opacity-10 d-flex justify-content-center align-items-center w-100">
                
                <Col xs={12} sm={6} className="p-4 d-flex align-items-center justify-content-center">
                    <img
                        src="/lavoriedili.png"
                        alt="logoIT"
                        className="img-fluid"
                    />
                </Col>

                <Col xs={12} sm={6} className="p-4 d-flex align-items-center justify-content-center">
                    
                    <motion.div
                        initial={{ opacity: 1, scale: 1 }}
                        animate={showCompanyRegistration ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        style={{ position: showCompanyRegistration ? 'absolute' : 'relative', width: "100%" }}
                    >
                        {!showCompanyRegistration && (
                            <>
                                <CompanySelection
                                    companies={companies}
                                    onSelectCompany={handleSelectCompany}
                                    onRegisterCompany={handleRegisterCompany}
                                />
                                {showLogin && <LoginForm companyId={selectedCompanyId} onLogin={handleLogin} alertMessage={alertMessage} alertVariant={alertVariant}/>}
                            </>
                        )}
                    </motion.div>

                    {showCompanyRegistration && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                            className="w-100"
                        >
                            <CompanyRegistrationForm setShowCompanyRegistration={setShowCompanyRegistration} />
                        </motion.div>
                    )}
                </Col>
                
            </Row>
        </Container>    
    )
}

export default AuthPage




