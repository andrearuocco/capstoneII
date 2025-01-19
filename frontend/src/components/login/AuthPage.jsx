import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { fetchGetCompanies, createCompany, patchCompanyLogo } from '../../data/fetchCompany'
import { registerProfile } from '../../data/fetchProfile'
import { login } from '../../data/fetchAuth'
import { useNavigate } from 'react-router-dom'
import { ProfileContext } from '../context/ProfileContextProvider'

function AuthPage() {
    const [companies, setCompanies] = useState([])
    const [selectedCompanyId, setSelectedCompanyId] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const [showCompanyRegistration, setShowCompanyRegistration] = useState(false)
    const [showAdminModal, setShowAdminModal] = useState(false)
    const [showAdminModalLogin, setShowAdminModalLogin] = useState(false)
    const [showLogoModal, setShowLogoModal] = useState(false)
    const [alertMessage, setAlertMessage] = useState(null)
    const [alertVariant, setAlertVariant] = useState('success')
    const [selectedLogo, setSelectedLogo] = useState(null)
    const { token, setToken } = useContext(ProfileContext)
    const navigate = useNavigate()
    const [formState, setFormState] = useState({
        companyName: '',
        vatNumber: '',
        email: '',
        IBAN: '',
        address: {
            street: '',
            city: '',
            postalCode: '',
            province: '',
            country: '',
        },
    })
    const [adminFormState, setAdminFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        isAdmin: true,
        adminRole: 'Amministratore Delegato',
        companyId: formState._id,
        password: '',
    })

    const loadCompanies = async () => {
        const data = await fetchGetCompanies()
        if (data) {
            setCompanies(data.dati || [])
        }
    }
    useEffect(() => {
        loadCompanies()
    }, [])

    const handleCompanyFormChange = (e) => {
        const { id, value } = e.target
        if (id.startsWith('address.')) {
            const addressField = id.split('.')[1]
            setFormState((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value,
                },
            }))
        } else {
            setFormState({ ...formState, [id]: value })
        }
    } //cattura l'evento quando l'utente visitatore inserisce i dati da compilare nel form per la registrazione di una nuova azienda

    const handleCompanySelection = async () => {
        if (selectedCompanyId) {
            const selectedCompany = companies.find(company => company._id === selectedCompanyId)
            if (!selectedCompany) {
                setAlertMessage('Select your company to login.')
                setAlertVariant('danger')
                return;
            }
    
            const hasAdmins = selectedCompany.admins && selectedCompany.admins.length > 0
            const hasEmployees = selectedCompany.employees && selectedCompany.employees.length > 0
    
            if (!hasAdmins && !hasEmployees) {
                setAdminFormState(prev => ({ ...prev, companyId: selectedCompanyId }))
                const loginData = await login({
                    email: adminFormState.email,
                    password: adminFormState.password,
                    company: selectedCompanyId,
                })
    
                if (loginData?.token) {
                    localStorage.setItem('token', loginData.token)
                    setToken(loginData.token)
                    navigate('/dashboard')
                } else {
                    setAlertMessage(loginData?.message || 'Login failed.')
                    setAlertVariant('danger')
                }
            } else {
                setShowLogin(true)
            }
        } else {
            setAlertMessage('Select your company to login.')
            setAlertVariant('danger')
        }
    } //mostra il form di login per accedere come utente dell'azienda selezionata o il form di registrazione primo utente amministratore se l'azienda non ha utenze

    const handleNewCompanyRegistration = () => {
        setShowCompanyRegistration(true) //mostra form per registrazione nuova azienda 
    }

    const handleCloseRegistration = () => {
        setShowCompanyRegistration(false) 
    }

    const handleCompanySubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await createCompany(formState)
    
            if (result?.error || !result?.data?._id) {
                setAlertMessage(result?.error || 'Failed! Please try again.')
                setAlertVariant('danger')
                return;
            }
    
            const newCompanyId = result.data._id
            setFormState((prev) => ({ ...prev, _id: newCompanyId }))
            setAdminFormState((prev) => ({ ...prev, companyId: newCompanyId }))
            setAlertMessage('Company registered successfully! Proceed to admin registration.')
            setAlertVariant('success')
            setShowCompanyRegistration(false)
            setShowAdminModal(true)
        } catch (error) {
            setAlertMessage('An error occurred while registering the company.')
            setAlertVariant('danger')
        }
    } //consente la registrazione di una nuova azienda e fa procedere alla registrazione come primo utente amministratore 

    const handleAdminFormChange = (e) => {
        const { id, value } = e.target
        setAdminFormState({ ...adminFormState, [id]: value })
    }

    const handleAdminSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await registerProfile(adminFormState)

            if (result?.error || !result?.data?._id) {
                setAlertMessage(result?.error || 'Failed! Please try again.')
                setAlertVariant('danger')
                return;
            }

            setAlertMessage('Administrator registered successfully!')
            setAlertVariant('success')
            setShowAdminModal(false)

            setShowLogoModal(true)
        } catch (error) {
            setAlertMessage('An error occurred.')
            setAlertVariant('danger')
        }
    }

    const handleAdminSubmitFromLogin = async (e) => {
        e.preventDefault()
    
        const result = await registerProfile(adminFormState)
        if (result?.error) {
            setAlertMessage(result.error)
            setAlertVariant('danger')
        } else {
            setAlertMessage('Administrator registered successfully!')
            setAlertVariant('success')
            setShowAdminModalLogin(false)
            
            const data = await login({
                email: adminFormState.email,
                password: adminFormState.password,
                company: adminFormState.companyId,
            })
    
            if (data && data.token) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                navigate('/dashboard')
            } else {
                setAlertMessage(data.message || 'Login failed')
                setAlertVariant('danger')
            }
        }
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()

        if (!selectedCompanyId) {
            setAlertMessage('Please select a company before logging in.')
            setAlertVariant('danger')
            return;
        }

        const data = await login({
            email: e.target.formBasicEmail.value,
            password: e.target.formBasicPassword.value,
            company: selectedCompanyId
        })
        // gestione accesso utente
        if (data && data.token) { // controlliamo se il token esiste
            localStorage.setItem('token', data.token) // salviamo il token nel localStorage
            setToken(data.token) // aggiorniamo il token nello stato del contesto

            setAlertMessage('Login successful!')
            setAlertVariant('success')

            navigate('/dashboard')
        } else {
            setAlertMessage(data.message || 'Login failed')
            setAlertVariant('danger')
        }
    }

    const handleLogoUpload = async () => {
        if (!selectedLogo) {
            setAlertMessage('Please select a logo file before uploading.')
            setAlertVariant('danger')
            return;
        }
    
        const formData = new FormData()
        formData.append('logo', selectedLogo)
    
        try {
            const result = await patchCompanyLogo(formState._id, formData)
    
            if (result?.error) {
                setAlertMessage(result.error || 'Failed! Please try again.')
                setAlertVariant('danger')
                return;
            }
    
            setAlertMessage('Logo uploaded successfully!')
            setAlertVariant('success')
    
            const loginData = await login({
                email: adminFormState.email,
                password: adminFormState.password,
                company: adminFormState.companyId,
            })
    
            if (loginData?.token) {
                localStorage.setItem('token', loginData.token)
                setToken(loginData.token)
                navigate('/dashboard')
            } else {
                setAlertMessage(loginData?.message || 'Login failed.')
                setAlertVariant('danger')
            }
        } catch (error) {
            setAlertMessage('An error occurred.')
            setAlertVariant('danger')
        }
    }
    
    return (
        <div className="container mt-5">

            {alertMessage && (
                <Alert variant={alertVariant} onClose={() => setAlertMessage(null)} dismissible>
                    {alertMessage}
                </Alert>
            )}

            {!showCompanyRegistration ? (
                <div className="text-center">
                    <h1>Welcome!!</h1>
                    <div className="mt-4">
                        <Form.Group controlId="companySelection" className="mb-3">
                            <Form.Label>Select your Company</Form.Label>
                            <Form.Select
                                onChange={(e) => setSelectedCompanyId(e.target.value)}
                                value={selectedCompanyId || ''}
                            >
                                <option value="">-- Select your Company --</option>
                                {companies.map((company) => (
                                    <option key={company._id} value={company._id}>
                                        {company.companyName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button className="me-3" onClick={handleCompanySelection}>
                            Here to Login
                        </Button>
                        <Button variant="secondary" onClick={handleNewCompanyRegistration}>
                            Register a new Company
                        </Button>
                    </div>

                    {showLogin && (
                        <div className="mt-4">
                            <h3>Login in your Company and use gestionaleaziendale</h3>
                            <Form onSubmit={handleLoginSubmit}>

                                <Form.Group controlId="formBasicEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Insert email" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Type password" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Login
                                </Button>

                            </Form>
                        </div>
                    )}

                </div>
            ) : (
                <div>
                    <h2>Register a new company</h2>
                    <Form onSubmit={handleCompanySubmit}>
                        <Form.Group controlId="companyName" className="mb-3">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="gestionaleaziendale"
                                onChange={handleCompanyFormChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="vatNumber" className="mb-3">
                            <Form.Label>Partita IVA</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="gestionaleaziendale"
                                onChange={handleCompanyFormChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="IBAN" className="mb-3">
                            <Form.Label>IBAN</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="gestionaleaziendale"
                                onChange={handleCompanyFormChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Company's email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="gestionaleaziendale"
                                onChange={handleCompanyFormChange}
                            />
                        </Form.Group>

                        <h6>Company Address</h6>
                        <Form.Group controlId="address.street" className="mb-3">
                            <Form.Label>Address/Street</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="gestionaleaziendale"
                                onChange={handleCompanyFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="address.city" className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="gestionaleaziendale"
                                onChange={handleCompanyFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="address.postalCode" className="mb-3">
                            <Form.Label>CAP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="gestionaleaziendale"
                                onChange={handleCompanyFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="address.province" className="mb-3">
                            <Form.Label>Where - Provincia</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="gestionaleaziendale"
                                onChange={handleCompanyFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="address.country" className="mb-3">
                            <Form.Label>From</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="gestionaleaziendale"
                                onChange={handleCompanyFormChange}
                            />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Register Company
                        </Button>
                        <Button variant="success" onClick={handleCloseRegistration}>
                            Close
                        </Button>
                    </Form>
                </div>
            )}

            <Modal show={showAdminModal} onHide={() => setShowAdminModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Register Administrator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAdminSubmit}>
                        <Form.Group controlId="firstName" className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                onChange={handleAdminFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="lastName" className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                onChange={handleAdminFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={handleAdminFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="phone" className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone"
                                onChange={handleAdminFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="adminRole" className="mb-3">
                            <Form.Label>Admin Role</Form.Label>
                            <Form.Select
                                onChange={handleAdminFormChange}
                                defaultValue="Direttore"
                            >
                                <option value="Socio">Socio</option>
                                <option value="Amministratore Delegato">Amministratore Delegato</option>
                                <option value="Direttore Tecnico">Direttore Tecnico</option>
                                <option value="Consigliere">Consigliere</option>
                                <option value="Direttore">Direttore</option>
                                <option value="Geometra">Geometra</option>
                                <option value="Responsabile Risorse Umane">Responsabile Risorse Umane</option>
                                <option value="Responsabile">Responsabile</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                onChange={handleAdminFormChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register Admin
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showAdminModalLogin} onHide={() => setShowAdminModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Register Administrator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAdminSubmitFromLogin}>
                        <Form.Group controlId="firstName" className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                onChange={handleAdminFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="lastName" className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                onChange={handleAdminFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={handleAdminFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="phone" className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone"
                                onChange={handleAdminFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="adminRole" className="mb-3">
                            <Form.Label>Admin Role</Form.Label>
                            <Form.Select
                                onChange={handleAdminFormChange}
                                defaultValue="Direttore"
                            >
                                <option value="Socio">Socio</option>
                                <option value="Amministratore Delegato">Amministratore Delegato</option>
                                <option value="Direttore Tecnico">Direttore Tecnico</option>
                                <option value="Consigliere">Consigliere</option>
                                <option value="Direttore">Direttore</option>
                                <option value="Geometra">Geometra</option>
                                <option value="Responsabile Risorse Umane">Responsabile Risorse Umane</option>
                                <option value="Responsabile">Responsabile</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                onChange={handleAdminFormChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register Admin
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showLogoModal} onHide={() => setShowLogoModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Company Logo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="logoFile" className="mb-3">
                        <Form.Label>Inserisci un file per caricare un nuovo avatar</Form.Label>
                        <Form.Control type="file" onChange={(e) => setSelectedLogo(e.target.files[0])} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleLogoUpload}>
                        Carica Logo
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default AuthPage
