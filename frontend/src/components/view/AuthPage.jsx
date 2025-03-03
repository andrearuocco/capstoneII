<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import React, { useState, useEffect, useContext } from 'react'
=======
/* import React, { useState, useEffect, useContext } from 'react'
>>>>>>> parent of 9e5ea69 (companyregistration)
import { fetchGetCompanies } from '../../data/fetchCompany'
import { login } from '../../data/fetchAuth'
import { useNavigate } from 'react-router-dom'
import { ProfileContext } from '../context/ProfileContextProvider'
import CompanyRegistrationForm from '../login/CompanyRegistrationForm'
import LoginForm from '../login/LoginForm'
import CompanySelection from '../login/CompanySelection'
import { Container, Row, Col } from 'react-bootstrap'
>>>>>>> parent of d5f6c4f (sab22)

function AuthPage() {
    const [companies, setCompanies] = useState([])
    const [selectedCompanyId, setSelectedCompanyId] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const [showCompanyRegistration, setShowCompanyRegistration] = useState(false)
<<<<<<< HEAD
<<<<<<< HEAD
    const [showAdminRegistration, setShowAdminRegistration] = useState(false)
    const [showLogoUpload, setShowLogoUpload] = useState(false)
    const [alertMessage, setAlertMessage] = useState(null)
    const [alertVariant, setAlertVariant] = useState('danger')
    const navigate = useNavigate();
=======
    const { setToken } = useContext(ProfileContext)
    const navigate = useNavigate()
>>>>>>> parent of 9e5ea69 (companyregistration)

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
=======
    const { setToken } = useContext(ProfileContext)
    const navigate = useNavigate()

    useEffect(() => {
        const loadCompanies = async () => {
            const data = await fetchGetCompanies()
            setCompanies(data.dati || [])
        }
        loadCompanies()
    }, [])

    const handleSelectCompany = (companyId) => {
        setSelectedCompanyId(companyId)
        setShowLogin(true)
    };
>>>>>>> parent of d5f6c4f (sab22)

    const handleRegisterCompany = () => {
        setShowCompanyRegistration(true)
        setShowLogin(false)
    }

<<<<<<< HEAD
<<<<<<< HEAD
    const handleLogin = async (email, password) => {
        if (!email || !password || !selectedCompanyId) {
            showAlert('⚠️ Select your company to login.', 'danger')
            return;
=======
    const handleLogin = async (email, password, companyId) => {
        if (!email || !password || !companyId) {
            return { success: false, message: 'Credenziali incomplete.' }
>>>>>>> parent of 9e5ea69 (companyregistration)
        }
        try {
            const data = await login({ email, password, company: selectedCompanyId })
            if (data?.token) {
                localStorage.setItem('token', data.token)
<<<<<<< HEAD
                showAlert('✅ Wait, load dashboard...', 'success')
                setTimeout(() => navigate('/dashboard'), 2000)
            } else {
                showAlert('❌ Wrong credentials. Try again', 'danger')
            }
        } catch (error) {
            console.error("Error to login", error)
            showAlert('Error to login', 'danger')
=======
                setToken(data.token)
                navigate('/dashboard')
                return { success: true }
            }
            return { success: false, message: data?.message || 'Credenziali errate.' }
        } catch (error) {
            console.log("Error logging in:", error)
            return { success: false, message: 'Errore durante l\'accesso.' }
>>>>>>> parent of 9e5ea69 (companyregistration)
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
=======
    const handleLogin = async (email, password, companyId) => {
        const data = await login({ email, password, company: companyId })
        if (data?.token) {
            localStorage.setItem('token', data.token)
            setToken(data.token)
            navigate('/dashboard')
            return { success: true }
        }
        return { success: false, message: data?.message || 'Login fallito' }
    }

    return (
        <Container className="bg-light">
            <Row className="w-100">
                
                <Col xs={12} sm={6} className="p-4 d-flex align-items-center justify-content-center min-vh-100">
                    <img
                        src="/lavoriedili.png"
                        alt="Logo"
                        className="img-fluid"
                    />
                </Col>
<<<<<<< HEAD
                <Col xs={12} sm={6} className="p-4">
                    <div className="card w-100">
                        <div className="card-body">
                            <div className="container mt-5">
                    {!showCompanyRegistration ? (
>>>>>>> parent of d5f6c4f (sab22)
                        <CompanySelection
                            companies={companies}
                            onSelectCompany={handleSelectCompany}
                            onRegisterCompany={handleRegisterCompany}
                        />
<<<<<<< HEAD
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
=======
                    ) : (
                        <CompanyRegistrationForm setShowCompanyRegistration={setShowCompanyRegistration} />
                    )}
                    {showLogin && <LoginForm companyId={selectedCompanyId} onLogin={handleLogin} />}
                            </div>
                        </div>
                    </div>
>>>>>>> parent of d5f6c4f (sab22)
                </Col>

=======
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
=======
/* import React, { useState, useEffect, useContext } from 'react'
>>>>>>> parent of 9e5ea69 (companyregistration)
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
<<<<<<< HEAD
                        initial={{ x: 0, opacity: 1, scale: 1 }}
                        animate={ showCompanyRegistration ? { x: '-100%', opacity: 0, scale: 0.95 } : { x: 0, opacity: 1, scale: 1 } }
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
=======
                        initial={{ x: 0, opacity: 1 }}
                        animate={{
                            x: showCompanyRegistration ? '-100%' : 0, // Sposta la selezione azienda/login fuori dallo schermo
                            opacity: showCompanyRegistration ? 0 : 1 // Dissolve gradualmente
                        }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
>>>>>>> parent of 9e5ea69 (companyregistration)
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
<<<<<<< HEAD
                            initial={{ opacity: 0, x: "100%", scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
=======
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
>>>>>>> parent of 9e5ea69 (companyregistration)
                            className="w-100"
                        >
                            <CompanyRegistrationForm setShowCompanyRegistration={setShowCompanyRegistration} />
                        </motion.div>
                    )}
                      
                    
                </Col>
<<<<<<< HEAD
>>>>>>> parent of 9e5ea69 (companyregistration)
=======

            </Row>
        </Container>    
    )
}

export default AuthPage 
 */

=======
>>>>>>> parent of d5f6c4f (sab22)
import React, { useState, useEffect, useContext } from 'react'
import { fetchGetCompanies } from '../../data/fetchCompany'
import { login } from '../../data/fetchAuth'
import { useNavigate } from 'react-router-dom'
import { ProfileContext } from '../context/ProfileContextProvider'
import CompanyRegistrationForm from '../login/CompanyRegistrationForm'
import LoginForm from '../login/LoginForm'
import CompanySelection from '../login/CompanySelection'
import { Container, Row, Col } from 'react-bootstrap'

function AuthPage() {
    const [companies, setCompanies] = useState([])
    const [selectedCompanyId, setSelectedCompanyId] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const [showCompanyRegistration, setShowCompanyRegistration] = useState(false)
    const { setToken } = useContext(ProfileContext)
    const navigate = useNavigate()

    useEffect(() => {
        const loadCompanies = async () => {
            const data = await fetchGetCompanies()
            setCompanies(data.dati || [])
        }
        loadCompanies()
    }, [])

    const handleSelectCompany = (companyId) => {
        setSelectedCompanyId(companyId)
        setShowLogin(true)
    };

    const handleRegisterCompany = () => {
        setShowCompanyRegistration(true)
        setShowLogin(false)
    }

    const handleLogin = async (email, password, companyId) => {
        const data = await login({ email, password, company: companyId })
        if (data?.token) {
            localStorage.setItem('token', data.token)
            setToken(data.token)
            navigate('/dashboard')
            return { success: true }
        }
        return { success: false, message: data?.message || 'Login fallito' }
    }

    return (
        <Container className="bg-light">
            <Row className="w-100">
                
                <Col xs={12} sm={6} className="p-4 d-flex align-items-center justify-content-center min-vh-100">
                    <img
                        src="/lavoriedili.png"
                        alt="Logo"
                        className="img-fluid"
                    />
                </Col>
                <Col xs={12} sm={6} className="p-4">
                    <div className="card w-100">
                        <div className="card-body">
                            <div className="container mt-5">
                    {!showCompanyRegistration ? (
                        <CompanySelection
                            companies={companies}
                            onSelectCompany={handleSelectCompany}
                            onRegisterCompany={handleRegisterCompany}
                        />
                    ) : (
                        <CompanyRegistrationForm setShowCompanyRegistration={setShowCompanyRegistration} />
                    )}
                    {showLogin && <LoginForm companyId={selectedCompanyId} onLogin={handleLogin} />}
                            </div>
                        </div>
                    </div>
                </Col>
<<<<<<< HEAD
>>>>>>> parent of 9e5ea69 (companyregistration)
=======

>>>>>>> parent of d5f6c4f (sab22)
            </Row>
        </Container>
    )
}

export default AuthPage
<<<<<<< HEAD
<<<<<<< HEAD
=======



<<<<<<< HEAD
>>>>>>> parent of 9e5ea69 (companyregistration)
=======
>>>>>>> parent of 9e5ea69 (companyregistration)
=======
>>>>>>> parent of d5f6c4f (sab22)
