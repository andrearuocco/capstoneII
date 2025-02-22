/* import React, { useState, useEffect, useContext } from 'react'
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
            return { success: false, message: 'Credenziali incomplete.' }
        }
        try {
            const data = await login({ email, password, company: companyId })
            if (data?.token) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                navigate('/dashboard')
                return { success: true }
            }
            return { success: false, message: data?.message || 'Credenziali errate.' }
        } catch (error) {
            console.log("Error logging in:", error)
            return { success: false, message: 'Errore durante l\'accesso.' }
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
                        initial={{ x: 0, opacity: 1 }}
                        animate={{
                            x: showCompanyRegistration ? '-100%' : 0, // Sposta la selezione azienda/login fuori dallo schermo
                            opacity: showCompanyRegistration ? 0 : 1 // Dissolve gradualmente
                        }}
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
                                {showLogin && <LoginForm companyId={selectedCompanyId} onLogin={handleLogin} />}
                            </>
                        )}
                    </motion.div>
                    {showCompanyRegistration && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
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
 */

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
            return { success: false, message: 'Credenziali incomplete.' }
        }
        try {
            const data = await login({ email, password, company: companyId })
            if (data?.token) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                navigate('/dashboard')
                return { success: true }
            }
            return { success: false, message: data?.message || 'Credenziali errate.' }
        } catch (error) {
            console.log("Error logging in:", error)
            return { success: false, message: 'Errore durante l\'accesso.' }
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
                        initial={{ x: 0, opacity: 1, scale: 1 }}
                        animate={ showCompanyRegistration ? { x: '-100%', opacity: 0, scale: 0.95 } : { x: 0, opacity: 1, scale: 1 } }
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        style={{ position: showCompanyRegistration ? 'absolute' : 'relative', width: "100%" }}
                    >
                        {!showCompanyRegistration && (
                            <>
                                <CompanySelection
                                    companies={companies}
                                    onSelectCompany={handleSelectCompany}
                                    onRegisterCompany={handleRegisterCompany}
                                />
                                {showLogin && <LoginForm companyId={selectedCompanyId} onLogin={handleLogin} />}
                            </>
                        )}
                    </motion.div>
                    {showCompanyRegistration && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%", scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
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



