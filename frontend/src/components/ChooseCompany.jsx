import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { fetchGetCompanies, createCompany } from '../data/fetchCompany'
import Select from 'react-select'
import '../App.css'

const ChooseCompany = ({ onCompanySelect }) => {
  const [companies, setCompanies] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newCompany, setNewCompany] = useState({
    companyName: '',
    vatNumber: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      province: '',
      country: '',
    },
    logo: '',
    IBAN: '',
  })

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [selectedCompany, setSelectedCompany] = useState(null)

  useEffect(() => {
    fetchGetCompanies().then((data) => {
      const formattedCompanies = data.map((company) => ({
        value: company._id,
        label: company.companyName,
      }));
      setCompanies(formattedCompanies)
    })
  }, [])

  const handleNewCompanyChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      const field = name.split('.')[1];
      setNewCompany({
        ...newCompany,
        address: { ...newCompany.address, [field]: value },
      });
    } else {
      setNewCompany({ ...newCompany, [name]: value });
    }
  }

  const handleRegisterCompany = async () => {
    try {
      await createCompany(newCompany)
      setSuccessMessage('Azienda registrata con successo')
      setShowModal(false)
      fetchGetCompanies()
    } catch (error) {
      setErrorMessage('Riprova, registrazione non riuscita')
    }
  }

  const handleCompanyChange = (selectedOption) => {
    setSelectedCompany(selectedOption)
    const company = companies.find((c) => c.value === selectedOption.value)
    localStorage.setItem('selectedCompanyId', selectedOption.value)
    onCompanySelect(company)
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#e1edf3',
      padding: '3.75px',
      borderRadius: '2px',
      borderColor: '#78a745',
      '&:hover': { borderColor: '#00cc99' },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#004d99' : 'white',
      color: state.isFocused ? 'white' : 'black',
      cursor: 'pointer',
    }),
  }

  return (
    <div className="font-welcome">
      <h4 className='font-button'>BenvenutA/O !!</h4>

      <Form.Group controlId="companySelect">
        <Form.Label>Seleziona la tua azienda</Form.Label>
        <Select
          value={selectedCompany}
          onChange={handleCompanyChange}
          options={companies}
          placeholder="Seleziona la tua azienda"
          styles={customStyles}
          className="mb-3"
        />
      </Form.Group>

      <Button className='button-nvm-true' onClick={() => setShowModal(true)}>
        Registra una nuova azienda
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} className='font-button'>
        <Modal.Header closeButton>
          <Modal.Title className='bg-success-subtle br-40'>Registra Nuova Azienda</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-gradient bg-dark bg-opacity-10'>
          <Form>
            <Form.Group>
              <Form.Label>Nome Azienda</Form.Label>
              <Form.Control
                className="input-border"
                type="text"
                name="companyName"
                onChange={handleNewCompanyChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Partita IVA</Form.Label>
              <Form.Control
                className="input-border"
                type="text"
                name="vatNumber"
                onChange={handleNewCompanyChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>IBAN</Form.Label>
              <Form.Control
                className="input-border"
                type="text"
                name="IBAN"
                onChange={handleNewCompanyChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Indirizzo</Form.Label>
              <Form.Control
                className="input-border"
                type="text"
                placeholder="Via"
                name="address.street"
                onChange={handleNewCompanyChange}
              />
              <Form.Control
                className="input-border"
                type="text"
                placeholder="Città"
                name="address.city"
                onChange={handleNewCompanyChange}
              />
              <Form.Control
                className="input-border"
                type="text"
                placeholder="CAP"
                name="address.postalCode"
                onChange={handleNewCompanyChange}
              />
              <Form.Control
                className="input-border"
                type="text"
                placeholder="Provincia"
                name="address.province"
                onChange={handleNewCompanyChange}
              />
              <Form.Control
                className="input-border"
                type="text"
                placeholder="Paese"
                name="address.country"
                onChange={handleNewCompanyChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Logo URL</Form.Label>
              <Form.Control
                className="input-border"
                type="text"
                name="logo"
                onChange={handleNewCompanyChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='button-nvm-po' onClick={() => setShowModal(false)}>
            Chiudi
          </Button>
          <Button className='button-nvm-true' onClick={handleRegisterCompany}>
            Registra Azienda
          </Button>
        </Modal.Footer>
      </Modal>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="warning">{successMessage}</Alert>}
    </div>
  )
}

export default ChooseCompany
