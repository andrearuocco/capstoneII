import React, { useState, useContext } from 'react'
import { Form, Button, Image, Container } from 'react-bootstrap'
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
import './AuthPage.css'
import { toast } from 'react-toastify'
import { AnimatePresence, motion } from 'framer-motion'

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

            toast.success("✅ Login succesful, laoding dashboard..")
            setTimeout(() => navigate('/dashboard'), 3000)
        } else {
            toast.error("❌ Wrong credentials, try again.")
        }
    }

    const handleCompanySelect = async (companyId) => {
    
        setSelectedCompany(companyId)
        setShowRegisterCompany(false)
    
        const response = await companyWho(companyId)
    
        if (response?.error) {
            toast.error(`⚠️ Select your company to log in.`)
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
            toast.success("✅ New company created.")
            setSelectedCompany(response.data._id)
            setShowRegisterCompany(false)
            setShowRegisterAdmin(true)
            setShowLoginForm(false)
        } else {
            toast.error("❌ Check company's data and try again.")
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
            toast.success("✅ You are first admin, soon be in your dashboard.")
            setShowUploadLogo(true)
        } else {
            toast.error("⚠️ Check your data and try again.")
        }

    }

    return (
    <Container fluid className='min-vh-100 justify-content-center align-items-center d-flex auth-container-wrapper'>
        <Row className='w-100 align-items-center'>
            <Image src="/lavoriedili.png" alt="LogoSepSRL" className="col-12 col-md-5" />
            <Col xs={12} md={7} className='auth-container justify-content-center'>
                {alertMessage && <DynamicAlert message={alertMessage} onClose={() => setAlertMessage(null)} />}

                {!showRegisterCompany && !showRegisterAdmin && (
                    <>
                        <CompanySelection onSelectCompany={handleCompanySelect} onRegisterCompany={() => setShowRegisterCompany(true)} />
                        {showLoginForm && (
                            <Form onSubmit={handleLogin}>

                                <Form.Group className='mt-2'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </Form.Group>

                                <Form.Group className='mt-2'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                </Form.Group>

                                <Button type="submit" className='button-nvm-blue mt-2'>Login</Button>

                            </Form>
                        )}
                    </>
                )}

                {/* MODIFICHE 30 MARZO */}<AnimatePresence>{/* MODIFICHE 30 MARZO */}
                    {showRegisterCompany &&

                        <motion.div
                            key="register-company"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                        >

                            <RegisterCompanyForm onSubmit={handleRegisterCompany} />

                        </motion.div>

                    }
                {/* MODIFICHE 30 MARZO */}</AnimatePresence>{/* MODIFICHE 30 MARZO */}
                
                {/* MODIFICHE 30 MARZO */}<AnimatePresence>{/* MODIFICHE 30 MARZO */}
                    {showRegisterAdmin && (

                        <motion.div
                            key="register-company"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                        >

                            <RegisterAdminForm
                                companyId={selectedCompany}
                                onSubmit={handleRegisterAdmin}
                            />

                        </motion.div>

                    )}
                    {/* MODIFICHE 30 MARZO */}</AnimatePresence>{/* MODIFICHE 30 MARZO */}
            </Col>

            {showUploadLogo && selectedCompany && (
                <UploadCompanyLogo
                    show={showUploadLogo}
                    onHide={() => {
                        setShowUploadLogo(false)
                        setTimeout(() => navigate('/dashboard'), 1000) 
                    }}
                    companyId={selectedCompany}
                />
            )}

        </Row>
    </Container>
    )
}

export default AuthPage











