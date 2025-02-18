import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { createCompany } from '../../data/fetchCompany'

function CompanyRegistrationForm ({ onRegisterCompany, setShowCompanyRegistration }) {
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

    const handleSubmit = (e) => {
        e.preventDefault()
        createCompany(formState)
    }

    const handleClose = () => {
        setShowCompanyRegistration(false)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Register a new company</h2>

            <Form.Group controlId="companyName" className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="gestionaleaziendale"
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="vatNumber" className="mb-3">
                <Form.Label>Partita IVA</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="gestionaleaziendale"
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="IBAN" className="mb-3">
                <Form.Label>IBAN</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="gestionaleaziendale"
                    onChange={handleChange}
                />
            </Form.Group>

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

            <Button variant="success" type="submit">
                Register Company
            </Button>
            <Button variant="success" onClick={handleClose}>
                Close
            </Button>
        </Form>
    )
}

export default CompanyRegistrationForm