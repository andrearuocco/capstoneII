import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { fetchGetCompanies, createCompany } from '../../data/fetchCompany'
import { registerProfile } from '../../data/fetchProfile'
import { login } from '../../data/fetchAuth'
import { Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ProfileContext } from '../context/ProfileContextProvider'

function AuthPage() {
    const [companies, setCompanies] = useState([])
    const [selectedCompanyId, setSelectedCompanyId] = useState(null)
    const [showLogin, setShowLogin] = useState(false) //mostra il form per l'accesso degli utenti registrati
    const [showCompanyRegistration, setShowCompanyRegistration] = useState(false)
    const [showAdminModal, setShowAdminModal] = useState(false)
    const [alertMessage, setAlertMessage] = useState(null)
    const [alertVariant, setAlertVariant] = useState('success')
    const { token, setToken, userInfo, setUserInfo } = useContext(ProfileContext)
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
        companyId: '',
        password: '',
    })

    //carica la fetch di tutte le aziende 
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

    const handleAdminSubmit = async (e) => {
        e.preventDefault()
        const result = await registerProfile(formState)
        if (result.error) {
            alert(result.error)
        } else {
            alert('Administrator registered successfully!')
            setShowAdminModal(false)
        }
    }

    const handleCompanySelection = () => {
        if (selectedCompanyId) {
            setShowLogin(true)
        } else {
            alert('Select your company to login.')
        }
    } //mostra il form di login per accedere come utente dell'azienda selezionata 

    const handleNewCompanyRegistration = () => {
        setShowCompanyRegistration(true) //mostra form di registrazione per nuova azienda 
    }

    const handleCompanySubmit = async (e) => {
        e.preventDefault()
        const result = await createCompany(formState)
        if (result?.error) {
            alert(result.error)
        } else {
            alert('There is a new company. Welcome to gestionaleaziendale');
            setShowCompanyRegistration(false);
            setCompanies((prev) => [...prev, formState])
            setShowAdminModal(true) //mostra modale per la registrazione del primo utente amministratore
        }
    }

    const handleAdminFormChange = (e) => {
        const { id, value } = e.target;
        setAdminFormState({ ...adminFormState, [id]: value })
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
    
        if (!selectedCompanyId) {
            alert('Please select a company before logging in.')
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

    return (
        <div className="container mt-5">
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
                            {alertMessage && (
                                <Alert variant={alertVariant} onClose={() => setAlertMessage(null)} dismissible>
                                    {alertMessage}
                                </Alert>
                            )}
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

                        <h4>Company Address</h4>
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
        </div>
    )
}

export default AuthPage
