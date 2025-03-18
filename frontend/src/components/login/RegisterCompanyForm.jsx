import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

function RegisterCompanyForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        companyName: '',
        vatNumber: '',
        email: '',
        IBAN: '',
        street: '',
        city: '',
        postalCode: '',
        province: '',
        country: '',
    })

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

            <Form.Group>
                <Form.Label>VAT Number</Form.Label>
                <Form.Control type="text" required onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </Form.Group>

            <Form.Group>
                <Form.Label>IBAN</Form.Label>
                <Form.Control type="text" required onChange={(e) => setFormData({ ...formData, IBAN: e.target.value })} />
            </Form.Group>

            {/* Address Fields */}
            <Form.Group>
                <Form.Label>Street</Form.Label>
                <Form.Control type="text" onChange={(e) => setFormData({ ...formData, street: e.target.value })} />
            </Form.Group>

            <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control type="text" onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Province</Form.Label>
                <Form.Control type="text" onChange={(e) => setFormData({ ...formData, province: e.target.value })} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
            </Form.Group>

            <Button type="submit" variant="success" className="mt-3">Register Company</Button>
        </Form>
    )
}

export default RegisterCompanyForm

