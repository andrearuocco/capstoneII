import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetchGetCompanies, createCompany } from '../data/fetchCompany'; // Import funzioni
import { registerProfile } from '../data/fetchProfile'; // Import funzioni

function AuthPage() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCompanyRegistration, setShowCompanyRegistration] = useState(false);
  const [formState, setFormState] = useState({
    companyName: '',
    vatNumber: '',
    adminEmail: '',
    adminPassword: '',
  });

  // Fetch delle aziende dal backend
  useEffect(() => {
    const loadCompanies = async () => {
      const data = await fetchGetCompanies();
      if (data) {
        setCompanies(data.dati || []);
      }
    };
    loadCompanies();
  }, []);

  const handleCompanySelection = () => {
    if (selectedCompanyId) {
      setShowLogin(true);
    } else {
      alert('Seleziona azienda prima di procedere.');
    }
  };

  const handleNewCompanyRegistration = () => {
    setShowCompanyRegistration(true);
  };

  const handleUserRegistration = () => {
    setShowRegisterModal(true);
  };

  const handleModalClose = () => {
    setShowRegisterModal(false);
  };

  const handleCompanyFormChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    const newCompany = {
      companyName: formState.companyName,
      vatNumber: formState.vatNumber,
      adminEmail: formState.adminEmail,
      adminPassword: formState.adminPassword,
    };

    const result = await createCompany(newCompany);
    if (result?.error) {
      alert(result.error);
    } else {
      alert('Azienda registrata con successo!');
      setShowCompanyRegistration(false);
      setCompanies((prev) => [...prev, newCompany]);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName: e.target.registerFirstName.value,
      lastName: e.target.registerLastName.value,
      email: e.target.registerEmail.value,
      password: e.target.registerPassword.value,
      companyId: selectedCompanyId,
    };

    const result = await registerProfile(formData);
    if (result?.error) {
      alert(result.error);
    } else {
      alert('Utente registrato con successo!');
      setShowRegisterModal(false);
    }
  };

  return (
    <div className="container mt-5">
      {!showCompanyRegistration ? (
        <div className="text-center">
          <h1>Benvenuto!</h1>
          <div className="mt-4">
            <Form.Group controlId="companySelection" className="mb-3">
              <Form.Label>Seleziona un'Azienda</Form.Label>
              <Form.Select
                onChange={(e) => setSelectedCompanyId(e.target.value)}
                value={selectedCompanyId || ''}
              >
                <option value="">-- Seleziona un'Azienda --</option>
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.companyName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button className="me-3" onClick={handleCompanySelection}>
              Accedi Azienda
            </Button>
            <Button variant="secondary" onClick={handleNewCompanyRegistration}>
              Registra Nuova Azienda
            </Button>
          </div>

          {showLogin && (
            <div className="mt-4">
              <h3>Accedi all'Azienda</h3>
              <Form>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Inserisci email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Inserisci password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Accedi
                </Button>

                <Button
                  variant="link"
                  onClick={handleUserRegistration}
                  className="ms-3"
                >
                  Nuovo Utente? Registrati
                </Button>
              </Form>
            </div>
          )}

          <Modal show={showRegisterModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Registrazione Nuovo Utente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleRegisterSubmit}>
                <Form.Group controlId="registerFirstName" className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" placeholder="Inserisci il tuo nome" />
                </Form.Group>

                <Form.Group controlId="registerLastName" className="mb-3">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control type="text" placeholder="Inserisci il tuo cognome" />
                </Form.Group>

                <Form.Group controlId="registerEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Inserisci la tua email" />
                </Form.Group>

                <Form.Group controlId="registerPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Inserisci la tua password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Registrati
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      ) : (
        <div>
          <h2>Registrazione Nuova Azienda</h2>
          <Form onSubmit={handleCompanySubmit}>
            <Form.Group controlId="companyName" className="mb-3">
              <Form.Label>Nome Azienda</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il nome dell'azienda"
                onChange={handleCompanyFormChange}
              />
            </Form.Group>

            <Form.Group controlId="vatNumber" className="mb-3">
              <Form.Label>Partita IVA</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci la Partita IVA"
                onChange={handleCompanyFormChange}
              />
            </Form.Group>

            <Form.Group controlId="adminEmail" className="mb-3">
              <Form.Label>Email Amministratore</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci l'email dell'amministratore"
                onChange={handleCompanyFormChange}
              />
            </Form.Group>

            <Form.Group controlId="adminPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci la password"
                onChange={handleCompanyFormChange}
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Registra Azienda
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default AuthPage;
