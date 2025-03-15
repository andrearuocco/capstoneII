import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

function RegisterCompanyForm({ onSubmit }) {
    const [formData, setFormData] = useState({ companyName: '', vatNumber: '', email: '', IBAN: '' }) //aggiungi

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" required onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
            </Form.Group>
            <Button type="submit" variant="success" className="mt-3">Register Company</Button>
        </Form>
    )
}

export default RegisterCompanyForm
