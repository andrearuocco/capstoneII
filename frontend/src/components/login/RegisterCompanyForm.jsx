import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import './RegisterCompanyForm.css'

function RegisterCompanyForm({ onSubmit, CloseRegisterCompany }) {
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
            <div className='d-flex justify-content-center align-items-start'><div><Form.Group>
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
            </Form.Group></div>

            <div className='ms-2'><Form.Group>
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
            </Form.Group></div></div>

            <div className='d-flex align-items-center'><Button type="submit" className="button-nvm-blue mt-3 me-2">Register Company</Button>

            <Button onClick={CloseRegisterCompany} className="mt-3 button-nvm-po">Go Back</Button></div>
        </Form>
    )
}

export default RegisterCompanyForm

