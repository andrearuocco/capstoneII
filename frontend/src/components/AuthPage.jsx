import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { fetchGetCompanies, createCompany } from '../data/fetchCompany'
import { registerProfile } from '../data/fetchProfile'

function AuthPage() {
  const [companies, setCompanies] = useState([])
  const [selectedCompanyId, setSelectedCompanyId] = useState(null)
  const [showLogin, setShowLogin] = useState(false) //mostra il form per l'accesso degli utenti registrati
  const [showCompanyRegistration, setShowCompanyRegistration] = useState(false)
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
  } //cattura l'evento target quando l'utente visitatore seleziona le opzioni nella select dell'azienda

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
              <h3>Login in your Company and use gestionaleaziendale</h3>
              <Form>
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

            <Form.Group controlId="adminEmail" className="mb-3">
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
    </div>
  );
}

export default AuthPage;
