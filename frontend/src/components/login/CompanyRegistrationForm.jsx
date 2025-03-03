import React, { useState } from 'react'
<<<<<<< HEAD
import { Button, Form, Alert } from 'react-bootstrap'
=======
import { Button, Form } from 'react-bootstrap'
>>>>>>> parent of d5f6c4f (sab22)
import { createCompany } from '../../data/fetchCompany'
import { motion } from 'framer-motion'

function CompanyRegistrationForm({ setShowCompanyRegistration, setShowAdminRegistration }) {
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

    const [alertMessage, setAlertMessage] = useState(null)
    const [alertVariant, setAlertVariant] = useState('danger')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const showAlert = (message, variant = 'danger') => {
        setAlertMessage(message)
        setAlertVariant(variant)
        setTimeout(() => setAlertMessage(null), 3000)
    };

    const handleChange = (e) => {
        const { id, value } = e.target
        if (id.startsWith('address.')) {
            setFormState(prev => ({
                ...prev, address: { ...prev.address, [id.split('.')[1]]: value }
            }))
        } else {
            setFormState({ ...formState, [id]: value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const response = await createCompany(formState)
            if (response && response.success) {
                showAlert('✅ New company created', 'success');
                setTimeout(() => setShowAdminRegistration(true), 1000)
            } else {
                showAlert('❌ Check your data and try again', 'danger')
            }
        } catch (error) {
            showAlert('❌ Error to register company, try again.', 'danger')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            {alertMessage && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Alert variant={alertVariant}>{alertMessage}</Alert>
                </motion.div>
            )}

<<<<<<< HEAD
            <Form onSubmit={handleSubmit}>
                <div className='d-flex align-items-start justify-content-center'>
                    <div className='me-2'><h3 className="text-primary">Registrazione Azienda</h3>
                        <Form.Group controlId="companyName" className="mb-3">
                            <Form.Label>Nome Azienda</Form.Label>
                            <Form.Control type="text" placeholder="Nome azienda" onChange={handleChange} />
                        </Form.Group>
=======
    return (<div>{!showUserRegistration ? 
        (<Form onSubmit={handleSubmit}>
            <h2>Register a new company</h2>
>>>>>>> parent of d5f6c4f (sab22)

                        <Form.Group controlId="vatNumber" className="mb-3">
                            <Form.Label>Partita IVA</Form.Label>
                            <Form.Control type="text" placeholder="Partita IVA" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email Aziendale</Form.Label>
                            <Form.Control type="email" placeholder="Email aziendale" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="IBAN" className="mb-3">
                            <Form.Label>IBAN</Form.Label>
                            <Form.Control type="text" placeholder="IBAN" onChange={handleChange} />
                        </Form.Group></div>

<<<<<<< HEAD
                    <div><h6>Indirizzo Aziendale</h6>
                        <Form.Group controlId="address.street" className="mb-3">
                            <Form.Label>Indirizzo</Form.Label>
                            <Form.Control type="text" placeholder="Via / Piazza" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="address.city" className="mb-3">
                            <Form.Label>Città</Form.Label>
                            <Form.Control type="text" placeholder="Città" onChange={handleChange} />
                        </Form.Group>
=======
            <Form.Group controlId="email" className="mb-3">
                <Form.Label>Company's email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="gestionaleaziendale"
                    onChange={handleChange}
                />
            </Form.Group>

            <h6>Company Address</h6>
            <Form.Group controlId="address.street" className="mb-3">
                <Form.Label>Address/Street</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="gestionaleaziendale"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="address.city" className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="gestionaleaziendale"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="address.postalCode" className="mb-3">
                <Form.Label>CAP</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="gestionaleaziendale"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="address.province" className="mb-3">
                <Form.Label>Where - Provincia</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="gestionaleaziendale"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="address.country" className="mb-3">
                <Form.Label>From</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="gestionaleaziendale"
                    onChange={handleChange}
                />
            </Form.Group>
>>>>>>> parent of d5f6c4f (sab22)

                        <Form.Group controlId="address.postalCode" className="mb-3">
                            <Form.Label>CAP</Form.Label>
                            <Form.Control type="text" placeholder="CAP" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="address.province" className="mb-3">
                            <Form.Label>Provincia</Form.Label>
                            <Form.Control type="text" placeholder="Provincia" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="address.country" className="mb-3">
                            <Form.Label>Paese</Form.Label>
                            <Form.Control type="text" placeholder="Italia" onChange={handleChange} />
                        </Form.Group></div>
                </div>

                <div className="d-flex justify-content-between">
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Registrazione in corso...' : 'Registra Azienda'}
                    </Button>
                    <Button variant="secondary" onClick={() => setShowCompanyRegistration(false)}>Annulla</Button>
                </div>
            </Form>
        </motion.div>
    );
}

export default CompanyRegistrationForm

